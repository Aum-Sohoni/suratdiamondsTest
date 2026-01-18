import { motion } from "framer-motion";
import { Palette, Gem, Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const BespokeSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Palette,
      number: "01",
      titleKey: "consultation",
      descriptionKey: "consultationDesc",
    },
    {
      icon: Gem,
      number: "02",
      titleKey: "stoneSelection",
      descriptionKey: "stoneSelectionDesc",
    },
    {
      icon: Ruler,
      number: "03",
      titleKey: "designCraft",
      descriptionKey: "designCraftDesc",
    },
    {
      icon: Sparkles,
      number: "04",
      titleKey: "reveal",
      descriptionKey: "revealDesc",
    },
  ];

  return (
    <section id="bespoke" className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          <span className="text-primary text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-body block mb-3 sm:mb-4">
            {t("bespokeCreation")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6">
            {t("yourVisionOurCraft")}
          </h2>
          <p className="font-body text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            {t("bespokeDescription")}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="text-center">
                {/* Number */}
                <span className="text-3xl sm:text-4xl lg:text-5xl font-display text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6 border border-border group-hover:border-primary flex items-center justify-center transition-colors duration-500">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-base sm:text-lg lg:text-xl text-foreground mb-2 sm:mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm font-body leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="luxury" size="xl" className="sparkle text-sm sm:text-base">
            {t("startBespokeJourney")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
