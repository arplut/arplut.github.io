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

            {/* "Coming Soon" headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-8 bg-gradient-primary bg-clip-text text-transparent"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Coming Soon
            </h1>

            {/* Supporting headline */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-snug max-w-3xl mx-auto mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Learn about top challenges, problem hotspots and solutions for every neighbourhood of Bengaluru.
            </h2>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
              The civic dashboard is being built. It will show you ward-level heatmaps, the top issues facing each area, and clear pathways to solutions — all in one place.
            </p>

            {/* CTA card */}
            <div className="bg-card border border-border rounded-2xl px-8 py-8 max-w-lg mx-auto shadow-soft">
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
