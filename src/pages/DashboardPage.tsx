import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trash2, Truck, AlertTriangle, Share2, Copy, ExternalLink } from 'lucide-react';
import type { HeatmapFilter } from '@/components/WardMap';

// PLACEHOLDER — replace with verified ward boundary GeoJSON + live severity data
import wardHeatmap from '../../data/ward-heatmap.json';
import wardCorporationMap from '../../data/ward-corporation-map.json';

// Lazy-load the map to avoid SSR issues with Leaflet
const WardMap = lazy(() => import('@/components/WardMap'));

type WardData = {
  name: string;
  corporation: string;
  open_burning: number;
  garbage_dump: number;
  vehicle_not_arrived: number;
};

const FILTER_OPTIONS: { key: HeatmapFilter; label: string; icon: React.ElementType }[] = [
  { key: 'open_burning',       label: 'Open Burning',       icon: Flame },
  { key: 'garbage_dump',       label: 'Garbage Dump',       icon: Trash2 },
  { key: 'vehicle_not_arrived',label: 'Vehicle Not Arrived',icon: Truck },
];

const HEATMAP_LEGEND = [
  { color: '#FEF08A', label: 'Low' },
  { color: '#FB923C', label: 'Medium' },
  { color: '#EF4444', label: 'High' },
  { color: '#991B1B', label: 'Extreme' },
];

// Hardcoded illustrative callout wards (NOT from live data)
const URGENT_WARDS = [
  { name: 'Konanakunte',     note: 'Recurring open burning complaints near residential areas' },
  { name: 'LBS Nagar',       note: 'Persistent uncollected waste reported by multiple residents' },
];

// PLACEHOLDER — replace with pre-aggregated category list per ward
const TOP_PROBLEMS_PLACEHOLDER = ['Open Burning', 'Uncollected Waste', 'Waterlogging'];

// PLACEHOLDER — solution text matched to top problems
const SOLUTIONS_PLACEHOLDER: Record<string, string> = {
  'Open Burning': 'Report to BBMP Sahaaya (Complaint No. 1533). Document with photos and GPS. Alert your RWA.',
  'Uncollected Waste': 'File a complaint via BBMP Sahaaya app. Track truck schedule at bbmp.gov.in/waste.',
  'Waterlogging': 'Report stagnant water to Bruhat Bengaluru Mahanagara Palike helpline. Mark the spot on the map.',
};

function getCorporationName(corporationId: string): string {
  const corps = (wardCorporationMap as { corporations: { id: string; name: string }[] }).corporations;
  return corps.find((c) => c.id === corporationId)?.name ?? corporationId;
}

function getSeverityLabel(score: number): string {
  if (score < 0.33) return 'Low';
  if (score < 0.55) return 'Medium';
  if (score < 0.78) return 'High';
  return 'Extreme';
}

function getSeverityColor(score: number): string {
  if (score < 0.33) return '#FEF08A';
  if (score < 0.55) return '#FB923C';
  if (score < 0.78) return '#EF4444';
  return '#991B1B';
}

const DashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState<HeatmapFilter>('open_burning');
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [copied, setCopied]             = useState(false);

  const wards = (wardHeatmap as { wards: Record<string, WardData> }).wards;
  const wardData: WardData | null = selectedWard ? (wards[selectedWard] ?? null) : null;

  const handleWardSelect = (slug: string, _name: string, _corporation: string) => {
    setSelectedWard(slug);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/dashboard?ward=${selectedWard}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const overallScore = wardData
    ? (wardData.open_burning + wardData.garbage_dump + wardData.vehicle_not_arrived) / 3
    : 0;

  // Ward images path — check /public/ward-images/[ward-slug]/
  // PLACEHOLDER — wire to actual image files when team uploads them
  const wardImages: string[] = []; // will be populated from /public/ward-images/[selectedWard]/

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="container px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 justify-between">
            <div>
              <h1
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Bengaluru Waste Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                198 wards · Severity heatmap · Based on OpenCity dataset
              </p>
            </div>
            <Link
              to="/report"
              className="text-sm font-semibold text-primary hover:underline shrink-0"
              onClick={() => window.scrollTo(0, 0)}
            >
              + Report a problem in your ward
            </Link>
          </div>
        </div>
      </div>

      {/* Urgent wards callout strip */}
      <div className="bg-red-950/90 border-b border-red-900/50">
        <div className="container px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <div className="flex items-center gap-2 text-red-200">
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#EF4444]" />
              <span className="text-xs font-semibold uppercase tracking-wider">Flagged for urgent attention</span>
            </div>
            {URGENT_WARDS.map((ward) => (
              <div key={ward.name} className="text-xs text-red-300">
                <strong className="text-red-100">{ward.name}</strong>: {ward.note}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── MAP COLUMN ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Filter toggles */}
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border transition-all ${
                    activeFilter === f.key
                      ? 'bg-primary text-white border-primary'
                      : 'bg-card text-foreground border-border hover:border-primary/40'
                  }`}
                >
                  <f.icon className="h-4 w-4" />
                  {f.label}
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="rounded-xl border border-border overflow-hidden" style={{ height: '480px' }}>
              <Suspense fallback={
                <div className="h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                  Loading map…
                </div>
              }>
                <WardMap
                  activeFilter={activeFilter}
                  selectedWard={selectedWard}
                  onWardSelect={handleWardSelect}
                />
              </Suspense>
            </div>

            {/* Colour legend */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-muted-foreground font-medium">Severity:</span>
              {HEATMAP_LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="h-3 w-5 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              ))}
              <span className="text-xs text-muted-foreground ml-auto italic">
                {/* No counts or percentages shown — heatmap severity only */}
                Click a ward for details
              </span>
            </div>

            {/* PLACEHOLDER — future: overlay icon legend for 🔥 🗑️ 🚛 GEODHA app reports */}

            {/* Ward name + corporation below map */}
            {selectedWard && wardData && (
              <div className="flex items-center gap-3 py-3 px-4 rounded-lg bg-muted/50 border border-border">
                <div
                  className="h-5 w-5 rounded-full shrink-0"
                  style={{ backgroundColor: getSeverityColor(overallScore) }}
                />
                <div>
                  <span className="font-semibold text-foreground">{wardData.name}</span>
                  <span className="text-muted-foreground text-sm ml-2">
                    {getCorporationName(wardData.corporation)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedWard(null)}
                  className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear ×
                </button>
              </div>
            )}
          </div>

          {/* ── WARD DETAIL CARDS ── */}
          <div className="flex flex-col gap-4">
            {!selectedWard && (
              <div className="flex-1 flex flex-col items-center justify-center py-16 px-6 rounded-xl border border-dashed border-border text-center text-muted-foreground">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-sm font-medium">Click a ward on the map</p>
                <p className="text-xs mt-1">Ward details, top problems, and the shareable report card will appear here.</p>
              </div>
            )}

            {selectedWard && wardData && (
              <>
                {/* Card 1 — Visual evidence */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Visual Evidence
                  </h3>
                  {/* PLACEHOLDER — wire to /public/ward-images/[ward-slug]/ when team uploads images */}
                  {wardImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {wardImages.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Evidence from ${wardData.name}`}
                          className="w-full h-28 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-28 rounded-lg bg-muted border border-dashed border-border">
                      <p className="text-xs text-muted-foreground text-center px-4">
                        No verified images yet for this ward
                      </p>
                    </div>
                  )}
                </div>

                {/* Card 2 — Top 3 Problems */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Top 3 Problems
                    {/* PLACEHOLDER — replace with pre-aggregated category list per ward */}
                  </h3>
                  <ol className="space-y-2">
                    {TOP_PROBLEMS_PLACEHOLDER.map((problem, i) => (
                      <li key={problem} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-primary w-5 shrink-0">#{i + 1}</span>
                        <span className="text-sm text-foreground">{problem}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Card 3 — Solutions */}
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    What You Can Do
                  </h3>
                  <div className="space-y-3">
                    {TOP_PROBLEMS_PLACEHOLDER.map((problem) => (
                      <div key={problem} className="text-sm">
                        <div className="font-medium text-foreground mb-0.5">{problem}</div>
                        <div className="text-muted-foreground text-xs leading-relaxed">
                          {SOLUTIONS_PLACEHOLDER[problem] ?? 'Contact your local BBMP ward office.'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 4 — Shareable Report Card */}
                <div className="rounded-xl border-2 border-primary/20 bg-card p-5">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <h3
                        className="text-lg font-bold text-foreground"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        {wardData.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {getCorporationName(wardData.corporation)}
                      </p>
                    </div>
                    {/* Severity indicator */}
                    {/* PLACEHOLDER — wire severity data when pipeline confirmed */}
                    <div
                      className="px-2.5 py-1 rounded-md text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: getSeverityColor(overallScore) }}
                    >
                      {getSeverityLabel(overallScore)}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {FILTER_OPTIONS.map((f) => {
                      const score = (wardData as Record<string, number>)[f.key] ?? 0;
                      return (
                        <div key={f.key} className="flex items-center gap-2">
                          <f.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground flex-1">{f.label}</span>
                          <div className="flex gap-0.5">
                            {[0.25, 0.5, 0.75, 1].map((threshold) => (
                              <div
                                key={threshold}
                                className="h-2 w-4 rounded-sm"
                                style={{
                                  backgroundColor: score >= threshold
                                    ? getSeverityColor(score)
                                    : '#E5E7EB',
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-medium w-12 text-right">
                            {getSeverityLabel(score)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Ward+report+for+${encodeURIComponent(wardData.name)}+via+@geodha_app&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Share
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 py-8 px-6 rounded-xl bg-primary/5 border border-primary/15 text-center">
          <p className="text-foreground font-medium mb-2">
            See a problem around you? Tell us more about it.
          </p>
          <Link
            to="/report"
            className="inline-block px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            Report a Problem →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
