import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || isScrolled) {
    return null;
  }

  return (
    <div className="relative z-50 bg-gradient-hero text-white py-2 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center relative">
        <p className="text-sm sm:text-base text-center">
          We have launched the app for Android devices!{' '}
          <Button 
            variant="link" 
            className="text-white underline p-0 h-auto font-medium hover:text-white/80 sm:text-base"
            asChild
          >
            <a 
              href="https://play.google.com/store/apps/details?id=com.geodha.community" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Click here to install the app
            </a>
          </Button>
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-0 h-6 w-6 text-white hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
