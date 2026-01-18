import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlistIds([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setWishlistIds(data.map((item) => item.product_id));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast.error("Please sign in to add items to wishlist");
      return false;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId });

      if (error) throw error;
      setWishlistIds((prev) => [...prev, productId]);
      toast.success("Added to wishlist!");
      return true;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return false;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) throw error;
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      toast.success("Removed from wishlist");
      return true;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = async (productId: string) => {
    if (wishlistIds.includes(productId)) {
      return removeFromWishlist(productId);
    } else {
      return addToWishlist(productId);
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return {
    wishlistIds,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    refetch: fetchWishlist,
  };
};
