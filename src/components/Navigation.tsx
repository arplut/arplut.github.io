import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Languages, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const navigationItems = [
  { path: '/',          label: 'Home' },
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
      <div className="container flex h-16 items-center gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 group" onClick={() => window.scrollTo(0, 0)}>
          <img
            src={logoSvg}
            alt="GEODHA"
            className="h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            loading="eager"
            decoding="sync"
          />
        </Link>

        {/* City & Language selectors — visible on all screen sizes */}
        <div className="flex items-center gap-1 ml-1">
          {/* City selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground px-2 py-1 rounded transition-colors">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden xs:inline sm:inline">Bengaluru</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-48 rounded-md border border-border bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-foreground font-medium rounded bg-muted">Bengaluru</div>
                <a
                  href="https://forms.gle/K3GGQdBe5k2uH44f7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                >
                  Other cities <span className="text-xs text-muted-foreground/60">(coming soon)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Language selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground px-2 py-1 rounded transition-colors" aria-label="Select language">
              <Languages className="h-4 w-4" />
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 rounded-md border border-border bg-white shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-foreground font-medium rounded bg-muted">English</div>
                <div className="px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">ಕನ್ನಡ <span className="text-xs">(coming soon)</span></div>
                <div className="px-3 py-2 text-sm text-muted-foreground/50 cursor-not-allowed">हिन्दी <span className="text-xs">(coming soon)</span></div>
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

        {/* Report a Problem CTA — desktop only */}
        <div className="hidden md:flex items-center ml-auto">
          <button
            onClick={() => handleNavigation('/report')}
            className="px-4 py-2 text-sm font-semibold text-white rounded-md shadow-none transition-opacity hover:opacity-90"
            style={{ background: 'var(--gradient-hero)' }}
          >
            Report a Problem
          </button>
        </div>

        {/* Mobile hamburger */}
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
            <button
              onClick={() => handleNavigation('/report')}
              className="mt-2 px-4 py-2.5 text-sm font-semibold text-white rounded-md w-full text-left hover:opacity-90 transition-opacity"
              style={{ background: 'var(--gradient-hero)' }}
            >
              Report a Problem
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
