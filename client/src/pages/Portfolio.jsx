import { useState } from "react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    { id: 1, title: "Cyberpunk Campaign", category: "design", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop" },
    { id: 2, title: "Fintech Dashboard", category: "web", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
    { id: 3, title: "Neon Nights Branding", category: "branding", img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&h=400&fit=crop" },
    { id: 4, title: "Eco Store E-commerce", category: "web", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop" },
    { id: 5, title: "Product Launch Video", category: "media", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop" },
    { id: 6, title: "Minimalist Identity", category: "branding", img: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&h=400&fit=crop" }
  ];

  const filteredProjects = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section className="section" style={{ minHeight: "100vh", paddingTop: "0" }}>
      <h2>Our Work</h2>
      
      <p style={{ marginBottom: "40px" }}>
        Our work reflects our commitment to creativity, quality, and measurable results.
        Explore our Media Gallery to see our diverse digital solutions.
      </p>

      {/* Filter Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "40px", flexWrap: "wrap" }}>
        {["all", "web", "design", "branding", "media"].map(filter => (
          <button 
            key={filter} 
            onClick={() => setActiveFilter(filter)}
            style={{ 
              background: activeFilter === filter ? "var(--primary)" : "white",
              color: activeFilter === filter ? "#1e293b" : "var(--text-main)",
              border: `1px solid ${activeFilter === filter ? "var(--primary)" : "#e2e8f0"}`,
              textTransform: "capitalize",
              padding: "0.5rem 1.2rem",
              borderRadius: "20px",
              boxShadow: activeFilter === filter ? "0 4px 12px rgba(0, 242, 254, 0.3)" : "0 2px 4px rgba(0,0,0,0.05)"
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Media Gallery Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "24px",
        width: "100%",
        padding: "0 20px"
      }}>
        {filteredProjects.map((project) => (
          <div key={project.id} className="glass-panel" style={{ padding: "0", overflow: "hidden", position: "relative", group: "true", background: "#fff", border: "1px solid #f1f5f9" }}>
            <img 
              src={project.img} 
              alt={project.title} 
              style={{ width: "100%", height: "220px", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
            <div style={{ 
              position: "absolute", bottom: "0", left: "0", right: "0", 
              background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
              padding: "30px 20px 20px"
            }}>
              <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "4px" }}>{project.title}</h3>
              <p style={{ color: "var(--primary)", fontSize: "0.9rem", textTransform: "uppercase", margin: "0" }}>
                {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
