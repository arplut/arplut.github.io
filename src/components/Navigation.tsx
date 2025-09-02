import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mountain, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthService from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

const authService = new AuthService();

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/map', label: 'Map' },
    { href: '/reports', label: 'Reports' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/blog', label: 'Blog' },
  ];

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Logout Failed', description: 'There was an error logging out.', variant: 'destructive' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6" />
          <span className="font-bold">GEODHA</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                currentPath === item.href ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
              <Button asChild>
                <Link to="/create">New Report</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden ml-4">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`hover:text-foreground/80 ${
                    currentPath === item.href ? 'text-foreground' : 'text-foreground/60'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navigation;