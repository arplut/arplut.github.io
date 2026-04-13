import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import logoSvg from '@/assets/LOGO_SVG.svg';

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/data',      label: 'Data' },
  { path: '/blog',      label: 'Blog' },
  { path: '/report',    label: 'Report a Problem' },
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
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-[#1B4332] text-white">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0 group" onClick={() => window.scrollTo(0, 0)}>
          <img
            src={logoSvg}
            alt="GEODHA"
            className="h-8 w-auto object-contain brightness-0 invert transition-transform duration-200 group-hover:scale-105"
            loading="eager"
            decoding="sync"
          />
        </Link>

        {/* City & Language selectors */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white px-2 py-1 rounded transition-colors">
              Bengaluru
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-44 rounded-md border border-white/10 bg-[#1B4332] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-white font-medium rounded bg-white/10">Bengaluru</div>
                <div className="px-3 py-2 text-sm text-white/40 cursor-not-allowed">Other cities — Coming Soon</div>
              </div>
            </div>
          </div>

          <div className="w-px h-4 bg-white/20" />

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white px-2 py-1 rounded transition-colors">
              English
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-40 rounded-md border border-white/10 bg-[#1B4332] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="p-2">
                <div className="px-3 py-2 text-sm text-white font-medium rounded bg-white/10">English</div>
                <div className="px-3 py-2 text-sm text-white/40 cursor-not-allowed">ಕನ್ನಡ — Coming Soon</div>
                <div className="px-3 py-2 text-sm text-white/40 cursor-not-allowed">हिन्दी — Coming Soon</div>
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
                  ? 'bg-white/15 text-white'
                  : 'text-white/75 hover:text-white hover:bg-white/10',
                item.path === '/report' && currentPath !== '/report'
                  ? 'text-[#F59E0B] hover:text-[#FBBF24] hover:bg-amber-900/20'
                  : ''
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Download App CTA */}
        <div className="hidden md:flex items-center ml-auto">
          <Button
            size="sm"
            className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold shadow-none"
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.geodha.community', '_blank', 'noopener,noreferrer')}
          >
            <Smartphone className="h-4 w-4 mr-1.5" />
            Download App
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 rounded-md text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1B4332]">
          <div className="container py-4 flex flex-col gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  'text-left px-4 py-3 rounded-md text-sm font-medium transition-colors',
                  currentPath === item.path
                    ? 'bg-white/15 text-white'
                    : 'text-white/75 hover:text-white hover:bg-white/10',
                  item.path === '/report' ? 'text-[#F59E0B]' : ''
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/10 flex gap-2">
              <button className="flex-1 text-left px-4 py-2 text-xs text-white/60">Bengaluru ▾</button>
              <button className="flex-1 text-left px-4 py-2 text-xs text-white/60">English ▾</button>
            </div>
            <Button
              size="sm"
              className="mt-2 bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold"
              onClick={() => window.open('https://play.google.com/store/apps/details?id=com.geodha.community', '_blank', 'noopener,noreferrer')}
            >
              <Smartphone className="h-4 w-4 mr-1.5" />
              Download App
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
