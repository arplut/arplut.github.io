import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Map, Users, BookOpen, Share2, Shield } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Smart Reporting",
    description: "Snap a photo and let our AI handle the rest. Automatic categorization and geo-tagging make reporting effortless.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Map,
    title: "Real-time Insights",
    description: "Explore our interactive heatmap to visualize civic issues in your neighborhood and track city-wide trends.",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: Users,
    title: "Community Power",
    description: "Validate reports and build consensus. Your voice matters in prioritizing what needs to be fixed first.",
    color: "text-warning",
    bg: "bg-warning/10"
  },
  {
    icon: BookOpen,
    title: "Civic Knowledge",
    description: "Access a curated library of resources on civic rights, environmental impact, and effective action.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Share2,
    title: "Amplify Impact",
    description: "Seamlessly share critical issues with authorities and social networks to accelerate resolution.",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Report sensitive issues with confidence. We prioritize your privacy and data security above all.",
    color: "text-warning",
    bg: "bg-warning/10"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Tools for <span className="text-primary">Change Makers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the technology. You provide the will to improve your city.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 group bg-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;