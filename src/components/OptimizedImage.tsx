import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { generateBlurPlaceholder, createThumbnailUrl, preloadImage } from '@/lib/imageUtils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  expandable?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  placeholder,
  onLoad,
  onError,
  expandable = false, // Disabled by default
  aspectRatio = 'auto'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // Removed isExpanded state since we're disabling full preview
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Removed handleImageClick since we're disabling expansion

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      default:
        return '';
    }
  };

  const generatePlaceholderUrl = (width: number, height: number) => {
    return generateBlurPlaceholder(width, height);
  };

  // Use thumbnail for preview (no expansion functionality)
  const thumbnailSrc = createThumbnailUrl(src);
  const shouldUseThumbnail = src !== thumbnailSrc; // Always use thumbnail if different

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden bg-muted',
          getAspectClass(),
          // Removed expandable cursor styling
          className
        )}
      >
        {/* Loading placeholder */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
            <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Image failed to load</span>
          </div>
        )}

        {/* Actual image */}
        {isInView && !hasError && (
          <img
            ref={imgRef}
            src={shouldUseThumbnail ? thumbnailSrc : src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        {/* Removed expand icon - no longer supporting expansion */}
      </div>

      {/* Removed expanded modal - no longer supporting full image preview */}
    </>
  );
};

export default OptimizedImage;