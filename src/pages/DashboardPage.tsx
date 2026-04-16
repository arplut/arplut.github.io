import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── COMING SOON GATE ── */}
      <section className="flex-1 flex items-center justify-center py-16 sm:py-24 bg-gradient-subtle relative overflow-hidden">

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,0,0,0.03) 39px,rgba(0,0,0,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,0,0,0.03) 39px,rgba(0,0,0,0.03) 40px)',
          }}
        />

        <div className="relative container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">

            {/* Pulsing dot + label */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">In Development</span>
            </div>

            {/* Large "Coming Soon" headline */}
            <h1
              className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-none mb-8 bg-gradient-primary bg-clip-text text-transparent"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Coming Soon
            </h1>

            {/* Supporting tagline */}
            <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed max-w-2xl mx-auto mb-12">
              Learn about top challenges, problem hotspots and solutions for every neighbourhood of Bengaluru.
            </p>

            {/* CTA card */}
            <div className="bg-card border border-border rounded-2xl px-8 py-8 max-w-lg mx-auto shadow-soft">
              <p className="text-foreground font-semibold text-lg mb-2">Help us build it</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                In the meantime, learn how to address garbage problems or tell us about a challenge you are facing in your community.
              </p>
              <Link
                to="/report"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: 'var(--gradient-hero)' }}
              >
                Report a Problem
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
