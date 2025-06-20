
import { Instagram, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const handleInstagram = () => {
    window.open('https://instagram.com/the.littleknots', '_blank');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-4">
              The LittleKnots
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Handcrafted crochet items made with love and attention to detail. 
              Each piece is unique and crafted with premium materials in India.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                onClick={handleInstagram}
                size="sm"
                className="bg-pink-600 hover:bg-pink-700 w-full sm:w-auto"
              >
                <Instagram className="h-4 w-4 mr-2" />
                Follow us
              </Button>
              <a 
                href="mailto:hello@littleknots.com" 
                className="text-gray-600 hover:text-primary transition-colors text-sm flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                hello@littleknots.com
              </a>
            </div>
          </div>

          {/* Quick Links & Categories Side by Side on larger screens */}
          <div className="grid grid-cols-2 gap-8 md:col-span-1 lg:col-span-2">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-600 hover:text-primary transition-colors">Home</a></li>
                <li><a href="/shop" className="text-gray-600 hover:text-primary transition-colors">Shop</a></li>
                <li><a href="/about" className="text-gray-600 hover:text-primary transition-colors">About</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/shop?category=accessories" className="text-gray-600 hover:text-primary transition-colors">Accessories</a></li>
                <li><a href="/shop?category=toys" className="text-gray-600 hover:text-primary transition-colors">Toys</a></li>
                <li><a href="/shop?category=keytags" className="text-gray-600 hover:text-primary transition-colors">Keytags</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-gray-600 text-sm order-2 sm:order-1">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
              <span>by Harsha</span>
            </div>
            <div className="text-gray-600 text-sm text-center order-1 sm:order-2">
              © {currentYear} The LittleKnots. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
