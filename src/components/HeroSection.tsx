// FILE PATH: src/components/common/HeroSection.tsx
// Place this file at: src/components/common/HeroSection.tsx

import { ArrowRight, ShoppingBag, FileCheck, Calendar, Network, Shield } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import heroBackground from "@/assets/hero-bg.jpg";

// Floating particles configuration
const particles = [
  { size: 5, left: "88%", top: "8%", opacity: 0.54, delay: 0 },
  { size: 12, left: "90%", top: "5%", opacity: 0.77, delay: 0.5 },
  { size: 15, left: "24%", top: "2%", opacity: 0.34, delay: 1 },
  { size: 8, left: "12%", top: "50%", opacity: 0.45, delay: 1.5 },
  { size: 10, left: "75%", top: "25%", opacity: 0.62, delay: 2 },
  { size: 7, left: "46%", top: "18%", opacity: 0.52, delay: 0.3 },
  { size: 13, left: "64%", top: "75%", opacity: 0.38, delay: 0.8 },
  { size: 11, left: "30%", top: "40%", opacity: 0.65, delay: 1.2 },
  { size: 9, left: "87%", top: "60%", opacity: 0.48, delay: 1.8 },
  { size: 6, left: "18%", top: "85%", opacity: 0.56, delay: 2.2 },
];

const iconMap: Record<string, any> = {
  FileCheck,
  Calendar,
  Network,
  Shield,
};

const HeroSection = () => {
  const { currentData } = useCountry();

  const scrollToSectors = () => {
    document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-hero-gradient">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackground}
          alt="Business cityscape"
          className="h-full w-full object-cover"
          style={{
            filter: "brightness(0.55) contrast(1.1) saturate(0.9)",
          }}
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(20, 20, 20, 0.45) 50%, rgba(0, 0, 0, 0.6) 100%)",
        }}
      />

      {/* Red Glow 1 */}
      <div
        className="absolute w-96 h-96 glow-red-large z-[2]"
        style={{
          left: "25%",
          top: "22%",
          opacity: 0.98,
        }}
      />

      {/* Red Glow 2 */}
      <div
        className="absolute w-80 h-80 glow-red-medium z-[2]"
        style={{
          left: "58%",
          top: "44%",
          opacity: 0.78,
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute z-[3] animate-float"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
            background:
              index % 2 === 0
                ? "rgba(255, 0, 0, 0.3)"
                : "rgba(255, 51, 51, 0.2)",
            borderRadius: index % 3 === 0 ? "8px" : "9999px",
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + (index % 3)}s`,
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-32 md:pt-40 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-[60px] leading-tight text-foreground mb-6 animate-fade-in-up"
            style={{
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.8)",
              letterSpacing: "-0.5px",
            }}
          >
            {currentData.hero.title}
          </h1>

          {/* Sub-headline */}
          <p
            className="font-poppins text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {currentData.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <button onClick={scrollToSectors} className="btn-primary group">
              {currentData.hero.cta1}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={scrollToShop} className="btn-secondary group">
              {currentData.hero.cta2}
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            </button>
            <button onClick={scrollToContact} className="btn-secondary">
              {currentData.hero.cta3}
            </button>
          </div>

          {/* Trust Badges */}
          <div
            className="flex flex-wrap justify-center gap-4 md:gap-8 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {currentData.hero.trustBadges.map((badge, index) => {
              const Icon = iconMap[badge.icon];
              return (
                <div
                  key={index}
                  className="trust-badge w-28 md:w-32 h-20 md:h-24"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <Icon className="w-7 h-7 text-primary mb-2" />
                  <span className="font-poppins font-semibold text-[10px] md:text-xs text-foreground uppercase tracking-wide text-center">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator w-6 h-10 flex justify-center pt-2">
            <div className="scroll-indicator-dot w-1.5 h-3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
