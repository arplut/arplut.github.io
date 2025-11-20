import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Instagram, MessageSquare, Smartphone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoSvg from '@/assets/LOGO_SVG.svg';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src={logoSvg}
                alt="GEODHA Logo"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Empowering citizens to create cleaner, safer communities through transparent civic engagement and data-driven action.
            </p>
            <div className="flex gap-3">
              <SocialButton href="mailto:contact@geodha.org" icon={Mail} />
              <SocialButton href="https://www.linkedin.com/company/geodha" icon={Linkedin} />
              <SocialButton href="https://www.instagram.com/geodha_org" icon={Instagram} />
              <SocialButton href="https://www.reddit.com/r/geodha" icon={MessageSquare} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/map" className="hover:text-primary transition-colors">Live Map</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog & Updates</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><span className="opacity-50 cursor-not-allowed">Mobile App (Beta)</span></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Civic Data</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partner with Us</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
              <h3 className="font-semibold text-foreground mb-2">Get the App</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join thousands of citizens making a difference. Available soon on iOS and Android.
              </p>
              <Button
                variant="default"
                className="w-full bg-foreground text-background hover:bg-foreground/90 h-11"
                disabled
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 GEODHA. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton = ({ href, icon: Icon }: { href: string, icon: any }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export default Footer;