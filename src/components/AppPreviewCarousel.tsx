import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import screenshot1 from "@/assets/screenshot1.png";
import screenshot2 from "@/assets/screenshot2.png";
import screenshot3 from "@/assets/screenshot3.png";
import screenshot4 from "@/assets/screenshot4.png";
import screenshot5 from "@/assets/screenshot5.png";
import screenshot6 from "@/assets/screenshot6.png";
import screenshot7 from "@/assets/screenshot7.png";
import screenshot8 from "@/assets/screenshot8.png";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const screenshots = [
  { 
    src: screenshot1, 
    alt: "Interactive map view with civic issue pins",
    caption: "View all reports on an interactive map with color-coded pins"
  },
  { 
    src: screenshot2, 
    alt: "Create new report with photo upload",
    caption: "Capture and report issues with AI-powered categorization"
  },
  { 
    src: screenshot3, 
    alt: "Detailed report view with multiple photos",
    caption: "See detailed information and community endorsements"
  },
  { 
    src: screenshot4, 
    alt: "Reports list view",
    caption: "Browse all civic issues in your area with filtering options"
  },
  {
    src: screenshot5,
    alt: "User profile showing submitted reports and stats",
    caption: "Track your contributions and impact in the community"
  },  
  {
    src: screenshot6, 
    alt: "Notifications for report updates",
    caption: "Stay informed with real-time updates on your reports"
  },
  { 
    src: screenshot7, 
    alt: "Community leaderboard showcasing top contributors",
    caption: "Join others in making a difference with community leaderboards"
  },
  { 
    src: screenshot8,
    alt: "App settings and preferences screen",
    caption: "Customize your app experience with various settings"
  },
];

const AppPreviewCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            See GEODHA in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          {/* <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of community-driven civic engagement
          </p> */}
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {screenshots.map((screenshot, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/5 sm:basis-2/5 md:basis-1/3">
                  <div className="p-1">
                    <Card 
                      className={`overflow-hidden border-0 transition-all duration-500 ${
                        index === current 
                          ? "shadow-glow scale-100 opacity-100" 
                          : "shadow-soft scale-[0.65] sm:scale-75 md:scale-90 opacity-40"
                      }`}
                    >
                      <div className="aspect-[9/16] relative">
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-12 hidden md:flex" />
            <CarouselNext className="right-0 translate-x-12 hidden md:flex" />
          </Carousel>
          
          {/* <div className="text-center mt-8">
            <p className="text-lg text-foreground font-medium animate-fade-in">
              {screenshots[current].caption}
            </p>
          </div> */}

          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="lg" onClick={() => {
              window.history.pushState({}, '', '/about');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo(0, 0);
            }}>
              Learn more about GEODHA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreviewCarousel;
