import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail, Linkedin, Instagram, MessageSquare, Users, Target, BarChart3,
  Flame, Leaf, Droplets, Wind, ChevronLeft, ChevronRight,
} from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import VideoSection from "@/components/VideoSection";

// ── OUR PHILOSOPHY DATA ──────────────────────────────────────────────────────

const elements = [
  {
    id: 'fire',
    icon: Flame,
    label: 'Fire',
    states: [
      {
        color: 'text-orange-500',
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        title: 'Warmth & Vitality',
        desc: 'Fire sustains life — for cooking, warmth, and ceremony. In balance, it nourishes every community.',
      },
      {
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
        title: 'Open Burning',
        desc: 'Illegal waste fires release toxic smoke, choking neighbourhoods and harming the most vulnerable.',
      },
      {
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        title: 'Restored Balance',
        desc: 'With civic accountability, open burning is reported, acted on, and eliminated ward by ward.',
      },
    ],
  },
  {
    id: 'earth',
    icon: Leaf,
    label: 'Earth',
    states: [
      {
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-100',
        title: 'Fertile Ground',
        desc: 'Clean soil teems with life — gardens, trees, and ecosystems thriving in their natural balance.',
      },
      {
        color: 'text-yellow-700',
        bg: 'bg-yellow-50',
        border: 'border-yellow-100',
        title: 'Illegal Dumping',
        desc: 'Overflowing dumps contaminate soil and groundwater, spreading disease across wards.',
      },
      {
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        title: 'Clean Streets',
        desc: 'Reliable collection. Composted. Recycled. Waste returned to the earth as resource, not refuse.',
      },
    ],
  },
  {
    id: 'water',
    icon: Droplets,
    label: 'Water',
    states: [
      {
        color: 'text-blue-500',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        title: 'Clear & Flowing',
        desc: 'Rivers, lakes, and drainage run clean — a source of life and a fundamental right for all.',
      },
      {
        color: 'text-teal-700',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        title: 'Stagnant & Polluted',
        desc: 'Solid waste clogs drains. Stagnant pools breed mosquitoes and spread disease through communities.',
      },
      {
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-100',
        title: 'Protected Sources',
        desc: 'Drainage cleared. Dumping reported. Waterways protected through citizen evidence and action.',
      },
    ],
  },
  {
    id: 'air',
    icon: Wind,
    label: 'Air',
    states: [
      {
        color: 'text-sky-500',
        bg: 'bg-sky-50',
        border: 'border-sky-100',
        title: 'Fresh & Pure',
        desc: 'Clean air is invisible but vital — the foundation of every community\'s health and dignity.',
      },
      {
        color: 'text-gray-500',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        title: 'Foul & Toxic',
        desc: 'Rotting dumps and open burning fill neighbourhoods with unbearable smells and toxic air.',
      },
      {
        color: 'text-indigo-500',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        title: 'Breathable City',
        desc: 'No burning. No landfill gas. Air quality restored through data-driven civic accountability.',
      },
    ],
  },
];

