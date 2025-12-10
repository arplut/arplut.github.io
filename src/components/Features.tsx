import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Map, Users, BookOpen, Share2, Shield } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Photo-based Reporting",
    description: "Capture issues with your camera and let AI automatically categorize and geo-tag them.",
    color: "text-primary"
  },
  {
    icon: Map,
    title: "Interactive Heatmap",
    description: "Visualize civic issues across your city with our real-time interactive map.",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Community Validation",
    description: "Build trust through peer verification and endorsements from fellow citizens.",
    color: "text-warning"
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub",
    description: "Learn about organizations working on solutions, causes of problems, actions you can take, and more.",
    color: "text-primary"
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share reports with authorities and social networks with one tap.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Anonymous Reporting",
    description: "Report sensitive issues anonymously while maintaining accountability.",
    color: "text-warning"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything You Need to Make a{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Difference
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to make civic engagement simple, effective, and transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-soft hover:shadow-glow transition-all duration-300 group">
              <CardHeader>
                <div className={`h-12 w-12 rounded-lg bg-gradient-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;