import { Link, useNavigate } from 'react-router-dom';
import { Flame, Bug, Truck, Wind, BarChart2, Database, FileText, Smartphone, CheckCircle, MapPin, Camera, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import screenshot1 from '@/assets/screenshot1.png';
import screenshot2 from '@/assets/screenshot2.png';
import screenshot4 from '@/assets/screenshot4.png';
import ScrollingBanner from '@/components/ScrollingBanner';

// Problem empathy cards — icon-forward, light card style (like Features.tsx)
const problemCards = [
  {
    icon: Truck,
    color: 'text-primary',
    title: 'Garbage truck not arriving',
    description: 'Truck skips your street for days. Waste overflows.',
  },
  {
    icon: Bug,
    color: 'text-accent',
    title: 'Mosquito breeding near your home',
    description: 'Stagnant waste water turns into breeding grounds.',
  },
  {
    icon: Flame,
    color: 'text-warning',
    title: 'Open burning and smoke',
    description: 'Illegal burning chokes neighbourhoods. Children and elderly most at risk.',
  },
  {
    icon: Wind,
    color: 'text-primary',
    title: 'Foul smell from an illegal dump',
    description: 'Persistent stench from an unauthorised dumping site.',
  },
];

// Services section
const services = [
  {
    icon: Smartphone,
    title: 'Reporting App',
    description: 'Powerful tools to submit reports and arrange for cleanups in less than 30 seconds.',
    href: '/report',
    cta: 'Launching soon',
    launchingSoon: true,
  },
  {
    icon: BarChart2,
    title: 'Civic Dashboard',
    description: 'Ward-level heatmaps and report cards for Bengaluru wards.',
    href: '/dashboard',
    cta: 'View the dashboard →',
    launchingSoon: false,
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    description: 'Open burning cross-referenced with vulnerable communities.',
    href: '/data',
    cta: 'Explore the data →',
    launchingSoon: false,
  },
  {
    icon: FileText,
    title: 'Blog & Guides',
    description: "Disposal guides, what to do when the truck doesn't come, and more.",
    href: '/blog',
    cta: 'Read the blog →',
    launchingSoon: false,
  },
];

// Reporting App feature list
const appFeatures = [
  { icon: Camera, text: 'Photo-based reporting with AI categorisation' },
  { icon: MapPin, text: 'GPS auto-tagging for precise ward-level data' },
  { icon: CheckCircle, text: 'Track status from report to resolution' },
  { icon: Shield, text: 'Anonymous reporting option for sensitive issues' },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO — gradient-subtle bg + grid pattern, two-column layout ── */}
      <section className="relative overflow-hidden bg-gradient-subtle">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.04) 39px, rgba(0,0,0,0.04) 40px)',
          }}
        />

        <div className="relative container px-4 py-8 sm:py-10 lg:py-14 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

            {/* Left: text */}
            <div className="space-y-6">
              <p className="flex items-center gap-1.5 text-primary font-semibold text-sm uppercase tracking-widest">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                Bengaluru
              </p>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                See garbage around you?
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Solve it with GEODHA.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Real data on what's being reported, what's getting fixed, and what's being ignored.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  View the Dashboard →
                </button>
              </div>
            </div>

            {/* Right: hero image + "Status Update" floating badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl" />
              <img
                src={heroImage}
                alt="Citizens reporting civic issues"
                className="relative rounded-2xl shadow-glow object-cover w-full h-[280px] sm:h-[380px] lg:h-[420px]"
              />
              {/* "Status Update: Cleaned & Verified" floating tile */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-card p-4 rounded-xl shadow-soft border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Status Update</div>
                    <div className="font-semibold text-foreground text-sm">Cleaned &amp; Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING BANNER ── */}
      <ScrollingBanner />

      {/* ── PROBLEM EMPATHY — light shadow cards with colored icons (Features.tsx style) ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Are you facing any of these?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              These are the most common solid waste problems reported by Bengaluru residents. If you're experiencing one, you're not alone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="bg-card border-0 shadow-soft hover:shadow-glow transition-all duration-300 rounded-xl p-6 group"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Single CTA */}
          <div className="flex justify-center">
            <Link
              to="/report"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-block px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm text-center"
            >
              Tell us more about the problem you are facing and learn more about the solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 sm:py-20 bg-muted/40 border-t border-border">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground max-w-xl">
              GEODHA connects citizen evidence to institutional accountability — from street-level reporting to ward-level data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((svc) => (
              <Link
                key={svc.title}
                to={svc.href}
                className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all duration-200"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="mb-4 p-2.5 w-fit rounded-lg bg-secondary">
                  <svc.icon className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem' }}
                >
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {svc.description}
                </p>
                {svc.launchingSoon ? (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
                    Launching soon
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-primary group-hover:underline">
                    {svc.cta}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPORTING APP COMING SOON ── */}
      <section className="py-16 sm:py-20 bg-gradient-subtle border-t border-border">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: copy */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Launching Soon
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                The GEODHA Reporting App
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  is on its way.
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                Submit reports, arrange cleanups, and track resolution — all in under 30 seconds. Built for Bengaluru's wards, designed for every resident.
              </p>
              <div className="space-y-3">
                {appFeatures.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3 phone screenshots, staggered heights */}
            <div className="flex justify-center items-end gap-3">
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft opacity-80 w-[28%] max-w-[120px] h-[220px] sm:h-[280px]">
                <img src={screenshot4} alt="App list view" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border shadow-glow w-[34%] max-w-[148px] h-[280px] sm:h-[340px] -mb-4">
                <img src={screenshot1} alt="App map view" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft opacity-80 w-[28%] max-w-[120px] h-[220px] sm:h-[280px]">
                <img src={screenshot2} alt="App report view" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-16 sm:py-20 bg-background border-t border-border">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Bengaluru's waste problem is visible. So is the data.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Your report adds to the map. The map builds the case. The case drives action.
            Be part of the most detailed ward-level waste record Bengaluru has ever had.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0); }}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm"
            >
              View the Dashboard
            </button>
            <a
              href="https://drive.google.com/file/d/1mAYuQQaYTORPAEiC3b8xcQ3jHLebaxVY/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border text-foreground font-semibold rounded-md hover:bg-muted transition-colors text-sm"
            >
              Read the Beta Report →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
