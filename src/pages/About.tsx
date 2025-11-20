import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Instagram, MessageSquare, Users, Target, BarChart3, ArrowRight, Globe, Heart } from "lucide-react";
import FourElements from "@/components/FourElements";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
              Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              Empowering Citizens, <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transforming Cities
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              GEODHA bridges the gap between communities and civic action through transparent reporting, data visualization, and collective engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Four Elements of Nature */}
      <FourElements />

      {/* Vision & Impact Section */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why We Built{" "}
                <span className="text-primary">GEODHA</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Urban challenges like waste management, pollution, and infrastructure decay often go unnoticed or unresolved due to a lack of visibility and data. We believe that when citizens are equipped with the right tools, they become the most powerful agents of change.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Bengaluru Pilot</h3>
                    <p className="text-muted-foreground">
                      Launching first in India's tech capital, we're tackling the city's waste management challenges head-on with data-driven community action.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Global Vision</h3>
                    <p className="text-muted-foreground">
                      Building a scalable model for civic engagement that can be adapted by communities worldwide to solve their unique local challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <Card className="bg-background border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <BarChart3 className="h-10 w-10 text-primary mb-6" />
                  <h3 className="font-bold text-xl mb-3">Data-Driven Solutions</h3>
                  <p className="text-muted-foreground">
                    Transforming individual reports into comprehensive datasets for researchers, policymakers, and urban planners to implement effective long-term solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 translate-x-4 lg:translate-x-8">
                <CardContent className="p-8">
                  <Users className="h-10 w-10 text-primary mb-6" />
                  <h3 className="font-bold text-xl mb-3">Community Power</h3>
                  <p className="text-muted-foreground">
                    Creating a transparent ecosystem where every citizen's voice is heard, validated by peers, and amplified to drive accountability.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Be Part of the Solution</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a concerned citizen, a developer, or a city official, there's a place for you in our mission.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-xl">1</div>
              <h3 className="font-bold text-xl mb-4">Report Issues</h3>
              <p className="text-muted-foreground">
                Use our platform to document and map civic challenges in your neighborhood. Every report adds a data point to the bigger picture.
              </p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-xl">2</div>
              <h3 className="font-bold text-xl mb-4">Validate & Verify</h3>
              <p className="text-muted-foreground">
                Help ensure data accuracy by validating reports from others. Reliable data is the key to driving official action.
              </p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary font-bold text-xl">3</div>
              <h3 className="font-bold text-xl mb-4">Spread Awareness</h3>
              <p className="text-muted-foreground">
                Share insights and maps with your community. Awareness is the first step towards collective accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-24 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Join Our Mission</h2>
              <p className="text-primary-foreground/90 text-lg leading-relaxed max-w-xl">
                We are a team of passionate individuals committed to building better cities. We're looking for developers, storytellers, and community leaders to help us scale our impact.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" variant="secondary" className="text-primary font-bold" asChild>
                  <a href="mailto:contact@geodha.org">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10" asChild>
                  <a href="https://forms.gle/K3GGQdBe5k2uH44f7" target="_blank" rel="noopener noreferrer">
                    Volunteer with Us
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 fill-current" />
                Connect with Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://www.linkedin.com/company/geodha" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <Linkedin className="h-5 w-5" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/geodha_org" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a href="https://www.reddit.com/r/geodha" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">Reddit</span>
                </a>
                <a href="mailto:contact@geodha.org"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
