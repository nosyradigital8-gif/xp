const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-cta-gradient relative overflow-hidden">
      {/* Subtle Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2
            className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
            style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)" }}
          >
            Ready to Power Your Growth?
          </h2>

          {/* Subtext */}
          <p className="font-poppins text-lg md:text-xl text-foreground/95 max-w-3xl mx-auto mb-10 leading-relaxed">
            Partner with Xpola Services for comprehensive solutions across
            consulting, energy, trade, and logistics. Let's discuss your needs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToContact} className="btn-cta-primary">
              Schedule Consultation
            </button>
            <button onClick={scrollToServices} className="btn-cta-secondary">
              View Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
