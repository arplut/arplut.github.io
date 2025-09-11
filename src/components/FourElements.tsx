import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all 12 images
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";
import image8 from "@/assets/image8.jpg";
import image9 from "@/assets/image9.jpg";
import image10 from "@/assets/image10.jpg";
import image11 from "@/assets/image11.jpg";
import image12 from "@/assets/image12.jpg";

// Define the three image sets
const imageSet1 = [image1, image2, image3, image4];
const imageSet2 = [image5, image6, image7, image8];
const imageSet3 = [image9, image10, image11, image12];

// Element labels for each position
const elementLabels = ["Fire", "Earth", "Water", "Air"];

const FourElements = () => {
  const [currentState, setCurrentState] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const allImages = [...imageSet1, ...imageSet2, ...imageSet3];
    let loadedCount = 0;
    
    const preloadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === allImages.length) {
            setImagesLoaded(true);
          }
          resolve(true);
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === allImages.length) {
            setImagesLoaded(true);
          }
          resolve(false);
        };
        img.src = src;
      });
    };

    // Preload all images
    allImages.forEach(preloadImage);
  }, []);

  const titles = [
    "Click next to see what they look like today...",
    "This is what they should look like today. Click next again to see what they actually look like...",
    "This is what they actually look like today..."
  ];

  const getImageSet = () => {
    let images: string[];
    
    if (currentState === 0) {
      images = imageSet1;
    } else if (currentState === 1) {
      images = imageSet2;
    } else {
      images = imageSet3;
    }
    
    return images.map((img, index) => ({ 
      img, 
      label: elementLabels[index] 
    }));
  };

  const handleNext = () => {
    if (currentState < 2) setCurrentState(currentState + 1);
  };

  const handlePrev = () => {
    if (currentState > 0) setCurrentState(currentState - 1);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            THE FOUR ELEMENTS OF{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              NATURE
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {getImageSet().map((item, index) => (
            <div 
              key={`${currentState}-${index}`}
              className={`relative group overflow-hidden rounded-sm md:rounded-lg shadow-soft hover:shadow-glow transition-all duration-500 aspect-square ${
                imagesLoaded ? 'animate-slide-in-right' : 'opacity-50'
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentState === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>PREVIOUS</span>
          </Button>
          <Button
            variant="hero"
            size="lg"
            onClick={handleNext}
            disabled={currentState === 2}
            className="flex items-center space-x-2"
          >
            <span>NEXT</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <h3 className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {titles[currentState]}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default FourElements;
