
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';

const Home = () => {
  const { products, loading } = useSupabaseProducts();
  const { isAdmin } = useAuth();
  
  // Show only first 6 products on home page
  const featuredProducts = products.slice(0, 6);

  const handleInstagram = () => {
    window.open('https://instagram.com/the.littleknots', '_blank');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Little Knots by Harsha
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 md:mb-6">
            Handmade with ❤️ in India
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Discover beautiful, handcrafted crochet items made with love and attention to detail. 
            Each piece is unique and crafted with premium materials in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              onClick={handleInstagram}
              size="lg" 
              variant="outline" 
              className="border-pink-500 text-pink-600 hover:bg-pink-50 w-full sm:w-auto"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Order on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Check out some of our most popular handmade items
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available yet.</p>
              <Button 
                onClick={handleInstagram}
                className="mt-4 bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Contact us on Instagram
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 px-2 sm:px-0">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={product}
                    isAdmin={isAdmin}
                    onEdit={() => {}}
                    onDelete={() => {}}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
            Why Choose Little Knots by Harsha?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="p-4 md:p-6 hover-lift">
              <div className="text-4xl md:text-5xl mb-4">🧶</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Premium Materials</h3>
              <p className="text-gray-600 text-sm md:text-base">Only the finest cotton and wool yarns are used in our creations.</p>
            </div>
            <div className="p-4 md:p-6 hover-lift">
              <div className="text-4xl md:text-5xl mb-4">❤️</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600 text-sm md:text-base">Each item is carefully handcrafted by Harsha with attention to every detail.</p>
            </div>
            <div className="p-4 md:p-6 hover-lift">
              <div className="text-4xl md:text-5xl mb-4">✨</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Unique Designs</h3>
              <p className="text-gray-600 text-sm md:text-base">Every piece is one-of-a-kind, just like you.</p>
            </div>
          </div>
          
          <div className="mt-8 md:mt-12">
            <Button 
              onClick={handleInstagram}
              className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto"
              size="lg"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow us on Instagram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
