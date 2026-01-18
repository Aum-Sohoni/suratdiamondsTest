import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import necklaceImage from "@/assets/collection-necklace.jpg";
import ringImage from "@/assets/collection-ring.jpg";
import earringsImage from "@/assets/collection-earrings.jpg";
import braceletImage from "@/assets/collection-bracelet.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export const CollectionsSection = () => {
  const { t } = useLanguage();

  const collections = [
    {
      nameKey: "necklaces",
      descKey: "necklacesDesc",
      image: necklaceImage,
      items: 48,
      category: "necklaces",
    },
    {
      nameKey: "rings",
      descKey: "ringsDesc",
      image: ringImage,
      items: 72,
      category: "rings",
    },
    {
      nameKey: "earrings",
      descKey: "earringsDesc",
      image: earringsImage,
      items: 56,
      category: "earrings",
    },
    {
      nameKey: "bracelets",
      descKey: "braceletsDesc",
      image: braceletImage,
      items: 34,
      category: "bracelets",
    },
  ];

  return (
    <section id="collections" className="py-16 sm:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16 lg:mb-20"
        >
          <span className="text-primary text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-body block mb-3 sm:mb-4">
            {t("ourCollections")}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6">
            {t("curatedExcellence")}
          </h2>
          <p className="font-body text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            {t("collectionsDescription")}
          </p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.nameKey}
              variants={itemVariants}
            >
              <Link
                to={`/shop?category=${collection.category}`}
                className="group relative overflow-hidden bg-card aspect-[3/4] cursor-pointer block"
              >
                {/* Image */}
                <div className="absolute inset-0 image-shimmer">
                  <img
                    src={collection.image}
                    alt={t(collection.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-3 sm:p-4 lg:p-6 flex flex-col justify-end">
                  <span className="text-primary/80 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2 font-body">
                    {collection.items} {t("pieces")}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors duration-300">
                    {t(collection.nameKey)}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-body mb-2 sm:mb-4 line-clamp-2">
                    {t(collection.descKey)}
                  </p>

                  {/* Explore link */}
                  <div className="flex items-center gap-1 sm:gap-2 text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] uppercase font-body">
                      {t("explore")}
                    </span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>

                {/* Border effect */}
                <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
