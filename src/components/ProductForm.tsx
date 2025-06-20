
import { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, ProductImage } from '@/types/Product';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useToast } from '@/hooks/use-toast';

interface ProductFormProps {
  product?: Product;
  onSave: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const { uploadImage } = useSupabaseProducts();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    category: 'accessories' as 'keytags' | 'accessories' | 'toys',
    in_stock: true,
    images: [] as ProductImage[]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description || '',
        category: product.category,
        in_stock: product.in_stock,
        images: product.images || []
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.images.length === 0) {
      toast({
        title: "Validation Error", 
        description: "Please add at least one product image",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      const newImage: ProductImage = {
        id: Date.now().toString(),
        product_id: product?.id || '',
        image_url: imageUrl,
        is_primary: formData.images.length === 0,
        display_order: formData.images.length,
        created_at: new Date().toISOString()
      };

      setFormData({ 
        ...formData, 
        images: [...formData.images, newImage]
      });

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    // If we removed the primary image, make the first remaining image primary
    if (updatedImages.length > 0 && formData.images[index].is_primary) {
      updatedImages[0].is_primary = true;
    }
    setFormData({
      ...formData,
      images: updatedImages.map((img, idx) => ({ ...img, display_order: idx }))
    });
  };

  const setPrimaryImage = (index: number) => {
    const updatedImages = formData.images.map((img, idx) => ({
      ...img,
      is_primary: idx === index
    }));
    setFormData({ ...formData, images: updatedImages });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Beautiful Crochet Bag"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="299.99"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value: 'keytags' | 'accessories' | 'toys') => 
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keytags">Keytags</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Handmade with love using premium cotton yarn..."
                rows={3}
              />
            </div>

            {/* Product Images */}
            <div>
              <Label>Product Images *</Label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="flex-1"
                  />
                  {isUploading && (
                    <div className="text-sm text-gray-500">Uploading...</div>
                  )}
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.image_url}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-32 object-cover rounded border"
                        />
                        <div className="absolute top-1 right-1 flex space-x-1">
                          <Button
                            type="button"
                            variant={image.is_primary ? "default" : "secondary"}
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => setPrimaryImage(index)}
                          >
                            {image.is_primary ? 'Primary' : 'Set Primary'}
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Add multiple images to showcase your product from different angles. The first image will be set as primary.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="inStock"
                checked={formData.in_stock}
                onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isUploading}>
                {product ? 'Update' : 'Add'} Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
