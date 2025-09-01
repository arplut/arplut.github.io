import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Map, BarChart3, User, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Navigation = ({ currentPath, onNavigate }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/reports', label: 'Reports', icon: Map },
    { path: '/map', label: 'Map', icon: Map },
    { path: '/create', label: 'New Report', icon: Camera },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-primary cursor-pointer" onClick={() => handleNavigate('/')}>
            GEODHA
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={currentPath === item.path ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigate(item.path)}
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
                  onClick={() => handleNavigate(item.path)}
                  className="justify-start space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;