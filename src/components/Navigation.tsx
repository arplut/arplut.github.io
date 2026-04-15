import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Languages, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/data',      label: 'Data' },
  { path: '/blog',      label: 'Blog' },
  { path: '/about',     label: 'About' },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo — normal colours */}
        <Link to="/" className="flex items-center shrink-0 group" onClick={() => window.scrollTo(0, 0)}>
          <img
            src={logoSvg}
            alt="GEODHA"
            className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            loading="eager"
            decoding="sync"
          />
        </Link>

        {/* City & Language selectors */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          {/* City selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground px-2 py-1 rounded transition-colors">
              <MapPin className="h-3.5 w-3.5" />
              Bengaluru
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 rounded-md border border-border bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-foreground font-medium rounded bg-muted">Bengaluru</div>
                <div className="px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">Other cities — Coming Soon</div>
              </div>
            </div>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Language selector with icon */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground px-2 py-1 rounded transition-colors" aria-label="Select language">
              <Languages className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 rounded-md border border-border bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-foreground font-medium rounded bg-muted">English</div>
                <div className="px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">ಕನ್ನಡ — Coming Soon</div>
                <div className="px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">हिन्दी — Coming Soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                currentPath === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Report a Problem CTA — right side */}
        <div className="hidden md:flex items-center ml-auto">
          <Button
            size="sm"
            className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold shadow-none"
            onClick={() => handleNavigation('/report')}
          >
            Report a Problem
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 flex flex-col gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  'text-left px-4 py-3 rounded-md text-sm font-medium transition-colors',
                  currentPath === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-border flex gap-2">
              <button className="flex items-center gap-1 px-4 py-2 text-xs text-foreground/60">
                <MapPin className="h-3 w-3" /> Bengaluru ▾
              </button>
              <button className="flex items-center gap-1 px-4 py-2 text-xs text-foreground/60">
                <Languages className="h-3.5 w-3.5" /> EN ▾
              </button>
            </div>
            <Button
              size="sm"
              className="mt-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold"
              onClick={() => handleNavigation('/report')}
            >
              Report a Problem
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
