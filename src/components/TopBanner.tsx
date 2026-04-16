import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative z-50 bg-gradient-hero text-white py-2.5 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-center relative">
        <p className="text-sm sm:text-base text-center pr-8">
          A new version of our app with powerful reporting tools is coming soon!{' '}
          <span className="font-semibold">Stay tuned for updates.</span>
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="absolute right-0 h-6 w-6 text-white hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
