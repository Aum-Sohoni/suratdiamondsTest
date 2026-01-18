import { motion } from "framer-motion";
import { Diamond, Award, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Diamond,
      titleKey: "suratHeritage",
      descriptionKey: "suratHeritageDesc",
    },
    {
      icon: Award,
      titleKey: "expertCraftsmanship",
      descriptionKey: "expertCraftsmanshipDesc",
    },
    {
      icon: Heart,
      titleKey: "ethicalSourcing",
      descriptionKey: "ethicalSourcingDesc",
    },
    {
      icon: Globe,
      titleKey: "balticElegance",
      descriptionKey: "balticEleganceDesc",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-body block mb-3 sm:mb-4">
              {t("ourStory")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 leading-tight">
              {t("whereEastMeets")}
              <br />
              <span className="text-gradient-gold">{t("baltic")}</span>
            </h2>
            <div className="space-y-3 sm:space-y-4 text-muted-foreground font-body text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
            </div>
            <Button variant="luxuryOutline" size="lg" className="text-sm sm:text-base">
              {t("discoverHeritage")}
            </Button>
          </motion.div>

          {/* Right Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group p-4 sm:p-6 bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="font-display text-base sm:text-lg text-foreground mb-1 sm:mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm font-body leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
