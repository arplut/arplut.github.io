import { Button } from "@/components/ui/button";
import { Camera, Map, User, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Camera className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">GEODHA</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            How it Works
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;