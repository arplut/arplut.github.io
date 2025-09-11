import { Button } from "@/components/ui/button";
import { Camera, MapPin, Users, CheckCircle, Smartphone } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-subtle">
      <div className="container px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Report. Track.{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Transform
                </span>{" "}
                Your City
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                GEODHA empowers citizens to report civic issues, track their resolution, 
                and build cleaner, safer communities through collective action.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1 sm:flex-none py-4 sm:py-3" onClick={() => {
                window.history.pushState({}, '', '/reports');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}>
                <MapPin className="h-5 w-5 mr-2" />
                View Map
              </Button>
              <Button 
                variant="default" 
                size="lg" 
                className="flex-1 sm:flex-none py-4 sm:py-3 bg-black text-white hover:bg-black/90" 
                disabled
              >
                <Smartphone className="h-5 w-5 mr-2" />
                Reporting App - Coming Soon
              </Button>
            </div>

          {/* 
            <div className="grid grid-cols-3 gap-8 </p>pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Reports Filed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5K+</div>
                <div className="text-sm text-muted-foreground">Active Citizens</div>
              </div>
            </div>
            */}

            <div className="pt-8">
              <p className="text-lg text-muted-foreground">
                Beta testing in Bangalore, India has been completed. We have identified an area with significant challenges of garbage dumping and open burning.{" "}
                <button 
                  className="text-primary hover:text-primary-foreground underline underline-offset-4 hover:no-underline transition-all duration-200"
                  onClick={() => {
                    window.open('https://drive.google.com/file/d/1mAYuQQaYTORPAEiC3b8xcQ3jHLebaxVY/view?usp=drive_link', '_blank', 'noopener,noreferrer');
                  }}
                >
                  Click here to read the report.
                </button>
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl"></div>
            <img
              src={heroImage}
              alt="Citizens reporting civic issues in a clean city environment"
              className="relative rounded-2xl shadow-glow object-cover w-full h-[500px]"
            />
            
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-soft border">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Issue Reported!</div>
                  {/* <div className="text-sm text-muted-foreground">Garbage cleared in 2 days</div> */}
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