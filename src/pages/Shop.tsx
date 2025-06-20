
import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { Product } from '@/types/Product';
import { useAuth } from '@/contexts/AuthContext';

const Shop = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useSupabaseProducts();
  const { isAdmin } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'keytags', label: 'Keytags' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'toys', label: 'Toys' }
  ];

  const filteredProducts = products.filter(product => 
    activeFilter === 'all' || product.category === activeFilter
  );

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }
    setShowProductForm(false);
    setEditingProduct(undefined);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(undefined);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Our Shop
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Browse our complete collection of handmade crochet items
          </p>
        </div>

        {/* Categories Filter - Mobile optimized */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8 px-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className="text-xs sm:text-sm px-3 py-2 mb-2"
              size="sm"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="mb-6 sm:mb-8 flex justify-center px-4">
            <Button
              onClick={() => setShowProductForm(true)}
              className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Product
            </Button>
          </div>
        )}

        {/* Products Grid - Mobile optimized */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-600 text-base sm:text-lg mb-4">
              {activeFilter === 'all' 
                ? 'No products available yet.' 
                : `No products found in the ${activeFilter} category.`
              }
            </p>
            {isAdmin && (
              <Button
                onClick={() => setShowProductForm(true)}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  isAdmin={isAdmin}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Shop;
