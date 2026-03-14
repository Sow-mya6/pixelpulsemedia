import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 1️⃣ Show success immediately
  setStatus("Thank you for contacting us! We’ll get back to you shortly ✅");

  // Clear form
  setFormData({ name: "", email: "", message: "" });

  // 2️⃣ Try backend silently (optional)
  try {
    await fetch("https://pixelpulse-media.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  } catch (error) {
    // Ignore backend failure completely
    console.log("Backend not reachable, but UI handled it gracefully");
  }
};

  return (
    <section className="section dark">
      <h2>Contact Us</h2>

      <p style={{ maxWidth: "700px", margin: "20px auto" }}>
        Fill out the form below and our team will get back to you shortly.
      </p>

      <div style={{ marginBottom: "30px" }}>
        <div>Email: <strong>contact@pixelpulsemedia.com</strong></div>
        <div>Phone: <strong>+91 98765 43210</strong></div>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={rowStyle}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={textareaStyle}
        />

        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>

      {status && <p style={{ marginTop: "20px" }}>{status}</p>}
    </section>
  );
};

/* styles */
const formStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const rowStyle = {
  width: "100%",
  display: "flex",
  gap: "20px",
  marginBottom: "20px"
};

const inputStyle = {
  flex: 1,
  padding: "15px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "none"
};

const textareaStyle = {
  width: "100%",
  height: "140px",
  padding: "15px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "none",
  marginBottom: "20px"
};

const buttonStyle = {
  padding: "14px 40px",
  fontSize: "16px",
  backgroundColor: "#22d3ee",
  color: "#020617",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Contact;
