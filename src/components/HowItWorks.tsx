import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Capture & Report",
    description: "Take a photo of civic issues like illegal garbage dumping, littering, open burning, etc.",
    step: "01"
  },
  {
    icon: MapPin,
    title: "Auto Location",
    description: "GPS automatically tags your location, or manually set it if reporting for another area.",
    step: "02"
  },
  {
    icon: Users,
    title: "Community Validates",
    description: "Other citizens verify your report, building trust and credibility in the system.",
    step: "03"
  },
  {
    icon: CheckCircle,
    title: "Track Resolution",
    description: "Monitor progress and see community confirmation whether authorities have addressed the issue.",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            How GEODHA{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your neighborhood and make a lasting impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-soft hover:shadow-glow transition-all duration-300 group overflow-hidden">
              <div className="absolute top-4 right-4 text-6xl font-bold text-muted/20 group-hover:text-primary/20 transition-colors">
                {step.step}
              </div>
              <CardContent className="p-6 pt-8">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 
        <div className="text-center">
          <Button variant="hero" size="lg" onClick={() => {
            window.history.pushState({}, '', '/create');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}>
            <Camera className="h-5 w-5 mr-2" />
            Start Your First Report
          </Button>
        </div>
        */}
      </div>
    </section>
  );
};

export default HowItWorks;