import { Card, CardContent } from "@/components/ui/card";
import { Camera, MapPin, Users, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Snap & Submit",
    description: "Spot an issue? Take a quick photo. Our app handles the details so you don't have to.",
    step: "01"
  },
  {
    icon: MapPin,
    title: "Pinpoint Location",
    description: " precise geolocation ensures authorities know exactly where to go. No confusing directions needed.",
    step: "02"
  },
  {
    icon: Users,
    title: "Verify & Amplify",
    description: "The community validates your report, adding weight and urgency to the issue.",
    step: "03"
  },
  {
    icon: CheckCircle2,
    title: "Watch it Change",
    description: "Track the progress in real-time and get notified when your city becomes a little bit better.",
    step: "04"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            From Problem to <span className="text-primary">Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process designed for action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="h-24 w-24 rounded-full bg-background border-4 border-secondary flex items-center justify-center shadow-soft group-hover:border-primary/30 transition-colors duration-300 z-10">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;