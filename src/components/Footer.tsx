import { Button } from "@/components/ui/button";
import { Camera, MapPin, Users, Mail, Phone, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Camera className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">GEODHA</span>
            </div>
            <p className="text-muted-foreground">
              Empowering citizens to create cleaner, safer communities through transparent civic engagement.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Photo Reporting</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Interactive Maps</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community Validation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Knowledge Hub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get Started</h3>
            <p className="text-muted-foreground">
              Join thousands of citizens making a difference in their communities.
            </p>
            <Button variant="hero" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Download App
            </Button>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 GEODHA. All rights reserved. Building better communities together.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;