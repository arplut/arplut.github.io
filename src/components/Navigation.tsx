import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Home, Map, BookOpen, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/map', label: 'Reports', icon: Map },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/about', label: 'About', icon: FileText },
  ];

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  // Function to handle Get Started button click - temporarily link to pre-register form
  const handleGetStarted = () => {
    // TODO: Uncomment this when GetStarted page is ready
    // navigate('/get-started');
    
    // Temporary: Link to pre-register form
    window.open('https://forms.gle/K3GGQdBe5k2uH44f7', '_blank');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={logoSvg} 
              alt="GEODHA Logo" 
              className="h-8 w-auto object-contain transition-transform duration-200 ease-in-out group-hover:scale-105 sm:h-7 md:h-8 lg:h-9"
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

        {/* Auth Buttons - Simplified to just Get Started */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="hero" size="sm" onClick={handleGetStarted}>
            Get Started
          </Button>
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
              
              {/* Mobile Get Started Button */}
              <Button variant="hero" size="sm" onClick={handleGetStarted} className="justify-start">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;