import { useEffect, useState } from "react";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5008/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Admin – Contact Messages</h1>

      {loading ? (
        <p style={textStyle}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p style={textStyle}>No messages found</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Message</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td style={tdStyle}>{msg.name}</td>
                <td style={tdStyle}>{msg.email}</td>
                <td style={tdStyle}>{msg.message}</td>
                <td style={tdStyle}>
                  {new Date(msg.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

/* 🔹 STYLES */

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f1f5f9",
  padding: "40px",
  paddingTop: "120px",   // 👈 IMPORTANT (push below navbar)
  color: "#0f172a"
};


const headingStyle = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "28px",
  color: "#0f172a"
};

const textStyle = {
  textAlign: "center",
  fontSize: "18px",
  color: "#334155"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};

const thStyle = {
  padding: "12px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#0f172a",
  color: "#ffffff",
  textAlign: "left"
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #e2e8f0",
  color: "#0f172a"
};

export default Admin;
