// FILE PATH: src/pages/Contact.tsx
// Place this file at: src/pages/Contact.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import { useCountry } from "../contexts/CountryContext";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const Contact = () => {
  const { currentData } = useCountry();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="font-poppins text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a question or ready to start a project? We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full h-12 px-4 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full h-12 px-4 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                      Service Interest
                    </label>
                    <select className="w-full h-12 px-4 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground focus:border-primary focus:outline-none transition-colors">
                      <option value="">Select a service</option>
                      {currentData.sectors.map((sector, index) => (
                        <option key={index} value={sector.title}>
                          {sector.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-background-secondary border border-border rounded-lg font-poppins text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-primary text-white font-poppins font-semibold text-sm rounded-lg border-2 border-primary transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="font-montserrat font-bold text-xl text-foreground mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <ContactInfoItem
                      icon={Mail}
                      label="Email"
                      items={currentData.contact.email}
                    />
                    <ContactInfoItem
                      icon={Phone}
                      label="Phone"
                      items={currentData.contact.phone}
                    />
                    <ContactInfoItem
                      icon={Clock}
                      label="Office Hours"
                      items={currentData.contact.hours}
                    />
                    <ContactInfoItem
                      icon={MapPin}
                      label="Location"
                      items={[currentData.name]}
                    />
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                  <h3 className="font-montserrat font-bold text-lg text-foreground mb-3">
                    Quick Response Guarantee
                  </h3>
                  <p className="font-poppins text-sm text-muted-foreground mb-4">
                    We typically respond to all inquiries within 24 hours during business days.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="font-poppins text-sm text-foreground">
                        Free initial consultation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="font-poppins text-sm text-foreground">
                        Customized solutions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="font-poppins text-sm text-foreground">
                        Expert guidance
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
};

interface ContactInfoItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: string[];
}

const ContactInfoItem = ({ icon: Icon, label, items }: ContactInfoItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="icon-container">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div>
        <h4 className="font-montserrat font-semibold text-sm text-foreground mb-2">
          {label}
        </h4>
        <div className="space-y-1">
          {items.map((item, index) => (
            <p key={index} className="font-poppins text-sm text-muted-foreground">
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
