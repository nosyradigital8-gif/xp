// FILE PATH: src/components/common/AboutSection.tsx
// Place this file at: src/components/common/AboutSection.tsx

import { useCountry } from "@/contexts/CountryContext";
import heroBackground from "@/assets/hero-bg.jpg";

const AboutSection = () => {
  const { currentData } = useCountry();

  return (
    <section id="about" className="relative py-16 md:py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Background"
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.3) contrast(1.1) saturate(0.7)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(10, 10, 10, 0.9) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            {currentData.about.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Who We Are & We Serve */}
          <div>
            {/* Who We Are */}
            <div className="mb-8">
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-4">
                Who We Are
              </h3>
              <p className="font-poppins text-base md:text-lg text-muted-foreground leading-relaxed">
                {currentData.about.description}
              </p>
            </div>

            {/* We Serve */}
            <div>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground mb-4">
                We Serve
              </h3>
              <div className="space-y-3">
                {currentData.about.serveSectors.map((sector, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <p className="font-poppins text-sm md:text-base text-muted-foreground">
                      {sector}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/30">
              <img
                src={heroBackground}
                alt="Business operations"
                className="w-full h-full object-cover"
                style={{
                  minHeight: "400px",
                  maxHeight: "600px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)",
          top: "10%",
          right: "10%",
        }}
      ></div>
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%)",
          bottom: "10%",
          left: "10%",
        }}
      ></div>
    </section>
  );
};

export default AboutSection;
