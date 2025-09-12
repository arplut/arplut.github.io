/**
 * Image optimization utilities for better performance without backend changes
 */

/**
 * Generate a blurred placeholder for lazy loading
 */
export const generateBlurPlaceholder = (width: number = 400, height: number = 300): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f3f4f6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e5e7eb;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grad)'/%3E%3C/svg%3E`;
};

/**
 * Create a low-quality image placeholder URL for fast loading
 * This would work with services like Cloudinary, ImageKit, or Vercel Image Optimization
 */
export const createOptimizedImageUrl = (originalUrl: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
} = {}): string => {
  // If the URL is from Firebase Storage, we can't modify it directly
  // But we can prepare the structure for future optimization service integration
  const { width, height, quality = 75, format = 'webp' } = options;
  
  // For Firebase Storage URLs, return original for now
  if (originalUrl.includes('firebasestorage.googleapis.com')) {
    return originalUrl;
  }
  
  // For future integration with image optimization services:
  // return `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${originalUrl}?w=${width}&h=${height}&q=${quality}&f=${format}`;
  
  return originalUrl;
};

/**
 * Create thumbnail version of an image URL
 */
export const createThumbnailUrl = (originalUrl: string): string => {
  return createOptimizedImageUrl(originalUrl, {
    width: 400,
    height: 300,
    quality: 60
  });
};

/**
 * Create preview version of an image URL
 */
export const createPreviewUrl = (originalUrl: string): string => {
  return createOptimizedImageUrl(originalUrl, {
    width: 800,
    height: 600,
    quality: 80
  });
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Check if image loading is supported
 */
export const supportsImageLoading = (): boolean => {
  return 'loading' in HTMLImageElement.prototype;
};

/**
 * Calculate optimal image dimensions for container
 */
export const calculateOptimalDimensions = (
  containerWidth: number,
  containerHeight: number,
  devicePixelRatio: number = window.devicePixelRatio || 1
): { width: number; height: number } => {
  return {
    width: Math.ceil(containerWidth * devicePixelRatio),
    height: Math.ceil(containerHeight * devicePixelRatio)
  };
};

/**
 * Image loading strategies
 */
export const imageLoadingStrategies = {
  // For images above the fold
  eager: 'eager' as const,
  // For images below the fold
  lazy: 'lazy' as const,
  // For critical images
  preload: 'preload' as const
};

/**
 * Create responsive image source set (for future use)
 */
export const createSrcSet = (baseUrl: string, widths: number[]): string => {
  return widths
    .map(width => `${createOptimizedImageUrl(baseUrl, { width })} ${width}w`)
    .join(', ');
};

/**
 * Image format support detection
 */
export const checkImageFormatSupport = async (): Promise<{
  webp: boolean;
  avif: boolean;
}> => {
  const webpSupport = await new Promise<boolean>((resolve) => {
    const webpImage = new Image();
    webpImage.onload = webpImage.onerror = () => resolve(webpImage.height === 2);
    webpImage.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });

  const avifSupport = await new Promise<boolean>((resolve) => {
    const avifImage = new Image();
    avifImage.onload = avifImage.onerror = () => resolve(avifImage.height === 2);
    avifImage.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });

  return { webp: webpSupport, avif: avifSupport };
};

/**
 * Compress image on client-side (for upload scenarios)
 */
export const compressImage = (
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'jpeg' | 'webp';
  } = {}
): Promise<Blob> => {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8, format = 'jpeg' } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};