import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminProducts, ProductFormData } from "@/hooks/useAdminProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = [
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
];

export const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProduct, updateProduct } = useAdminProducts();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    name_lv: "",
    name_ru: "",
    description: "",
    description_lv: "",
    description_ru: "",
    price: 0,
    category: "rings",
    image_url: "",
    carat: "",
    clarity: "",
    cut: "",
    color: "",
    metal: "",
    is_active: true,
  });

  useEffect(() => {
    if (isEditing && id) {
      const fetchProduct = async () => {
        setIsFetching(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching product:', error);
          navigate('/admin/products');
          return;
        }

        if (data) {
          setFormData({
            name: data.name,
            name_lv: data.name_lv || "",
            name_ru: data.name_ru || "",
            description: data.description || "",
            description_lv: data.description_lv || "",
            description_ru: data.description_ru || "",
            price: Number(data.price),
            category: data.category,
            image_url: data.image_url || "",
            carat: data.carat || "",
            clarity: data.clarity || "",
            cut: data.cut || "",
            color: data.color || "",
            metal: data.metal || "",
            is_active: data.is_active ?? true,
          });
        }
        setIsFetching(false);
      };

      fetchProduct();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && id) {
        await updateProduct(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isFetching) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? "Edit Product" : "Add Product"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update product information" : "Create a new product"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="en">
                <TabsList>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="lv">Latvian</TabsTrigger>
                  <TabsTrigger value="ru">Russian</TabsTrigger>
                </TabsList>
                <TabsContent value="en" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name (English) *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (English)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="lv" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_lv">Product Name (Latvian)</Label>
                    <Input
                      id="name_lv"
                      value={formData.name_lv}
                      onChange={(e) => handleChange("name_lv", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_lv">Description (Latvian)</Label>
                    <Textarea
                      id="description_lv"
                      value={formData.description_lv}
                      onChange={(e) => handleChange("description_lv", e.target.value)}
                      rows={4}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="ru" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name_ru">Product Name (Russian)</Label>
                    <Input
                      id="name_ru"
                      value={formData.name_ru}
                      onChange={(e) => handleChange("name_ru", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_ru">Description (Russian)</Label>
                    <Textarea
                      id="description_ru"
                      value={formData.description_ru}
                      onChange={(e) => handleChange("description_ru", e.target.value)}
                      rows={4}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (€) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleChange("image_url", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Diamond Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Diamond Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carat">Carat</Label>
                  <Input
                    id="carat"
                    value={formData.carat}
                    onChange={(e) => handleChange("carat", e.target.value)}
                    placeholder="e.g., 1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clarity">Clarity</Label>
                  <Input
                    id="clarity"
                    value={formData.clarity}
                    onChange={(e) => handleChange("clarity", e.target.value)}
                    placeholder="e.g., VVS1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cut">Cut</Label>
                  <Input
                    id="cut"
                    value={formData.cut}
                    onChange={(e) => handleChange("cut", e.target.value)}
                    placeholder="e.g., Excellent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    placeholder="e.g., D"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metal">Metal</Label>
                  <Input
                    id="metal"
                    value={formData.metal}
                    onChange={(e) => handleChange("metal", e.target.value)}
                    placeholder="e.g., 18K White Gold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Active</Label>
                  <p className="text-sm text-muted-foreground">
                    When active, this product will be visible in the store
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleChange("is_active", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;
