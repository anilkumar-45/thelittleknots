
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Instagram, IndianRupee, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/Product';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useAuth } from '@/contexts/AuthContext';
import ProductForm from '@/components/ProductForm';
import ImageGallery from '@/components/ImageGallery';
import LoadingSpinner from '@/components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, updateProduct, deleteProduct } = useSupabaseProducts();
  const { isAdmin } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  const handleInstagramInquiry = () => {
    if (product) {
      const message = `Hi! I'm interested in your handmade product: ${product.name} - ₹${product.price}. Can you tell me more about it? I understand that stitching the crochet products takes 3 to 4 days to deliver.`;
      const instagramUrl = `https://instagram.com/the.littleknots`;
      window.open(instagramUrl, '_blank');
    }
  };

  const handleEditProduct = () => {
    setShowEditForm(true);
  };

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (product) {
      await updateProduct(product.id, productData);
      setShowEditForm(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (product && window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(product.id);
      window.history.back();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'keytags': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'accessories': return 'bg-green-100 text-green-800 border-green-200';
      case 'toys': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ImageGallery images={product.images || []} productName={product.name} />
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${getCategoryColor(product.category)} text-sm`} variant="secondary">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
                {product.in_stock ? (
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center text-3xl sm:text-4xl font-bold text-primary mb-6">
                <IndianRupee className="h-6 w-6 sm:h-8 w-8 mr-2" />
                {product.price.toFixed(2)}
              </div>
            </div>

            {/* Product Description */}
            {product.description && (
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Product Details */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Added:</span>
                    <span className="font-medium">
                      {new Date(product.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isAdmin ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={handleEditProduct}
                    variant="outline"
                    className="w-full hover:bg-blue-50 hover:border-blue-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button
                    onClick={handleDeleteProduct}
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Product
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleInstagramInquiry}
                  disabled={!product.in_stock}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 text-lg"
                  size="lg"
                >
                  <Instagram className="h-5 w-5 mr-2" />
                  {product.in_stock ? 'Order on Instagram' : 'Out of Stock'}
                </Button>
              )}
            </div>

            {/* Delivery Information */}
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">🚚 Delivery Information</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Each crochet item is handmade with love and care. Please allow 3-4 days for crafting and preparation. 
                  Contact us on Instagram for custom orders and delivery details.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditForm && (
        <ProductForm
          product={product}
          onSave={handleSaveProduct}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