const stateInfo = [
  {
    title: 'The Four Elements — In Their Natural State',
    subtitle: 'Pure, balanced, and vital. This is what every Bengaluru neighbourhood deserves.',
    prompt: 'Click Next to see what they look like today →',
  },
  {
    title: 'The Reality — What They Look Like Today',
    subtitle: 'Unmanaged waste degrades all four elements. These are the problems GEODHA maps.',
    prompt: 'Click Next to see what GEODHA is working to restore →',
  },
  {
    title: 'The Vision — What We Are Working To Restore',
    subtitle: 'With data, civic action, and accountability, every ward can reach this standard.',
    prompt: 'This is why GEODHA exists.',
  },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────

const About = () => {
  const [currentState, setCurrentState] = useState(0);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              About{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                GEODHA
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering communities through transparent civic engagement and data-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR PHILOSOPHY: RESTORING THE BALANCE OF NATURE ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-10 space-y-3">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Philosophy:{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Restoring the Balance of Nature
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              {stateInfo[currentState].subtitle}
            </p>
          </div>

          {/* 4 element cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {elements.map((el) => {
              const s = el.states[currentState];
              return (
                <div
                  key={el.id}
                  className={`rounded-xl p-6 border shadow-soft hover:shadow-glow transition-all duration-500 group ${s.bg} ${s.border}`}
                >
                  <div className="h-12 w-12 rounded-lg bg-white/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <el.icon className={`h-6 w-6 ${s.color}`} />
                  </div>
                  <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${s.color}`}>
                    {el.label}
                  </div>
                  <h3
                    className="font-bold text-foreground mb-2 leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem' }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* State navigation */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentState((s) => s - 1)}
                disabled={currentState === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              {/* Progress dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentState(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentState ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to state ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentState((s) => s + 1)}
                disabled={currentState === 2}
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                style={{ background: currentState < 2 ? 'var(--gradient-hero)' : undefined }}
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <p className="text-center text-muted-foreground text-sm max-w-lg">
              {stateInfo[currentState].prompt}
            </p>
          </div>
        </div>
      </section>

      <HowItWorks />
      <VideoSection />

      {/* What does GEODHA aim to do? */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              What does GEODHA{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                aim to do?
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Engage communities to submit reports of problems they are facing, create maps of the reports to raise awareness on big problems, and facilitate data analytics towards solving these challenges.
              </p>

              <div className="bg-gradient-subtle p-6 rounded-xl border">
                <div className="flex items-start space-x-3">
                  <Target className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Pilot Program Launch</p>
                    <p className="text-muted-foreground">
                      As a pilot program GEODHA will first be launched in <strong>Bengaluru, India.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Raising Awareness</h3>
                      <p className="text-muted-foreground">
                        Create visibility for vulnerable communities and issues often unnoticed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Data for Solutions</h3>
                      <p className="text-muted-foreground">
                        Create datasets for researchers, policy makers, and governments to craft comprehensive solutions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Community Empowerment</h3>
                      <p className="text-muted-foreground">
                        Enable citizens to track progress, understand patterns, and drive meaningful change
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              How can you help?
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed">
                <strong>Spread the word!</strong> We are developing an app for everyone to submit reports of community challenges and view statistics for their community on waste management issues such as open dumps and littering. In the future we aim to track other civic issues like delayed construction, broken footpaths, dirty water, electricity blackouts, air quality, and more.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border shadow-soft">
              <h3 className="text-2xl font-bold mb-6 text-center">Potential Applications &amp; Impact</h3>
              <ul className="space-y-4">
                {[
                  "Raising awareness about communities prone to challenges",
                  "Understanding causes and types of waste across different areas",
                  "Tracking progress, frequency and movement - identifying critical bottlenecks",
                  "Consumer perspectives and crowdsourced datasets on civic issues for better planning and management"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Join Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're looking for passionate individuals to help realize this mission!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">We're looking for:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li><strong>App Developers</strong> - Help build our platform</li>
                    <li><strong>Content Creators</strong> - Share our story</li>
                    <li><strong>City Representatives</strong> - Help us scale</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-6">Contact Us</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href="mailto:contact@geodha.org">
                        <Mail className="h-4 w-4 mr-2" />
                        contact@geodha.org
                      </a>
                    </Button>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://www.linkedin.com/company/geodha" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://www.instagram.com/geodha_org" target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="https://www.reddit.com/r/geodha" target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-6">
                Follow us on social media for updates and join the discussion about civic engagement!
              </p>
              <div className="bg-gradient-primary/10 p-8 rounded-xl border">
                <p className="text-lg mb-4">
                  <strong>Want to bring GEODHA to your city or contribute to our mission?</strong>
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="https://forms.gle/K3GGQdBe5k2uH44f7" target="_blank" rel="noopener noreferrer">
                    Express Your Interest
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
