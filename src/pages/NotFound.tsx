
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-accent/30 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="text-8xl font-bold text-primary/20 mb-4 animate-pulse">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! It looks like this page got tangled up in our yarn. 
          Let's get you back to our beautiful handmade creations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
