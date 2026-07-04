import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const DATA_DIR = path.join(__dirname, "..", "data");
const BACKUP_FILE = path.join(DATA_DIR, "messages.json");


const ensureDataDir = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};


export const saveMessagesToFile = async (Message) => {
  try {
    ensureDataDir();
    const messages = await Message.find().lean();
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to backup messages:", err.message);
  }
};

/**
 * Load messages from the backup JSON file into MongoDB
 * Only runs if the database is empty (fresh in-memory start)
 */
export const restoreMessagesFromFile = async (Message) => {
  try {
    if (!fs.existsSync(BACKUP_FILE)) {
      console.log("No message backup file found, starting fresh.");
      return 0;
    }

    // Only restore if the database is empty (new in-memory server)
    const existingCount = await Message.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} messages, skipping restore.`);
      return existingCount;
    }

    const data = fs.readFileSync(BACKUP_FILE, "utf-8");
    const messages = JSON.parse(data);

    if (messages.length === 0) {
      console.log("Backup file is empty, nothing to restore.");
      return 0;
    }

    // Insert backed-up messages into the in-memory database
    await Message.insertMany(messages);
    console.log(`Restored ${messages.length} messages from backup.`);
    return messages.length;
  } catch (err) {
    console.error("Failed to restore messages:", err.message);
    return 0;
  }
};
