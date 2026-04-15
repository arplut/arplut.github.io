import { Link, useNavigate } from 'react-router-dom';
import { Flame, Bug, Truck, Wind, BarChart2, Database, FileText, Smartphone, CheckCircle, MapPin, Camera, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import screenshot1 from '@/assets/screenshot1.png';
import screenshot2 from '@/assets/screenshot2.png';
import screenshot4 from '@/assets/screenshot4.png';
import ScrollingBanner from '@/components/ScrollingBanner';

// Problem empathy cards — per-card colored icon boxes (matching UI_REFERENCE feature card style)
const problemCards = [
  {
    icon: Truck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Garbage truck not arriving',
    description: 'Truck skips your street for days. Waste overflows.',
  },
  {
    icon: Bug,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Mosquito breeding near your home',
    description: 'Stagnant waste water turns into breeding grounds.',
  },
  {
    icon: Flame,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Open burning and smoke',
    description: 'Illegal burning chokes neighbourhoods. Children and elderly most at risk.',
  },
  {
    icon: Wind,
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-600',
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
                className="group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`h-6 w-6 ${card.iconColor}`} />
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

      {/* ── REPORTING APP COMING SOON — dark section matching UI_REFERENCE ── */}
      <section className="py-16 sm:py-20 bg-slate-900 relative overflow-hidden">
        {/* Subtle green tint on right */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />

        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: copy */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold border border-primary/30">
                Coming Soon
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Reporting App
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                We are currently developing the mobile app to make reporting even easier. Pre-register your interest to get early access.
              </p>
              <div className="space-y-3">
                {appFeatures.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
              {/* Email interest form */}
              <form
                className="flex flex-col sm:flex-row gap-3 max-w-md"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 font-bold rounded-xl text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  Notify Me
                </button>
              </form>
            </div>

            {/* Right: 3 phone screenshots, staggered heights */}
            <div className="flex justify-center items-end gap-3">
              <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-soft opacity-70 w-[28%] max-w-[120px] h-[220px] sm:h-[280px]">
                <img src={screenshot4} alt="App list view" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-600 shadow-glow w-[34%] max-w-[148px] h-[280px] sm:h-[340px] -mb-4">
                <img src={screenshot1} alt="App map view" className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-700 shadow-soft opacity-70 w-[28%] max-w-[120px] h-[220px] sm:h-[280px]">
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
