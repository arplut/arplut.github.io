import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Camera, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const GetStarted = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Download the App",
      description: "Available soon on iOS and Android. Join our waitlist to get early access.",
      status: "Coming Soon"
    },
    {
      icon: Camera,
      title: "Snap a Photo",
      description: "See an issue? Take a clear photo. Our AI helps categorize it automatically.",
      status: "Feature Ready"
    },
    {
      icon: MapPin,
      title: "Confirm Location",
      description: "Verify the location on the map to ensure accurate reporting.",
      status: "Feature Ready"
    },
    {
      icon: CheckCircle2,
      title: "Track & Resolve",
      description: "Watch as the community validates your report and authorities take action.",
      status: "Feature Ready"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 bg-gradient-subtle border-b border-border/50">
        <div className="container px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Start Making a Difference
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join the movement to transform your city. It's easier than you think.
          </p>
          <Button size="lg" variant="hero" className="shadow-lg shadow-primary/20" onClick={() => window.open('https://forms.gle/K3GGQdBe5k2uH44f7', '_blank')}>
            Join the Waitlist <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      {step.status === "Coming Soon" && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                          {step.status}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to join us?</h2>
          <p className="text-muted-foreground mb-8">
            Be among the first to use GEODHA in your city.
          </p>
          <Button size="lg" variant="default" onClick={() => window.open('https://forms.gle/K3GGQdBe5k2uH44f7', '_blank')}>
            Sign Up for Updates
          </Button>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;
