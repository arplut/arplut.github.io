import { Button } from "@/components/ui/button";
import { Camera, MapPin, Users, Mail, Phone, Globe, Linkedin, Instagram, MessageSquare, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import logoSvg from '@/assets/LOGO_SVG.svg';

const Footer = () => {
  return (
    <footer className="bg-card border-t">
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group inline-block">
              <img 
                src={logoSvg} 
                alt="GEODHA Logo" 
                className="h-8 w-auto object-contain transition-transform duration-200 ease-in-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering citizens to create cleaner, safer communities through transparent civic engagement.
            </p>
            <div className="space-y-3">
              
              
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" asChild>
                  <a href="mailto:contact@geodha.org">
                    <Mail className="h-4 w-4" />
                  </a>
               </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/company/geodha" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.instagram.com/geodha_org" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.reddit.com/r/geodha" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="cursor-default">Photo Reporting</span></li>
              <li><span className="cursor-default">Interactive Maps</span></li>
              <li><span className="cursor-default">Community Validation</span></li>
              <li><span className="cursor-default">Analytics</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="cursor-default">Knowledge Hub</span></li>
              <li><span className="cursor-default">Community Guidelines</span></li>
              <li><span className="cursor-default">Success Stories</span></li>
              <li><span className="cursor-default">Help Center</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get Started</h3>
            <p className="text-muted-foreground">
              Join thousands of citizens making a difference in their communities.
            </p>
            <Button 
              variant="default" 
              className="w-full bg-black text-white hover:bg-black/90" 
              disabled
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Reporting App - Coming Soon
            </Button>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 GEODHA. All rights reserved. Building better communities together.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-sm text-muted-foreground cursor-default">Terms of Service</span>
            <a href="mailto:contact@geodha.org" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;