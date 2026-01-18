import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: "visitUs",
      value: "Elizabetes iela 22, Riga LV-1050",
      detailKey: "artNouveauDistrict",
    },
    {
      icon: Phone,
      labelKey: "callUs",
      value: "+371 2XXX XXXX",
      detail: "Mon-Sat, 10:00 - 19:00",
    },
    {
      icon: Mail,
      labelKey: "emailUs",
      value: "info@suratdiamondlatvia.com",
      detailKey: "responseTime",
    },
    {
      icon: Clock,
      labelKey: "openingHours",
      value: "Mon-Sat: 10:00 - 19:00",
      detailKey: "privateViewings",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6">
              {t("beginYourJourney")}
            </h2>
            <p className="text-muted-foreground font-body text-sm sm:text-base lg:text-lg">
              {t("contactDescription")}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-card border border-border/50 hover:border-primary/30 transition-colors duration-500"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground font-body mb-1">
                    {t(item.labelKey)}
                  </p>
                  <p className="text-foreground font-body text-sm sm:text-base lg:text-lg">
                    {item.value}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm font-body">
                    {item.detailKey ? t(item.detailKey) : item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8 sm:pt-10 mt-6 sm:mt-8 border-t border-border text-center"
          >
            <p className="text-[10px] sm:text-xs tracking-wider uppercase text-muted-foreground font-body mb-3 sm:mb-4">
              {t("followJourney")}
            </p>
            <div className="flex justify-center gap-3 sm:gap-4">
              <a
                href="#"
                className="p-2 sm:p-3 border border-border hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="#"
                className="p-2 sm:p-3 border border-border hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
