import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdminProduct {
  id: string;
  name: string;
  name_lv: string | null;
  name_ru: string | null;
  description: string | null;
  description_lv: string | null;
  description_ru: string | null;
  price: number;
  category: string;
  image_url: string | null;
  carat: string | null;
  clarity: string | null;
  cut: string | null;
  color: string | null;
  metal: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  name_lv?: string;
  name_ru?: string;
  description?: string;
  description_lv?: string;
  description_ru?: string;
  price: number;
  category: string;
  image_url?: string;
  carat?: string;
  clarity?: string;
  cut?: string;
  color?: string;
  metal?: string;
  is_active: boolean;
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch all products including inactive ones for admin
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setProducts(data as AdminProduct[]);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (productData: ProductFormData) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => [data as AdminProduct, ...prev]);

      toast({
        title: "Product created",
        description: "The product has been created successfully",
      });

      return data;
    } catch (err) {
      console.error('Error creating product:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product",
      });
      throw err;
    }
  };

  const updateProduct = async (id: string, productData: Partial<ProductFormData>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProducts(prev => 
        prev.map(product => 
          product.id === id ? (data as AdminProduct) : product
        )
      );

      toast({
        title: "Product updated",
        description: "The product has been updated successfully",
      });

      return data;
    } catch (err) {
      console.error('Error updating product:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product",
      });
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProducts(prev => prev.filter(product => product.id !== id));

      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
      throw err;
    }
  };

  const toggleProductStatus = async (id: string, isActive: boolean) => {
    await updateProduct(id, { is_active: isActive });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
  };
};
