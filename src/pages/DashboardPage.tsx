import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Camera, AlertTriangle, ArrowRight, Search, Loader2, AlertCircle } from 'lucide-react';

import WardMap from '@/components/WardMap';
import MapErrorBoundary from '@/components/MapErrorBoundary';
import type { TestimonialMarkerInfo } from '@/components/WardMap';

// ── Static geographic data (boundaries never change — safe as static import) ──
import wardBoundaries from '../../data/ward-boundaries.json';

// ── Firebase hooks ────────────────────────────────────────────────────────────
import { useWardStats }            from '@/hooks/useWardStats';
import { useRecommendedActionsDB } from '@/hooks/useRecommendedActionsDB';
import { useTestimonialsDB }       from '@/hooks/useTestimonialsDB';

// ── Shared types ──────────────────────────────────────────────────────────────
import type { WardData, RecommendedActionDoc, ProblemCategory, TestimonialDoc } from '@/services/geodhaService';

// ── Severity scale ────────────────────────────────────────────────────────────
import { computeScale, BAND } from '@/lib/severity';
import type { BandLevel, ClassifyFn } from '@/lib/severity';

// ── Zone + centroid lookup from static GeoJSON boundaries ────────────────────

interface BoundaryProps { ward_num: number; ward_name: string; zone: string; }
type BoundaryFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, BoundaryProps>;

function outerRingFromGeometry(geom: GeoJSON.Geometry): number[][] {
  if (geom.type === 'MultiPolygon') {
    const polys = (geom as GeoJSON.MultiPolygon).coordinates as number[][][][];
    const best  = polys.reduce((a, b) => (a[0].length >= b[0].length ? a : b));
    return best[0] as number[][];
  }
  return (geom as GeoJSON.Polygon).coordinates[0] as number[][];
}

const { ZONE_LOOKUP, WARD_CENTROIDS } = (() => {
  const zones:     Record<number, string>           = {};
  const centroids: Record<number, [number, number]> = {};
  for (const f of (wardBoundaries as GeoJSON.FeatureCollection).features as BoundaryFeature[]) {
    const num  = f.properties.ward_num;
    zones[num] = f.properties.zone ?? '';
    const ring = outerRingFromGeometry(f.geometry);
    let sumLon = 0, sumLat = 0;
    for (const [lon, lat] of ring) { sumLon += lon; sumLat += lat; }
    centroids[num] = [sumLat / ring.length, sumLon / ring.length];
  }
  return { ZONE_LOOKUP: zones, WARD_CENTROIDS: centroids };
})();

// ── Scale hook (depends on live Firebase ward data) ───────────────────────────

function useScales(wardDataMap: Record<number, WardData>) {
  return useMemo(() => {
    const wards = Object.values(wardDataMap);
    if (wards.length === 0) return null;
    return {
      dump:  computeScale(wards.map((w) => w.garbage_dump)),
      veh:   computeScale(wards.map((w) => w.garbage_vehicle_not_arrived)),
      burn:  computeScale(wards.map((w) => w.burning_of_garbage)),
      total: computeScale(wards.map((w) => w.total_reports)),
    };
  }, [wardDataMap]);
}

// ── Sub-components ────────────────────────────────────────────────────────────

