import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AdminOrder {
  id: string;
  user_id: string | null;
  total_amount: number;
  status: string;
  shipping_address: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  } | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
  order_items: {
    id: string;
    product_name: string;
    product_price: number;
    quantity: number;
  }[];
}

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_name,
            product_price,
            quantity
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      setOrders(ordersData as AdminOrder[]);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );

      toast({
        title: "Status updated",
        description: `Order status changed to ${status}`,
      });
    } catch (err) {
      console.error('Error updating order status:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update order status",
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, isLoading, error, refetch: fetchOrders, updateOrderStatus };
};
