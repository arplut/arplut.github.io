import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Camera, LogOut, Home, Map, BarChart3, BookOpen, LogIn, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthService from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const authService = new AuthService();

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/reports', label: 'Reports', icon: Map },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/about', label: 'About', icon: BookOpen },
  ];

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Logout Failed', description: 'There was an error logging out.', variant: 'destructive' });
    }
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={logoSvg} 
              alt="GEODHA Logo" 
              className="h-6 w-auto object-contain transition-transform duration-200 ease-in-out group-hover:scale-105 sm:h-7 md:h-8 lg:h-9"
              loading="eager"
              decoding="sync"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={currentPath === item.path ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex items-center space-x-2",
                currentPath === item.path && "shadow-soft"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/create">New Report</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  variant={currentPath === item.path ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className="justify-start space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
              
              {user ? (
                <>
                  <Button variant="ghost" size="sm" onClick={() => { handleNavigation('/create'); }} className="justify-start">
                    New Report
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => handleNavigation('/login')} className="justify-start">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                  <Button variant="hero" size="sm" onClick={() => handleNavigation('/signup')} className="justify-start">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;