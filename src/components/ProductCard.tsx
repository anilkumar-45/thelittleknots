
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Edit, Trash2, IndianRupee, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductCard = ({ product, isAdmin, onEdit, onDelete }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleInstagramInquiry = () => {
    const message = `Hi! I'm interested in your handmade product: ${product.name} - ₹${product.price}. Can you tell me more about it? I understand that stitching the crochet products takes 3 to 4 days to deliver.`;
    const instagramUrl = `https://instagram.com/the.littleknots`;
    window.open(instagramUrl, '_blank');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'keytags': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'accessories': return 'bg-green-100 text-green-800 border-green-200';
      case 'toys': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Use primary image or first image from the database
  const imageUrl = product.primary_image_url || product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop';

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200 overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex-1">
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
            {!imageLoaded && (
              <div className="text-gray-400 text-sm animate-pulse">Loading...</div>
            )}
            <img
              src={imageUrl}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
          <Badge 
            className={`absolute top-3 left-3 ${getCategoryColor(product.category)} shadow-sm`}
            variant="secondary"
          >
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm px-3 py-1 bg-red-600 text-white">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-2xl font-bold text-primary">
              <IndianRupee className="h-5 w-5 mr-1" />
              {product.price.toFixed(2)}
            </div>
            {product.in_stock && (
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                In Stock
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        {isAdmin ? (
          <div className="flex space-x-2 w-full">
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full hover:bg-blue-50 hover:border-blue-300">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            <Button
              onClick={() => onEdit(product)}
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              onClick={() => onDelete(product.id)}
              variant="destructive"
              size="sm"
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2 w-full">
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button
              onClick={handleInstagramInquiry}
              disabled={!product.in_stock}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-medium transition-all duration-200"
              size="sm"
            >
              <Instagram className="h-4 w-4 mr-2" />
              {product.in_stock ? 'Order' : 'Out of Stock'}
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
