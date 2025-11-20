import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              See the <span className="text-primary">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              GEODHA isn't just an app; it's a movement. Watch how citizens across Bangalore are coming together to reclaim their streets from garbage and pollution.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transparency leads to accountability. When we document issues collectively, we create a dataset that cannot be ignored.
            </p>

            <div className="pt-4">
              <Button size="lg" className="h-12 px-8 text-base" onClick={() => {
                window.history.pushState({}, '', '/about');
                window.dispatchEvent(new PopStateEvent('popstate'));
                setTimeout(() => window.scrollTo(0, 0), 100);
              }}>
                Read Our Story <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl rounded-full" />
            <div className="relative aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800 group cursor-pointer">
              <iframe
                src="https://www.youtube.com/embed/6Edat2kJj6A"
                title="GEODHA Platform Overview"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
