import { Link, useNavigate } from 'react-router-dom';
import { Flame, Bug, Truck, Wind, BarChart2, Database, FileText, Smartphone } from 'lucide-react';

// Problem empathy cards
const problemCards = [
  {
    icon: Truck,
    title: 'Garbage truck not arriving',
    description: 'Truck skips your street for days. Waste overflows.',
    href: '/dashboard?filter=vehicle_not_arrived',
    color: 'border-orange-400/40 hover:border-orange-400',
  },
  {
    icon: Bug,
    title: 'Mosquito breeding near your home',
    description: 'Stagnant waste water turns into breeding grounds.',
    href: '/dashboard?filter=garbage_dump',
    color: 'border-yellow-400/40 hover:border-yellow-400',
  },
  {
    icon: Flame,
    title: 'Open burning and smoke',
    description: 'Illegal burning chokes neighbourhoods. Children and elderly most at risk.',
    href: '/dashboard?filter=open_burning',
    color: 'border-red-400/40 hover:border-red-400',
  },
  {
    icon: Wind,
    title: 'Foul smell from an illegal dump',
    description: 'Persistent stench from an unauthorised dumping site.',
    href: '/dashboard?filter=garbage_dump',
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
    description: 'Ward-level heatmaps and report cards for all 198 Bengaluru wards.',
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
    description: 'Disposal guides, what to do when the truck doesn\'t come, and more.',
    href: '/blog',
    cta: 'Read the blog →',
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#1B4332]">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, white 39px, white 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, white 39px, white 40px)',
          }}
        />
        <div className="relative container px-4 py-16 sm:py-20 lg:py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#F59E0B] font-semibold text-sm uppercase tracking-widest mb-4">
              Bengaluru · 198 wards
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              See garbage around you?
              <br />
              <span className="text-[#F59E0B]">Solve it with GEODHA.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">
              198 wards. Real data on what's being reported, what's getting fixed,
              and what's being ignored.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0); }}
                className="px-6 py-3 bg-white text-[#1B4332] font-semibold rounded-md hover:bg-white/90 transition-colors text-sm"
              >
                View the Dashboard →
              </button>
              <button
                onClick={() => { navigate('/report'); window.scrollTo(0, 0); }}
                className="px-6 py-3 bg-[#F59E0B] text-black font-semibold rounded-md hover:bg-[#D97706] transition-colors text-sm"
              >
                Report a Problem →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM EMPATHY ── */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Are you facing any of these?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              These are the most common solid waste problems reported by Bengaluru residents. If you're experiencing one, you're not alone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {problemCards.map((card) => (
              <Link
                key={card.title}
                to={card.href}
                className={`group block p-6 rounded-xl border-2 bg-card transition-all duration-200 hover:shadow-md ${card.color}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="mb-4">
                  <card.icon className="h-8 w-8 text-[#1B4332]" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.1rem' }}>
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-4 text-xs font-semibold text-[#1B4332] group-hover:underline">
                  See which wards →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 sm:py-20 bg-muted/40 border-t border-border">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
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
                className="group block p-6 rounded-xl bg-card border border-border hover:border-[#1B4332]/40 hover:shadow-soft transition-all duration-200"
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="mb-4 p-2.5 w-fit rounded-lg bg-[#1B4332]/8">
                  <svc.icon className="h-6 w-6 text-[#1B4332]" />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.15rem' }}>
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {svc.description}
                </p>
                <span className="text-xs font-semibold text-[#1B4332] group-hover:underline">
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
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Bengaluru's waste problem is visible. So is the data.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Beta testing complete. Ward-level grievance patterns identified. The dashboard is open to all residents, journalists, and policymakers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0); }}
              className="px-6 py-3 bg-[#1B4332] text-white font-semibold rounded-md hover:bg-[#14532D] transition-colors text-sm"
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
