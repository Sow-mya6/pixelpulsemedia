import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) return "Name must be at least 2 characters long.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    if (formData.message.trim().length < 10) return "Message must be at least 10 characters long.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    
    // Client-side Validation
    const errorMsg = validateForm();
    if (errorMsg) {
      setStatus({ type: "error", message: errorMsg });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5010";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }

      setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ background: "transparent" }}>
      <h2 style={{ 
        background: "linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontSize: "3rem",
        marginBottom: "10px"
      }}>
        Contact Us
      </h2>
      <p style={{ marginBottom: "40px", color: "var(--text-muted)", fontSize: "1.1rem" }}>
        Fill out the form below to get in touch. We'd love to hear about your next digital project!
      </p>

      <div className="glass-panel" style={{ 
        maxWidth: "600px", 
        margin: "0 auto", 
        textAlign: "left",
        background: "#ffffff", 
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 40px rgba(0,0,0,0.05)"
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.95rem", color: "var(--text-main)", fontWeight: "500" }}>Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="John Doe" 
                value={formData.name} 
                onChange={handleChange} 
                disabled={loading} 
                required
                style={{ background: "#ffffff", color: "var(--text-main)", border: "1px solid #e2e8f0", borderRadius: "8px" }}
              />
            </div>
            
            <div style={{ flex: "1" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "0.95rem", color: "var(--text-main)", fontWeight: "500" }}>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="john@example.com" 
                value={formData.email} 
                onChange={handleChange} 
                disabled={loading} 
                required
                style={{ background: "#ffffff", color: "var(--text-main)", border: "1px solid #e2e8f0", borderRadius: "8px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.95rem", color: "var(--text-main)", fontWeight: "500" }}>Message</label>
            <textarea 
              name="message" 
              placeholder="How can we help you?" 
              value={formData.message} 
              onChange={handleChange} 
              disabled={loading} 
              rows="5" 
              required
              style={{ background: "#ffffff", color: "var(--text-main)", border: "1px solid #e2e8f0", borderRadius: "8px" }}
            />
          </div>

          {status && (
            <div style={{ 
              padding: "16px", borderRadius: "8px", fontSize: "0.95rem",
              background: status.type === "success" ? "rgba(34, 197, 94, 0.05)" : "rgba(239, 68, 68, 0.05)",
              color: status.type === "success" ? "#166534" : "#991b1b",
              border: `1px solid ${status.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)"}`
            }}>
              {status.message}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)",
            color: "#ffffff",
            padding: "14px",
            fontSize: "1.05rem",
            fontWeight: "600",
            borderRadius: "30px",
            border: "none",
            marginTop: "10px",
            boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
            cursor: "pointer",
            transition: "transform 0.2s ease"
          }}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.9rem", flexWrap: "wrap", gap: "10px" }}>
          <div>📧 contact@pixelpulsemedia.com</div>
          <div>📞 +91 98765 43210</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
