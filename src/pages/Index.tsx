import { Link, useNavigate } from 'react-router-dom';
import { Flame, Bug, Truck, Wind, BarChart2, Database, FileText, Smartphone, CheckCircle, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import ScrollingBanner from '@/components/ScrollingBanner';

// Problem empathy cards — no per-card links; single CTA at bottom
const problemCards = [
  {
    icon: Truck,
    title: 'Garbage truck not arriving',
    description: 'Truck skips your street for days. Waste overflows.',
    color: 'border-orange-400/40 hover:border-orange-400',
  },
  {
    icon: Bug,
    title: 'Mosquito breeding near your home',
    description: 'Stagnant waste water turns into breeding grounds.',
    color: 'border-yellow-400/40 hover:border-yellow-400',
  },
  {
    icon: Flame,
    title: 'Open burning and smoke',
    description: 'Illegal burning chokes neighbourhoods. Children and elderly most at risk.',
    color: 'border-red-400/40 hover:border-red-400',
  },
  {
    icon: Wind,
    title: 'Foul smell from an illegal dump',
    description: 'Persistent stench from an unauthorised dumping site.',
    color: 'border-red-600/40 hover:border-red-600',
  },
];

// Services section
const services = [
  {
    icon: Smartphone,
    title: 'Reporting App',
    description: 'Camera-first, AI-assisted reports submitted directly to BBMP Sahaaya.',
    href: '/report',
    cta: 'Report a problem →',
  },
  {
    icon: BarChart2,
    title: 'Civic Dashboard',
    description: 'Ward-level heatmaps and report cards for Bengaluru wards.',
    href: '/dashboard',
    cta: 'View the dashboard →',
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    description: 'Open burning cross-referenced with vulnerable communities.',
    href: '/data',
    cta: 'Explore the data →',
  },
  {
    icon: FileText,
    title: 'Blog & Guides',
    description: "Disposal guides, what to do when the truck doesn't come, and more.",
    href: '/blog',
    cta: 'Read the blog →',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO — light gray + subtle grid pattern, two-column layout ── */}
      <section className="relative overflow-hidden bg-gray-100">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)',
          }}
        />

        <div className="relative container px-4 py-12 sm:py-16 lg:py-24 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

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

              <p className="text-sm text-gray-400 flex items-center gap-1.5 pt-1">
                <span>↓</span>
                <span>Scroll down to learn more</span>
              </p>
            </div>

            {/* Right: hero image + "Issue Reported!" tile */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl" />
              <img
                src={heroImage}
                alt="Citizens reporting civic issues"
                className="relative rounded-2xl shadow-glow object-cover w-full h-[280px] sm:h-[400px] lg:h-[480px]"
              />
              {/* "Issue Reported!" floating tile */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-card p-4 rounded-xl shadow-soft border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-primary rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">Issue Reported!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLLING BANNER ── */}
      <ScrollingBanner />

      {/* ── PROBLEM EMPATHY — light background, coloured card borders ── */}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className={`p-6 rounded-xl border-2 bg-card transition-all duration-200 hover:shadow-md ${card.color}`}
              >
                <div className="mb-4">
                  <card.icon className="h-8 w-8 text-primary" />
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
                <span className="text-xs font-semibold text-primary group-hover:underline">
                  {svc.cta}
                </span>
              </Link>
            ))}
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
            Beta testing complete. Ward-level grievance patterns identified. The dashboard is open to all residents, journalists, and policymakers.
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
