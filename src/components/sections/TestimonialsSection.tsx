import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Anna Liepiņa",
    role: "Bride, Riga",
    content: "The moment I saw my engagement ring, I knew it was the one. The team at Surat Diamond Latvia understood exactly what I wanted—something timeless yet unique. The quality and craftsmanship exceeded all expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Kristaps Ozols",
    role: "Art Director",
    content: "I commissioned a bespoke pendant for my wife's anniversary. The attention to detail and the way they guided me through the entire process was exceptional. A truly personalized luxury experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Petrov",
    role: "CEO, Tallinn",
    content: "Having purchased jewelry from houses in Paris and Milan, I can confidently say Surat Diamond Latvia matches that level of elegance. Their Baltic-inspired designs are refreshingly unique.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 text-primary/5">
        <Quote className="w-20 h-20 sm:w-40 sm:h-40" />
      </div>
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 text-primary/5 rotate-180">
        <Quote className="w-20 h-20 sm:w-40 sm:h-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-primary text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-body block mb-3 sm:mb-4">
            {t("testimonials")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            {t("wordsOfAppreciation")}
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-2 sm:px-4 md:px-16"
            >
              {/* Stars */}
              <div className="flex justify-center gap-0.5 sm:gap-1 mb-6 sm:mb-8">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-6 sm:mb-8 italic">
                "{testimonials[current].content}"
              </blockquote>

              {/* Author */}
              <div className="diamond-divider max-w-xs mx-auto">
                <span className="text-primary">◇</span>
              </div>
              <p className="font-display text-base sm:text-lg text-foreground mt-4 sm:mt-6">
                {testimonials[current].name}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm tracking-wider uppercase font-body">
                {testimonials[current].role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
            <button
              onClick={prev}
              className="p-2 sm:p-3 border border-border hover:border-primary hover:text-primary transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={next}
              className="p-2 sm:p-3 border border-border hover:border-primary hover:text-primary transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
