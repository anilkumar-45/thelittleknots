
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import MobileSidebar from './MobileSidebar';

const Navigation = () => {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Name - centered on mobile, left on desktop */}
          <Link to="/" className="flex items-center space-x-3 flex-1 justify-center md:justify-start md:flex-none">
            <img 
              src="/lovable-uploads/f8ce03ed-3477-4aff-985d-d166b46d732e.png" 
              alt="Little Knots by Harsha Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">The LittleKnots</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActivePath(item.path)
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {!isAdmin ? (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Admin Login
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Sidebar - moved to right */}
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
};

export default Navigation;
