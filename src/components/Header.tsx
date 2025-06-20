
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
              <span className="hidden sm:inline">Little Knots by Harsha</span>
              <span className="sm:hidden">The LittleKnots</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Admin/Auth Section */}
            {isAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-4">
                    <User className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <Settings className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="ml-4">
                  <User className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="text-lg font-bold text-primary mb-4">
                    The LittleKnots
                  </div>
                  
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t">
                    {isAdmin ? (
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 px-3">Logged in as Admin</div>
                        <Link to="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full justify-start mb-2">
                            <Settings className="h-4 w-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleLogout}
                          className="w-full justify-start"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Admin Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
