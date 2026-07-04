const Services = () => {
  const servicesList = [
    { id: 1, title: "Web Development", desc: "Fast, responsive, and modern websites built with the latest technologies.", icon: "💻" },
    { id: 2, title: "Brand Identity", desc: "Logos, color palettes, and brand guidelines that make you stand out.", icon: "🎨" },
    { id: 3, title: "Digital Marketing", desc: "Data-driven strategies to grow your audience and increase conversions.", icon: "📈" },
    { id: 4, title: "UI/UX Design", desc: "Intuitive and beautiful user interfaces focused on user experience.", icon: "✨" },
    { id: 5, title: "SEO Optimization", desc: "Rank higher on search engines and get organic traffic seamlessly.", icon: "🔍" },
    { id: 6, title: "Content Creation", desc: "High-quality copy, graphics, and video production for your brand.", icon: "📝" }
  ];

  return (
    <section className="section">
      <h2 style={{ marginBottom: "15px" }}>Our Services</h2>
      <p style={{ marginBottom: "50px", maxWidth: "700px", margin: "0 auto 50px" }}>
        We offer a comprehensive suite of digital services to help your business thrive in the modern era.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
        padding: "0 20px",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        {servicesList.map(service => (
          <div key={service.id} className="glass-panel" style={{ textAlign: "left", transition: "transform 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-5px)"} onMouseLeave={e => e.currentTarget.style.transform="none"}>
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>{service.icon}</div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "var(--text-main)" }}>{service.title}</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.6" }}>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
