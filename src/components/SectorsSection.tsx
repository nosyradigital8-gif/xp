// FILE PATH: src/components/common/SectorsSection.tsx
// Place this file at: src/components/common/SectorsSection.tsx

import { ArrowRight, Briefcase, Fuel, Building, Mountain, Globe, ShoppingCart, Truck, Package, ShoppingBag, Users } from "lucide-react";
import { useCountry } from "@/contexts/CountryContext";
import consultingImg from "@/assets/consulting.jpg";
import oilGasImg from "@/assets/oil-gas.jpg";
import constructionImg from "@/assets/construction.jpg";
import miningImg from "@/assets/mining.jpg";
import commerceImg from "@/assets/commerce.jpg";
import ecommerceImg from "@/assets/ecommerce.jpg";
import logisticsImg from "@/assets/logistics.jpg";

const iconMap: Record<string, any> = {
  Briefcase,
  Fuel,
  Building,
  Mountain,
  Globe,
  ShoppingCart,
  Truck,
  Package,
  ShoppingBag,
  Users,
};

const imageMap: Record<string, string> = {
  consulting: consultingImg,
  'oil-gas': oilGasImg,
  construction: constructionImg,
  mining: miningImg,
  commerce: commerceImg,
  ecommerce: ecommerceImg,
  logistics: logisticsImg,
  operations: constructionImg, // reuse for Canada
  trade: commerceImg, // reuse for Canada
  community: consultingImg, // reuse for Canada
};

const SectorsSection = () => {
  const { currentData } = useCountry();

  // Determine image based on sector title/link
  const getImage = (link: string) => {
    const key = link.split('/').pop() || '';
    return imageMap[key] || consultingImg;
  };

  // Organize sectors for grid layout
  const firstRow = currentData.sectors.slice(0, 4);
  const secondRow = currentData.sectors.slice(4);

  return (
    <section id="sectors" className="py-20 bg-background-secondary">
      {/* Top Divider */}
      <div className="section-divider mb-16" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Our Core Sectors
          </h2>
          <p className="font-poppins text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions across key industries, delivered with expertise and local insight
          </p>
        </div>

        {/* First Row - 4 cards */}
        {firstRow.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {firstRow.map((sector, index) => (
              <SectorCard key={index} sector={sector} index={index} getImage={getImage} />
            ))}
          </div>
        )}

        {/* Second Row - Centered remaining cards */}
        {secondRow.length > 0 && (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(secondRow.length, 3)} gap-6 lg:max-w-4xl mx-auto`}>
            {secondRow.map((sector, index) => (
              <SectorCard key={index + firstRow.length} sector={sector} index={index + firstRow.length} getImage={getImage} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface SectorCardProps {
  sector: {
    icon: string;
    title: string;
    description: string;
    link: string;
  };
  index: number;
  getImage: (link: string) => string;
}

const SectorCard = ({ sector, index, getImage }: SectorCardProps) => {
  const Icon = iconMap[sector.icon];

  return (
    <div
      className="group relative bg-black border border-border rounded-2xl overflow-hidden transition-all duration-400 hover:border-primary hover:-translate-y-2"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImage(sector.link)}
          alt={sector.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: "brightness(0.75)" }}
        />
        <div
          className="absolute inset-0 transition-all duration-500 group-hover:brightness-110"
          style={{ filter: "brightness(0.95)" }}
        />
      </div>

      {/* Icon Container - Overlapping */}
      <div className="absolute left-6 top-40 z-10 w-16 h-16 bg-black border-2 border-primary rounded-xl flex items-center justify-center shadow-lg">
        {Icon && <Icon className="w-8 h-8 text-primary transition-transform duration-500 group-hover:rotate-12" />}
      </div>

      {/* Content Area */}
      <div className="pt-12 pb-16 px-6">
        <h3 className="font-montserrat font-bold text-xl md:text-[22px] text-foreground mb-3 leading-tight min-h-[56px]">
          {sector.title}
        </h3>
        <p className="font-poppins text-[15px] text-muted-foreground leading-relaxed line-clamp-4">
          {sector.description}
        </p>
      </div>

      {/* Learn More Link */}
      <a
        href={sector.link}
        className="absolute bottom-6 left-6 font-poppins font-semibold text-sm text-primary flex items-center gap-2 transition-all duration-300 hover:text-primary-glow group/link"
      >
        Learn More
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
      </a>
    </div>
  );
};

export default SectorsSection;
