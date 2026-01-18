import { useState } from "react";
import { DebugRoles } from "@/components/DebugRoles";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { useOrders } from "@/hooks/useOrders";
import { useWishlist } from "@/hooks/useWishlist";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Package,
  Heart,
  MapPin,
  Phone,
  Mail,
  Loader2,
  Save,
  ShoppingBag,
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

const Profile = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile } = useProfile();
  const { orders, isLoading: ordersLoading } = useOrders();
  const { wishlistIds } = useWishlist();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    country: "LV",
  });

  // Update form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        city: profile.city || "",
        postal_code: profile.postal_code || "",
        country: profile.country || "LV",
      });
    }
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await updateProfile(formData);
    setIsSaving(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === "lv" ? "lv-LV" : language === "ru" ? "ru-RU" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center py-20">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-display text-3xl text-foreground mb-4">
              {t("signInToContinue")}
            </h1>
            <Link to="/auth">
              <Button variant="luxury" size="lg">
                {t("signIn")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl text-foreground mb-2">
              {t("account")}
            </h1>
            <p className="text-muted-foreground mb-8">{user.email}</p>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t("profile")}
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  {t("orders")}
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {t("wishlist")}
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="bg-card border border-border p-6 rounded-sm">
                  <h2 className="font-display text-xl text-foreground mb-6">
                    {t("personalInfo")}
                  </h2>

                  {profileLoading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">{t("firstName")}</Label>
                          <Input
                            id="first_name"
                            value={formData.first_name}
                            onChange={(e) =>
                              setFormData({ ...formData, first_name: e.target.value })
                            }
                            placeholder={t("firstName")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">{t("lastName")}</Label>
                          <Input
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) =>
                              setFormData({ ...formData, last_name: e.target.value })
                            }
                            placeholder={t("lastName")}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("phone")}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+371 20000000"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Separator />

                      <h3 className="font-display text-lg text-foreground">
                        {t("shippingAddress")}
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="address">{t("address")}</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) =>
                              setFormData({ ...formData, address: e.target.value })
                            }
                            placeholder={t("address")}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">{t("city")}</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            placeholder={t("city")}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal_code">{t("postalCode")}</Label>
                          <Input
                            id="postal_code"
                            value={formData.postal_code}
                            onChange={(e) =>
                              setFormData({ ...formData, postal_code: e.target.value })
                            }
                            placeholder="LV-1000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">{t("country")}</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({ ...formData, country: e.target.value })
                            }
                            placeholder="LV"
                          />
                        </div>
                      </div>

                      <Button
                        variant="luxury"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        {t("saveChanges")}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="bg-card border border-border p-6 rounded-sm">
                  <h2 className="font-display text-xl text-foreground mb-6">
                    {t("orderHistory")}
                  </h2>

                  {ordersLoading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-10">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">{t("noOrdersYet")}</p>
                      <Link to="/shop">
                        <Button variant="luxuryOutline">{t("startShopping")}</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-border p-4 rounded-sm"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-medium text-foreground">
                                {t("order")} #{order.id.slice(0, 8)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.created_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded ${order.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                  }`}
                              >
                                {order.status}
                              </span>
                              <p className="font-display text-lg mt-1">
                                {formatPrice(order.total_amount)}
                              </p>
                            </div>
                          </div>
                          {order.order_items && order.order_items.length > 0 && (
                            <div className="border-t border-border pt-3">
                              {order.order_items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {item.product_name} × {item.quantity}
                                  </span>
                                  <span>{formatPrice(item.product_price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <div className="bg-card border border-border p-6 rounded-sm">
                  <h2 className="font-display text-xl text-foreground mb-6">
                    {t("myWishlist")}
                  </h2>

                  {wishlistIds.length === 0 ? (
                    <div className="text-center py-10">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">{t("wishlistEmpty")}</p>
                      <Link to="/shop">
                        <Button variant="luxuryOutline">{t("discoverCollection")}</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">
                        {wishlistIds.length} {t("itemsInWishlist")}
                      </p>
                      <Link to="/shop" className="mt-4 inline-block">
                        <Button variant="luxuryOutline">{t("viewProducts")}</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>


            <div className="mt-12 p-4 border border-dashed border-muted-foreground/50 rounded-sm bg-muted/20">
              <h3 className="font-mono text-sm font-bold mb-2">Debug Info (Take a screenshot if issues persist)</h3>
              <div className="text-xs font-mono space-y-1">
                <p>User ID: {user?.id}</p>
                <p>Email: {user?.email}</p>
                <DebugRoles userId={user?.id} />
              </div>
            </div>
          </motion.div>
        </div>
      </main >

      <Footer />
    </div >
  );
};

export default Profile;
