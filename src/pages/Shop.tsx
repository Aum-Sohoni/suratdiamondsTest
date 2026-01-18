import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useProducts, Product } from "@/hooks/useProducts";
import { useWishlist } from "@/hooks/useWishlist";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import collectionNecklace from "@/assets/collection-necklace.jpg";
import collectionRing from "@/assets/collection-ring.jpg";
import collectionEarrings from "@/assets/collection-earrings.jpg";
import collectionBracelet from "@/assets/collection-bracelet.jpg";

const categoryImages: Record<string, string> = {
  necklaces: collectionNecklace,
  rings: collectionRing,
  earrings: collectionEarrings,
  bracelets: collectionBracelet,
};

// Start Debugging Helper
const getCategoryImage = (category: string) => {
  if (!category) return collectionRing; // Default fallback
  const normalizedCategory = category.toLowerCase();

  if (categoryImages[normalizedCategory]) {
    return categoryImages[normalizedCategory];
  }

  console.warn(`Missing image for category: ${category}`);
  return collectionRing; // Fallback for unknown categories
};


const Shop = () => {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);

  const { products, isLoading } = useProducts(selectedCategory);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const categories = ["all", "necklaces", "rings", "earrings", "bracelets"];

  // Sync URL with selected category
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";
    if (urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const getProductName = (product: Product) => {
    switch (language) {
      case "lv":
        return product.name_lv || product.name;
      case "ru":
        return product.name_ru || product.name;
      default:
        return product.name;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const handleAddToCart = (product: Product) => {
    // Convert database product to cart format
    const cartProduct = {
      id: product.id,
      name: product.name,
      nameLv: product.name_lv || product.name,
      nameRu: product.name_ru || product.name,
      price: Number(product.price),
      category: product.category as "necklaces" | "rings" | "earrings" | "bracelets",
      image: product.image_url?.startsWith('http') ? product.image_url : getCategoryImage(product.category),
      images: [product.image_url?.startsWith('http') ? product.image_url : getCategoryImage(product.category)],
      description: product.description || "",
      descriptionLv: product.description_lv || product.description || "",
      descriptionRu: product.description_ru || product.description || "",
      specifications: {
        carat: product.carat || "",
        clarity: product.clarity || "",
        cut: product.cut || "",
        color: product.color || "",
        metal: product.metal || "",
        weight: "",
      },
      inStock: true,
      featured: false,
    };
    addToCart(cartProduct);
    toast.success(t("addedToCart") || "Added to cart!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-4">
              {selectedCategory === "all"
                ? t("collections")
                : t(selectedCategory)}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              {t("collectionsDescription")}
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryChange(category)}
                className="capitalize text-xs sm:text-sm"
              >
                {category === "all" ? t("all") || "All" : t(category)}
              </Button>
            ))}
          </motion.div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-black border border-border/40 rounded-sm overflow-hidden h-full flex flex-col group/card hover:border-primary/30 transition-colors">
                    <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden shrink-0">
                      <img
                        src={
                          product.image_url?.startsWith('http')
                            ? product.image_url
                            : getCategoryImage(product.category)
                        }
                        alt={getProductName(product)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = getCategoryImage(product.category);
                        }}
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                      {/* Wishlist button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${isInWishlist(product.id)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground hover:text-primary"
                            }`}
                        />
                      </button>
                    </Link>

                    <div className="p-4 sm:p-6 flex flex-col flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2" title={getProductName(product)}>
                          {getProductName(product)}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.carat && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-sm">
                            {product.carat}
                          </span>
                        )}
                        {product.clarity && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-sm">
                            {product.clarity}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 gap-2">
                        <span className="font-display text-lg text-foreground">
                          {formatPrice(Number(product.price))}
                        </span>
                        <Button
                          size="sm"
                          variant="luxuryOutline"
                          onClick={() => handleAddToCart(product)}
                          className="text-xs px-2 sm:px-3"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          {t("addToCart")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty state */}
          {!isLoading && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">
                {t("noProductsFound") || "No products found in this category."}
              </p>
              <Button
                variant="luxury"
                className="mt-4"
                onClick={() => handleCategoryChange("all")}
              >
                {t("viewAllProducts") || "View All Products"}
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
