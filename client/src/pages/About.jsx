const About = () => {
  return (
    <section className="section">
      <div className="glass-panel" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>About Us</h2>
        <p style={{ marginBottom: "20px", fontSize: "1.1rem", color: "var(--text-main)", lineHeight: "1.8" }}>
          At PixelPulse Media, we believe in the power of digital transformation.
          Founded with a vision to redefine online experiences, our team combines
          creativity, technology, and strategy to build brands that stand out in
          a crowded digital landscape.
        </p>
        <p style={{ marginBottom: "20px", fontSize: "1.1rem", color: "var(--text-muted)", lineHeight: "1.8" }}>
          Whether you need a cutting-edge website, a cohesive brand identity,
          or a scalable digital marketing strategy, we bring expertise and
          passion to every project. We understand that your brand is unique,
          and we tailor our approach to ensure your message resonates with
          the right audience.
        </p>
        <div style={{ marginTop: "40px", borderTop: "1px solid var(--glass-border)", paddingTop: "20px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", textAlign: "center" }}>
          <div>
            <h3 style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: "5px" }}>50+</h3>
            <p style={{ color: "var(--text-muted)" }}>Projects Delivered</p>
          </div>
          <div>
            <h3 style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: "5px" }}>99%</h3>
            <p style={{ color: "var(--text-muted)" }}>Client Satisfaction</p>
          </div>
          <div>
            <h3 style={{ color: "var(--primary)", fontSize: "2rem", marginBottom: "5px" }}>24/7</h3>
            <p style={{ color: "var(--text-muted)" }}>Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
