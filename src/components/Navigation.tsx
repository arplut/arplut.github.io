import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Home, Map, BookOpen, X, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleGetStarted = () => {
    window.open('https://forms.gle/K3GGQdBe5k2uH44f7', '_blank');
  };

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm" : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2 group relative z-50">
          <img
            src={logoSvg}
            alt="GEODHA Logo"
            className="h-10 w-auto object-contain transition-transform duration-200 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-secondary/50 backdrop-blur-sm rounded-full p-1.5 border border-border/50">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "rounded-full px-4 transition-all duration-200",
                currentPath === item.path
                  ? "bg-background shadow-sm text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="default"
            size="sm"
            onClick={handleGetStarted}
            className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col justify-center px-8",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="flex flex-col space-y-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "text-3xl font-bold text-left transition-colors flex items-center gap-4",
                currentPath === item.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-8 w-8" />
              {item.label}
            </button>
          ))}

          <div className="pt-8 border-t border-border/50">
            <Button size="lg" onClick={handleGetStarted} className="w-full text-lg h-14 rounded-xl">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;