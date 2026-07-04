import { useEffect, useState } from "react";

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Basic security on frontend
  const [secret, setSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5010";
      // Send secret as a header
      const res = await fetch(`${apiUrl}/api/admin/messages`, {
        headers: {
          "x-admin-secret": secret
        }
      });
      
      if (!res.ok) {
        throw new Error("Unauthorized or Failed to fetch");
      }
      
      const data = await res.json();
      setMessages(data);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  if (!isAuthenticated) {
    return (
      <section className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="glass-panel" style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Admin Access</h2>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              type="password" 
              placeholder="Enter Admin Secret" 
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </button>
            {error && <p style={{ color: "#f87171", fontSize: "14px" }}>{error}</p>}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{ maxWidth: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ margin: 0, fontSize: "2rem" }}>Admin Dashboard</h2>
        <button onClick={() => setIsAuthenticated(false)} style={{ padding: "8px 16px", background: "transparent", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}>Logout</button>
      </div>

      <div className="glass-panel" style={{ padding: "0", overflowX: "auto" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Refreshing...</div>
        ) : messages.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>No messages found.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.02)" }}>
                <th style={{ padding: "16px", fontWeight: "600", color: "var(--primary)" }}>Name</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "var(--primary)" }}>Email</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "var(--primary)" }}>Message</th>
                <th style={{ padding: "16px", fontWeight: "600", color: "var(--primary)" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} style={{ borderBottom: "1px solid var(--glass-border)", transition: "background 0.2s ease" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.02)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "16px" }}>{msg.name}</td>
                  <td style={{ padding: "16px", color: "var(--text-muted)" }}>{msg.email}</td>
                  <td style={{ padding: "16px", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={msg.message}>{msg.message}</td>
                  <td style={{ padding: "16px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Admin;
