import { Button } from "@/components/ui/button";
import { MapPin, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-32 lg:pt-32 lg:pb-40">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground bg-secondary/50 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Live in Bangalore
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Transform Your City,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  One Report
                </span>{" "}
                at a Time.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Join a growing movement of citizens using GEODHA to identify issues, track resolutions, and build safer, cleaner communities together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="h-14 px-8 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" onClick={() => {
                window.history.pushState({}, '', '/map');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>
                <MapPin className="h-5 w-5 mr-2" />
                Explore the Map
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg border-2 hover:bg-secondary/50"
                disabled
              >
                <Smartphone className="h-5 w-5 mr-2" />
                Get the App
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Impact Report Available</h3>
                  <p className="text-muted-foreground">
                    See how we're tackling garbage dumping and open burning in Bangalore.{" "}
                    <a
                      href="https://drive.google.com/file/d/1mAYuQQaYTORPAEiC3b8xcQ3jHLebaxVY/view?usp=drive_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline inline-flex items-center"
                    >
                      Read the case study <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-slide-in-right">
            <div className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <img
                src={heroImage}
                alt="Community impact"
                className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-white/90 font-medium">Civic issues reported and tracked by concerned citizens like you.</div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-8 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-sm">Issue Resolved</div>
                  <div className="text-xs text-muted-foreground">2 mins ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;