import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Mail, AlertTriangle, BookOpen } from 'lucide-react';

// PLACEHOLDER — data model TBD; replace with Samaajdata dataset link when published
const OPEN_BURNING_WARDS = [
  { ward: 'Swami Vivekananda Nagar', level: 'Extreme',  score: 0.95, color: '#991B1B' },
  { ward: 'Konanakunte',             level: 'Extreme',  score: 0.92, color: '#991B1B' },
  { ward: 'Electronic City',         level: 'High',     score: 0.82, color: '#EF4444' },
  { ward: 'Yelahanka',               level: 'High',     score: 0.72, color: '#EF4444' },
  { ward: 'Bellandur',               level: 'High',     score: 0.70, color: '#EF4444' },
  { ward: 'Hebbal',                  level: 'Medium',   score: 0.62, color: '#FB923C' },
  { ward: 'Whitefield',              level: 'Medium',   score: 0.60, color: '#FB923C' },
  { ward: 'Yeshwanthpur',            level: 'Medium',   score: 0.50, color: '#FB923C' },
  { ward: 'Koramangala',             level: 'Low',      score: 0.35, color: '#FEF08A' },
  { ward: 'Jayanagar',               level: 'Low',      score: 0.30, color: '#FEF08A' },
];

// PLACEHOLDER — replace with real waste value estimates when data model confirmed
const WASTE_VALUE_DATA = [
  { type: 'Open Burning Loss',    value: 85,  fill: '#991B1B' },
  { type: 'Illegal Dump Loss',    value: 62,  fill: '#EF4444' },
  { type: 'Recoverable Recycling',value: 100, fill: '#16A34A' },
];

