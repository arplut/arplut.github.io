import { Button } from "@/components/ui/button";

const VideoSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* 
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            See GEODHA in{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Action
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how citizens are transforming their communities through civic engagement.
          </p>
        </div>
        */}

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Featured Video - Standard format */}
          <div className="relative aspect-video bg-card rounded-xl shadow-soft overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/6Edat2kJj6A"
              title="GEODHA Platform Overview"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          
          {/* Learn More Button */}
          <div className="text-center">
            <Button variant="hero" size="lg" onClick={() => {
              window.history.pushState({}, '', '/about');
              window.dispatchEvent(new PopStateEvent('popstate'));
              // Reset scroll position to top
              setTimeout(() => window.scrollTo(0, 0), 100);
            }}>
              Learn more about GEODHA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
