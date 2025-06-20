
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Home, ShoppingBag, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/shop', label: 'Shop', icon: ShoppingBag },
    { path: '/about', label: 'About', icon: User },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - moved to right */}
      <button
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - slides from right */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/f8ce03ed-3477-4aff-985d-d166b46d732e.png" 
              alt="Little Knots Logo" 
              className="h-10 w-10 object-contain"
            />
            <h2 className="text-lg font-bold text-gray-900">Little Knots</h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`
                flex items-center space-x-3 px-6 py-4 text-base font-medium transition-colors
                ${isActivePath(item.path)
                  ? 'text-primary bg-primary/10 border-l-4 border-primary'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Admin Section */}
        <div className="border-t mt-auto">
          <div className="p-4">
            {!isAdmin ? (
              <Link to="/auth" onClick={closeSidebar}>
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" onClick={logout} className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
