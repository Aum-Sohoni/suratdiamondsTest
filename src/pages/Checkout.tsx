import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
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

const Checkout = () => {
  const { t, language } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const getProductName = (product: any) => {
    switch (language) {
      case "lv":
        return product.nameLv || product.name_lv || product.name;
      case "ru":
        return product.nameRu || product.name_ru || product.name;
      default:
        return product.name;
    }
  };

  const handleCheckout = () => {
    const orderItems = items
      .map((item) => {
        const name = getProductName(item.product);
        const sku = item.product.id.substring(0, 8).toUpperCase();
        const carat = item.product.carat || item.product.specifications?.carat || "N/A";
        const qty = item.quantity;
        const lineTotal = formatPrice(item.product.price * qty);

        return `✨ *${name}*\n   🆔 *SKU:* ${sku}\n   💎 *Ct:* ${carat}\n   🔢 *Qty:* ${qty}\n   💶 *Price:* ${lineTotal}`;
      })
      .join("\n\n");

    const message = `🛍️ *ORDER REQUEST* 💍\n\nHello Surat Diamond! I would like to order the following items:\n\n${orderItems}\n\n━━━━━━━━━━━━━━━━━━━━\n💰 *Total Estimate: ${formatPrice(totalPrice)}*\n━━━━━━━━━━━━━━━━━━━━\n\n✅ Please confirm availability and shipping details. Looking forward to your response! ✨`;

    const whatsappUrl = `https://wa.me/37125578862?text=${encodeURIComponent(message)}`;

    try {
      window.location.assign(whatsappUrl);

      // If navigation is blocked (common in embedded previews), this can fail silently.
      // Show a copyable link shortly after as a last-resort fallback.
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          window.prompt(
            "Copy this WhatsApp link and open it in a new tab:",
            whatsappUrl
          );
        }
      }, 700);
    } catch (error) {
      // In embedded/sandboxed environments, navigation can be blocked and throw.
      console.error("WhatsApp redirect blocked:", error);
      window.prompt("Copy this WhatsApp link and open it in a new tab:", whatsappUrl);
    }
  };

  // Empty Cart View
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h1 className="font-display text-3xl text-foreground mb-4">
                {t("yourCartIsEmpty")}
              </h1>
              <p className="text-muted-foreground mb-8">
                {t("discoverCollection")}
              </p>
              <Link to="/shop">
                <Button variant="luxury" size="lg">
                  {t("exploreCollection")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Cart View with WhatsApp Checkout
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="font-display text-2xl text-foreground mb-6">
                {t("shoppingCart")}
              </h1>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  className="bg-black border border-border/40 p-4 sm:p-6 rounded-sm flex gap-4 sm:gap-6"
                >
                  <img
                    src={categoryImages[item.product.category]}
                    alt={getProductName(item.product)}
                    className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-sm"
                  />
                  <div className="flex-1 flex flex-col">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-display text-lg text-foreground hover:text-primary transition-colors"
                    >
                      {getProductName(item.product)}
                    </Link>
                    <span className="text-sm text-muted-foreground mb-2">
                      {item.product.specifications?.carat || item.product.carat} •{" "}
                      {item.product.specifications?.clarity || item.product.clarity}
                    </span>
                    <span className="font-display text-foreground">
                      {formatPrice(item.product.price)}
                    </span>
                    <div className="flex items-center gap-4 mt-auto pt-4">
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="font-display text-lg text-foreground hidden sm:block">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border p-6 rounded-sm sticky top-28">
                <h2 className="font-display text-xl text-foreground mb-6">
                  {t("orderSummary")}
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("subtotal")}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-display text-xl text-foreground">
                    <span>{t("total")}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="lg"
                  className="w-full mb-4"
                  onClick={handleCheckout}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {language === "lv"
                    ? "Noformēt pasūtījumu"
                    : language === "ru"
                      ? "Оформить заказ"
                      : "Checkout"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>{t("whatsappSecureOrder")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
