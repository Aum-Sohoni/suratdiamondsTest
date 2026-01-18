import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const AdminDashboard = () => {
  const { orders, isLoading: ordersLoading } = useAdminOrders();
  const { products, isLoading: productsLoading } = useAdminProducts();

  const isLoading = ordersLoading || productsLoading;

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const activeProducts = products.filter(product => product.is_active).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `€${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "All time revenue",
    },
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingCart,
      description: `${pendingOrders} pending`,
    },
    {
      title: "Active Products",
      value: activeProducts.toString(),
      icon: Package,
      description: `${products.length} total products`,
    },
    {
      title: "Conversion Rate",
      value: "2.4%",
      icon: TrendingUp,
      description: "Last 30 days",
    },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {order.shipping_address?.firstName} {order.shipping_address?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.order_items.length} items • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€{Number(order.total_amount).toLocaleString()}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