function GarbageMoundIcon({ size = 20 }: { size?: number }) {
  const h = Math.round(size * 0.88);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={h} viewBox="0 0 18 16" aria-hidden="true">
      <ellipse cx="9" cy="14.5" rx="8.5" ry="1.5" fill="#57534e" />
      <path d="M1.5 14.5 C2 9.5 5 7 9 6.5 C13 7 16 9.5 16.5 14.5 Z" fill="#78716c" />
      <line x1="6"  y1="9" x2="5"  y2="5" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="9"  y1="7" x2="9"  y2="3" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="9" x2="13" y2="5" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ProblemIcon({ category, size }: { category: ProblemCategory; size?: number }) {
  if (category === 'garbage_dump') return <GarbageMoundIcon size={size ?? 22} />;
  const emoji = category === 'burning_of_garbage' ? '🔥' : '🚛';
  return <span style={{ fontSize: size ? `${size}px` : '1.375rem', lineHeight: 1 }}>{emoji}</span>;
}

function BandBadge({ band, size = 'sm' }: { band: BandLevel; size?: 'sm' | 'lg' }) {
  const cfg = BAND[band];
  return (
    <span
      className={`inline-block font-bold rounded-full ${size === 'lg' ? 'text-sm px-3 py-1' : 'text-[11px] px-2 py-0.5'}`}
      style={{ background: cfg.badgeBg, color: cfg.badgeFg }}
    >
      {cfg.label}
    </span>
  );
}

// ── Ward search ───────────────────────────────────────────────────────────────

function WardSearch({
  wardDataMap,
  onSelect,
}: {
  wardDataMap: Record<number, WardData>;
  onSelect: (wardNum: number, data: WardData, zone: string) => void;
}) {
  const [query,         setQuery]         = useState('');
  const [open,          setOpen]          = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => Object.values(wardDataMap).sort((a, b) => a.ward_name.localeCompare(b.ward_name)),
    [wardDataMap],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q.length === 0 ? sorted : sorted.filter((w) => w.ward_name.toLowerCase().includes(q));
  }, [query, sorted]);

  const reposition = () => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    setDropdownStyle({ position: 'fixed', top: r.bottom + 4, left: r.left, width: r.width });
  };

  const handleOpen = () => { reposition(); setOpen(true); };

  const choose = (w: WardData) => {
    setQuery(w.ward_name);
    setOpen(false);
    onSelect(w.ward_num, w, ZONE_LOOKUP[w.ward_num] ?? '');
  };

  return (
    <div ref={wrapperRef} className="mt-2">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          placeholder="Search ward by name…"
          onChange={(e) => { setQuery(e.target.value); handleOpen(); }}
          onFocus={handleOpen}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white shadow-sm
                     focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-700 placeholder-gray-400"
        />
      </div>
      {open && filtered.length > 0 && createPortal(
        <div
          style={{ ...dropdownStyle, zIndex: 99999 }}
          className="bg-white border border-gray-200 rounded-lg shadow-xl max-h-52 overflow-y-auto"
        >
          {filtered.slice(0, 25).map((w) => (
            <button
              key={w.ward_num}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
              onMouseDown={() => choose(w)}
            >
              <span>{w.ward_name}</span>
              <span className="text-[10px] text-gray-400 ml-2">#{w.ward_num}</span>
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  );
}

// ── Ward detail bottom sheet ──────────────────────────────────────────────────

interface WardSheetProps {
  data:           WardData;
  zone:           string;
  scales:         { dump: ClassifyFn; veh: ClassifyFn; burn: ClassifyFn; total: ClassifyFn };
  actions:        Record<ProblemCategory, RecommendedActionDoc> | null;
  allTestimonials: TestimonialDoc[];
  onClose:        () => void;
}

function WardSheet({ data, zone, scales, actions, allTestimonials, onClose }: WardSheetProps) {
  const overallBand  = scales.total(data.total_reports) as BandLevel;
  const testimonials = allTestimonials.filter((t) => t.ward_num === data.ward_num);

  const problems: { category: ProblemCategory; label: string; band: BandLevel; count: number }[] = [
    { category: 'garbage_dump',               label: 'Garbage Dumps',      band: scales.dump(data.garbage_dump)                as BandLevel, count: data.garbage_dump },
    { category: 'garbage_vehicle_not_arrived', label: 'Missed Collections', band: scales.veh(data.garbage_vehicle_not_arrived) as BandLevel, count: data.garbage_vehicle_not_arrived },
    { category: 'burning_of_garbage',         label: 'Open Burning',       band: scales.burn(data.burning_of_garbage)          as BandLevel, count: data.burning_of_garbage },
  ].sort((a, b) => b.band !== a.band ? b.band - a.band : b.count - a.count);

  const top      = problems[0];
  const others   = problems.slice(1).filter((p) => p.band >= 2);
  const allClean = problems.every((p) => p.band <= 1);
  const action   = actions?.[top.category] ?? null;

  return (
    <div className="flex flex-col">
      <div className="flex justify-center pt-2.5 pb-1">
        <div className="w-9 h-1 rounded-full bg-gray-300" />
      </div>

      <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            {data.ward_name}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Ward {data.ward_num}{zone ? ` · ${zone}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-3 mt-0.5">
          <BandBadge band={overallBand} size="sm" />
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(82vh - 100px)', paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}>

        {/* Problems */}
        <div className="px-5 pt-4 pb-3">
          {allClean ? (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3.5">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-sm font-semibold text-green-800">Low reported issues</p>
                <p className="text-xs text-green-700 mt-0.5">This ward has minimal complaints across all waste categories.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl border-2 p-4" style={{ borderColor: BAND[top.band].dot, background: BAND[top.band].cardBg }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="leading-none flex items-center"><ProblemIcon category={top.category} size={24} /></span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">#1 Problem</p>
                      <p className="text-base font-bold text-gray-900 leading-tight">{top.label}</p>
                    </div>
                  </div>
                  <BandBadge band={top.band} size="lg" />
                </div>
                {top.band >= 4 && (
                  <p className="text-xs text-gray-600 mt-1 flex items-start gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: BAND[top.band].dot }} />
                    Among the highest affected wards in the city for this issue.
                  </p>
                )}
              </div>

              {others.map((p, i) => (
                <div key={p.category} className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="leading-none opacity-80 flex items-center"><ProblemIcon category={p.category} size={18} /></span>
                    <span className="font-medium">
                      <span className="text-[10px] text-gray-400 font-semibold mr-1">#{i + 2}</span>
                      {p.label}
                    </span>
                  </div>
                  <BandBadge band={p.band} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-5 border-t border-gray-100" />

        {/* Photos */}
        {testimonials.some((c) => c.images.length > 0) ? (
          <section className="px-5 pt-4 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Photos</h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {testimonials.flatMap((c) => c.images).map((src, i) => (
                <img key={i} src={src} alt="" className="h-28 w-28 flex-shrink-0 rounded-lg object-cover border border-gray-200" />
              ))}
            </div>
          </section>
        ) : (
          <section className="px-5 pt-4 pb-2">
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2.5 border border-dashed border-gray-200">
              <Camera className="h-3.5 w-3.5" />
              Photos will appear here when available for this ward.
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <>
            <div className="mx-5 mt-3 border-t border-gray-100" />
            <section className="px-5 pt-4 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Citizen Testimonials &amp; Insights</h3>
              <div className="space-y-3">
                {testimonials.map((c) => (
                  <div key={c.id} className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
                    <p className="text-xs font-bold text-gray-800 leading-snug">{c.title}</p>
                    <blockquote className="text-xs italic text-gray-600 leading-relaxed border-l-2 border-amber-400 pl-2.5">
                      "{c.quote}"
                    </blockquote>
                    <p className="text-[10px] text-gray-400">{c.source}{c.locality ? ` · ${c.locality}` : ''}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Recommended Action */}
        {!allClean && action && (
          <>
            <div className="mx-5 mt-3 border-t border-gray-100" />
            <section className="px-5 pt-4 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Recommended Action</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 flex items-start gap-2 border-b border-gray-100">
                  <span className="leading-none mt-0.5 flex items-center"><ProblemIcon category={top.category} size={20} /></span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{action.label}</p>
                    <p className="text-xs mt-0.5 leading-relaxed text-gray-500">{action.violation}</p>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {action.steps.map((s, i) => (
                    <div key={i} className="flex gap-3 px-4 py-3">
                      <span className="text-base leading-none mt-0.5 shrink-0">{s.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{s.heading}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <div className="px-5 pt-4 pb-6">
          <Link
            to="/report"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 shadow-sm hover:shadow transition-shadow"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">Need more guidance?</p>
              <p className="text-xs text-gray-500 mt-0.5">Want to add a report or tell us about an issue in your area?</p>
            </div>
            <div className="shrink-0 ml-3 h-8 w-8 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-hero)' }}>
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Map legend ────────────────────────────────────────────────────────────────

function MapLegend() {
  const bands: BandLevel[] = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-0.5 flex-wrap text-[10px] text-gray-500">
      {bands.map((b) => (
        <span key={b} className="flex items-center gap-1 mr-2">
          <span className="inline-block h-2.5 w-4 rounded-sm border border-black/8" style={{ background: BAND[b].mapColor }} />
          {BAND[b].label}
        </span>
      ))}
      <span className="flex items-center gap-1 mr-2 ml-1 pl-2 border-l border-gray-200">
        <GarbageMoundIcon size={14} /><span>🚛🔥</span><span>Top-affected</span>
      </span>
      <span className="flex items-center gap-1 ml-1 pl-2 border-l border-gray-200">
        <span className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-red-600 text-white text-[8px] font-bold">!</span>
        <span>Documented cases</span>
      </span>
    </div>
  );
}

// ── City stats strip ──────────────────────────────────────────────────────────

function StatsStrip({
  wardDataMap,
  totalClassify,
}: {
  wardDataMap:   Record<number, WardData>;
  totalClassify: ClassifyFn;
}) {
  const counts = useMemo(() => {
    const c: Partial<Record<BandLevel, number>> = {};
    for (const w of Object.values(wardDataMap)) {
      const b = totalClassify(w.total_reports) as BandLevel;
      c[b] = (c[b] ?? 0) + 1;
    }
    return c;
  }, [wardDataMap, totalClassify]);

  const pairs: [BandLevel, string][] = [[5,'Critical'],[4,'Severe'],[3,'High'],[2,'Moderate'],[1,'Clean']];

  return (
    <div className="flex items-center gap-x-4 gap-y-1 flex-wrap px-4 sm:px-6 py-2.5 bg-gray-50 border-b border-gray-100 text-xs text-gray-600">
      <span className="text-gray-400 font-medium">{Object.keys(wardDataMap).length} wards ·</span>
      {pairs.map(([b, lbl]) => (
        <span key={b} className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full inline-block" style={{ background: BAND[b].dot }} />
          <strong style={{ color: BAND[b].dot }}>{counts[b] ?? 0}</strong>
          <span>{lbl}</span>
        </span>
      ))}
      <span className="ml-auto text-gray-400 hidden sm:inline">Past year grievance data</span>
    </div>
  );
}

// ── Loading / error screens ───────────────────────────────────────────────────

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
      <Loader2 className="h-7 w-7 text-gray-400 animate-spin" />
      <p className="text-sm text-gray-500">Loading ward data…</p>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3 px-6 text-center">
      <AlertCircle className="h-8 w-8 text-red-400" />
      <p className="text-sm font-semibold text-gray-800">Could not load dashboard data</p>
      <p className="text-xs text-gray-500 max-w-sm">{message}</p>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const DashboardPage = () => {
  // ── Firebase data ─────────────────────────────────────────────────────────
  const { wardDataMap, loading: wardLoading, error: wardError }     = useWardStats();
  const { actions,     loading: actLoading,  error: actError }      = useRecommendedActionsDB();
  const { testimonials }                                             = useTestimonialsDB();

  const scales = useScales(wardDataMap);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [selectedWard, setSelectedWard] = useState<{ num: number; data: WardData; zone: string } | null>(null);
  const [sheetOpen,    setSheetOpen]    = useState(false);
  const [zoomToWard,   setZoomToWard]   = useState<number | null>(null);

  const handleWardSelect = (wardNum: number, data: WardData, zone: string) => {
    setSelectedWard({ num: wardNum, data, zone });
    setSheetOpen(true);
  };

  const handleSearchSelect = (wardNum: number, data: WardData, zone: string) => {
    setSelectedWard({ num: wardNum, data, zone });
    setSheetOpen(true);
    setZoomToWard(wardNum);
  };

  const handleClose = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedWard(null), 320);
  };

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sheetOpen]);

  // ── Testimonial markers for the map ───────────────────────────────────────
  const testimonialMarkers = useMemo<TestimonialMarkerInfo[]>(() => {
    const byWard = new Map<number, TestimonialDoc[]>();
    for (const t of testimonials) {
      if (!byWard.has(t.ward_num)) byWard.set(t.ward_num, []);
      byWard.get(t.ward_num)!.push(t);
    }

    const markers: TestimonialMarkerInfo[] = [];
    for (const [wardNum, wt] of byWard) {
      const exact = wt.filter((t) => t.has_exact_location && t.exact_lat != null && t.exact_lng != null);
      if (exact.length > 0) {
        // Documented cases → pin at exact GPS location
        for (const t of exact) {
          markers.push({ id: t.id, wardNum, latlng: [t.exact_lat!, t.exact_lng!], isExact: true });
        }
      } else {
        // Testimonials only → single marker at ward centre
        const centroid = WARD_CENTROIDS[wardNum];
        if (centroid) {
          markers.push({ id: `centre-${wardNum}`, wardNum, latlng: centroid, isExact: false });
        }
      }
    }
    return markers;
  }, [testimonials]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (wardLoading || actLoading) return <LoadingScreen />;
  if (wardError)                 return <ErrorScreen message={wardError} />;
  if (actError)                  return <ErrorScreen message={actError} />;
  if (!scales)                   return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header + search */}
      <div className="px-4 sm:px-6 pt-5 pb-3 bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Bengaluru · Garbage Crisis Map
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">Select any ward or area to view more details</p>
        <WardSearch wardDataMap={wardDataMap} onSelect={handleSearchSelect} />
      </div>

      {/* Stats strip */}
      <StatsStrip wardDataMap={wardDataMap} totalClassify={scales.total} />

      {/* Map */}
      <div className="flex-1 relative" style={{ minHeight: '60vh' }}>
        <div className="absolute inset-0">
          <MapErrorBoundary>
            <WardMap
              wardDataMap={wardDataMap}
              selectedWard={selectedWard?.num ?? null}
              onWardSelect={handleWardSelect}
              zoomToWard={zoomToWard}
              testimonialMarkers={testimonialMarkers}
            />
          </MapErrorBoundary>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 sm:px-6 py-2.5 border-t border-gray-100 bg-white">
        <MapLegend />
      </div>

      {!sheetOpen && (
        <div className="px-4 sm:px-6 py-3 text-center text-xs text-gray-400 border-t border-gray-50">
          Tap any ward to explore issues and recommended actions
        </div>
      )}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-[1px] z-[1001] transition-opacity duration-300 ${
          sheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-[1002] transition-transform duration-300 ease-out ${
          sheetOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white rounded-t-2xl shadow-2xl mx-auto max-w-2xl">
          {selectedWard && (
            <WardSheet
              data={selectedWard.data}
              zone={selectedWard.zone}
              scales={scales}
              actions={actions}
              allTestimonials={testimonials}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