function SeverityBadge({ level }: { level: string }) {
  const colours: Record<string, string> = {
    Extreme: 'bg-red-900 text-red-100',
    High:    'bg-red-500/20 text-red-700',
    Medium:  'bg-orange-400/20 text-orange-700',
    Low:     'bg-yellow-300/30 text-yellow-800',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colours[level] ?? 'bg-muted text-muted-foreground'}`}>
      {level}
    </span>
  );
}

const DataPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <h1
            className="text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Data &amp; Analysis
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Insight-driven analysis of Bengaluru's solid waste landscape. No raw records — relative patterns only.
          </p>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Analysis based on BBMP grievance data (OpenCity dataset).
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-8 space-y-14">

        {/* ── ANALYSIS 1: Open Burning × Vulnerable Communities ── */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Open Burning × Vulnerable Communities
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Where are people being exposed to open burning smoke? Our analysis cross-references complaint
              patterns with residential areas — with a focus on proximity to schools, elderly-care facilities, and dense housing.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ranked ward list */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Wards by Open Burning Severity — Relative Ranking
                {/* PLACEHOLDER — replace with pre-aggregated per-ward severity data from pipeline */}
              </h3>
              <div className="space-y-2.5">
                {OPEN_BURNING_WARDS.map((w, i) => (
                  <div key={w.ward} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">#{i + 1}</span>
                    <span className="text-sm text-foreground flex-1">{w.ward}</span>
                    <SeverityBadge level={w.level} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Relative rankings only. No complaint counts or percentages shown.
              </p>
            </div>

            {/* Bar chart */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                Severity Distribution — Top 10 Wards
                {/* PLACEHOLDER — replace with actual normalised severity scores from pipeline */}
              </h3>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={OPEN_BURNING_WARDS} layout="vertical" margin={{ left: 130, right: 8, top: 4, bottom: 4 }}>
                    <XAxis type="number" domain={[0, 1]} tick={false} axisLine={false} />
                    <YAxis type="category" dataKey="ward" tick={{ fontSize: 11 }} width={130} />
                    <Tooltip
                      formatter={() => ''}
                      labelFormatter={(label) => label}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload as { ward: string; level: string };
                        return (
                          <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md text-xs">
                            <div className="font-semibold">{d.ward}</div>
                            <div className="text-muted-foreground">Severity: {d.level}</div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                      {OPEN_BURNING_WARDS.map((entry) => (
                        <Cell key={entry.ward} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Pull-quote evidence card */}
          <div className="mt-6 rounded-xl border-l-4 border-[#EF4444] bg-red-50/60 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-[#EF4444] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900 mb-1">
                  Reported: Open burning near a school
                </p>
                <p className="text-sm text-red-800 leading-relaxed italic">
                  "Open burning reported in close proximity to a school in{' '}
                  <strong>Swami Vivekananda Nagar</strong>. Smoke exposure during school hours is an acute health risk for children."
                </p>
                <p className="text-xs text-red-600 mt-2">Illustrative case — based on complaint pattern analysis</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ANALYSIS 2: Waste Value Analysis ── */}
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-[#1B4332]" />
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Waste Value Analysis
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              How much recyclable material is being lost to open burning and illegal dumping in Bengaluru each year?
              Our model estimates the economic and material value of waste lost to non-compliant disposal.
            </p>
          </div>

          {/* PLACEHOLDER — data model TBD */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Estimated Annual Value Loss vs. Recoverable Potential
              </h3>
              <p className="text-xs text-muted-foreground mb-4 italic">
                {/* PLACEHOLDER — data model TBD; figures are illustrative */}
                Illustrative model — data model TBD. Values are relative, not absolute.
              </p>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WASTE_VALUE_DATA} margin={{ left: 8, right: 8, top: 4, bottom: 4 }}>
                    <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload as { type: string };
                        return (
                          <div className="bg-popover border border-border rounded-md px-3 py-2 shadow-md text-xs">
                            <div className="font-semibold">{d.type}</div>
                            <div className="text-muted-foreground">Relative value — exact figures TBD</div>
                          </div>
                        );
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {WASTE_VALUE_DATA.map((entry) => (
                        <Cell key={entry.type} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Key Findings (Preliminary)
                </h3>
                {/* PLACEHOLDER — replace with confirmed data insights when Samaajdata dataset published */}
                <ul className="space-y-3 text-sm text-foreground">
                  <li className="flex gap-2"><span className="text-[#1B4332] font-bold">→</span> Significant recyclable materials (metals, paper, plastics) are being lost to open burning at illegal dump sites.</li>
                  <li className="flex gap-2"><span className="text-[#1B4332] font-bold">→</span> Wards with the highest open-burning severity overlap with areas where BBMP vehicle coverage is lowest.</li>
                  <li className="flex gap-2"><span className="text-[#1B4332] font-bold">→</span> Informal waste pickers in these wards are exposed to the highest health risk from burning fumes.</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  {/* PLACEHOLDER — replace with Samaajdata dataset link when published */}
                  Data model TBD. Full dataset to be published via Samaajdata.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Interested in the raw analysis?</p>
                {/* PLACEHOLDER — replace with Samaajdata dataset link when published */}
                <a
                  href="mailto:contact@geodha.org?subject=Data access request"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#1B4332] text-white text-sm font-semibold hover:bg-[#14532D] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Request Data Access
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Attribution + Download */}
        <section className="py-6 px-6 rounded-xl bg-muted/50 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-foreground font-medium">
              Analysis based on BBMP grievance data (OpenCity dataset).
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All analysis uses pre-aggregated, non-reversible summaries. No raw records are published.
            </p>
          </div>
          {/* PLACEHOLDER — replace with Samaajdata dataset link when published */}
          <a
            href="mailto:contact@geodha.org?subject=Download data request"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-card text-sm font-semibold text-foreground hover:bg-muted transition-colors shrink-0"
          >
            Download Data →
          </a>
        </section>

        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">Want to see problem locations on the map?</p>
          <Link
            to="/dashboard"
            className="inline-block px-5 py-2.5 bg-[#1B4332] text-white text-sm font-semibold rounded-md hover:bg-[#14532D] transition-colors"
            onClick={() => window.scrollTo(0, 0)}
          >
            View Ward Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
