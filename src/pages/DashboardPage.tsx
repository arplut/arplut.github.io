import { MapPin, Flame, Trash2, Truck, BarChart2, Mail } from 'lucide-react';

const previewFeatures = [
  { icon: Flame,    label: 'Open burning hotspots by ward' },
  { icon: Trash2,   label: 'Garbage dump density and patterns' },
  { icon: Truck,    label: 'Vehicle coverage gaps and missed streets' },
  { icon: BarChart2,label: 'Ward-level problem scores and comparisons' },
  { icon: MapPin,   label: 'Solutions and escalation paths per neighbourhood' },
];

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

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Coming Soon
            </span>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Learn about top challenges,
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                problem hotspots
              </span>
              {' '}and solutions
              <br />
              for every neighbourhood of Bengaluru.
            </h1>

            {/* Sub-copy */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
              The civic dashboard is being built. It will show you ward-level heatmaps, the top
              issues facing each area, and clear pathways to solutions — all in one place.
            </p>

            {/* Feature preview list */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 text-left max-w-2xl mx-auto">
              {previewFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{label}</span>
                </div>
              ))}
            </div>

            {/* Email CTA */}
            <div className="bg-card border border-border rounded-2xl px-6 py-8 max-w-md mx-auto shadow-soft">
              <p className="text-sm font-semibold text-foreground mb-1">Get notified when it launches</p>
              <p className="text-xs text-muted-foreground mb-4">
                We'll send you one email when the dashboard goes live.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90 shrink-0"
                  style={{ background: 'var(--gradient-hero)' }}
                >
                  Notify Me
                </button>
              </form>
              <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <Mail className="h-3 w-3" />
                Or email us at{' '}
                <a href="mailto:contact@geodha.org" className="text-primary underline underline-offset-2">
                  contact@geodha.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
