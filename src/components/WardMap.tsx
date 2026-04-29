import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from 'react-leaflet';
import type { Layer, PathOptions } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import wardBoundaries from '../../data/ward-boundaries.json';
import { computeScale, BAND } from '@/lib/severity';
import type { BandLevel } from '@/lib/severity';

// WardData type lives in the service layer — re-export for legacy consumers
export type { WardData } from '@/services/geodhaService';
import type { WardData } from '@/services/geodhaService';

// ── Testimonial marker type (exported for DashboardPage) ─────────────────────

export interface TestimonialMarkerInfo {
  id:        string;
  wardNum:   number;
  latlng:    [number, number];
  /** true = documented case at exact GPS; false = ward-centre fallback */
  isExact:   boolean;
  /** true = at least one testimonial for this ward/pin has uploaded images */
  hasImages: boolean;
}

// ── Internal types ────────────────────────────────────────────────────────────

interface WardFeatureProperties {
  ward_num:  number;
  ward_name: string;
  zone:      string;
}

interface DocMarker {
  wardNum:   number;
  latlng:    [number, number];
  icons:     string;
}

interface Props {
  wardDataMap:         Record<number, WardData>;
  selectedWard:        number | null;
  onWardSelect:        (wardNum: number, data: WardData, zone: string) => void;
  zoomToWard?:         number | null;
  testimonialMarkers?: TestimonialMarkerInfo[];
}

// ── Icon HTML ─────────────────────────────────────────────────────────────────

const GARBAGE_MOUND_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='18' height='16' viewBox='0 0 18 16' style='display:inline-block;vertical-align:middle;margin-top:-2px;'><ellipse cx='9' cy='14.5' rx='8.5' ry='1.5' fill='#57534e'/><path d='M1.5 14.5 C2 9.5 5 7 9 6.5 C13 7 16 9.5 16.5 14.5 Z' fill='#78716c'/><line x1='6' y1='9' x2='5' y2='5' stroke='#a8a29e' stroke-width='1.2' stroke-linecap='round'/><line x1='9' y1='7' x2='9' y2='3' stroke='#a8a29e' stroke-width='1.2' stroke-linecap='round'/><line x1='12' y1='9' x2='13' y2='5' stroke='#a8a29e' stroke-width='1.2' stroke-linecap='round'/></svg>`;

/**
 * Inline ! badge appended to the ward cluster icon for wards with a centre
 * testimonial (no exact GPS). Slightly larger when the testimonial has photos,
 * to draw extra attention to documented cases with visual evidence.
 */
function makeTestimonialInlineBadge(hasImages: boolean): string {
  const size     = hasImages ? 23 : 19;
  const fontSize = hasImages ? 13 : 11;
  return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:#dc2626;border:2px dashed rgba(255,255,255,0.9);font-size:${fontSize}px;font-weight:900;color:#fff;font-family:sans-serif;vertical-align:middle;margin-left:1px;">!</span>`;
}

/** Ward problem icon cluster (critical-band categories + optional testimonial badge). */
function makeProblemIcon(icons: string): L.DivIcon {
  return L.divIcon({
    html: `<div style="font-size:17px;line-height:1;white-space:nowrap;transform:translate(-50%,-50%);filter:drop-shadow(0 0 3px rgba(255,255,255,0.95)) drop-shadow(0 1px 4px rgba(0,0,0,0.75));cursor:pointer;user-select:none;pointer-events:auto;">${icons}</div>`,
    className: '',
    iconSize:    [0, 0],
    iconAnchor:  [0, 0],
    popupAnchor: [0, -20],
  });
}

/**
 * Solid dark-red ! pin at exact GPS location — documented case.
 * Rendered larger when the testimonial has photos to signal richer evidence.
 */
function makeTestimonialExactIcon(hasImages: boolean): L.DivIcon {
  const size     = hasImages ? 28 : 22;
  const fontSize = hasImages ? 15 : 13;
  const border   = hasImages ? '2.5px solid rgba(255,255,255,0.95)' : '2px solid rgba(255,255,255,0.9)';
  const shadow   = hasImages ? '0 3px 8px rgba(0,0,0,0.65)' : '0 2px 6px rgba(0,0,0,0.55)';
  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:#991b1b;border:${border};
      box-shadow:${shadow};
      display:flex;align-items:center;justify-content:center;
      font-size:${fontSize}px;font-weight:900;color:#fff;font-family:sans-serif;
      transform:translate(-50%,-50%);cursor:pointer;user-select:none;
    ">!</div>`,
    className: '',
    iconSize:    [0, 0],
    iconAnchor:  [0, 0],
    popupAnchor: [0, -14],
  });
}

// ── ZoomController ────────────────────────────────────────────────────────────

function ZoomController({ wardNum }: { wardNum: number }) {
  const map = useMap();
  useEffect(() => {
    const feat = (wardBoundaries as GeoJSON.FeatureCollection).features.find(
      (f) => (f.properties as WardFeatureProperties).ward_num === wardNum
    );
    if (!feat) return;
    const bounds = featureBounds(feat.geometry);
    if (bounds) map.flyToBounds(bounds, { padding: [50, 50], duration: 0.6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wardNum]);
  return null;
}

// ── Geometry helpers ──────────────────────────────────────────────────────────

function ringCentroid(ring: number[][]): [number, number] {
  let sumLon = 0, sumLat = 0;
  for (const [lon, lat] of ring) { sumLon += lon; sumLat += lat; }
  return [sumLat / ring.length, sumLon / ring.length];
}

function outerRing(geometry: GeoJSON.Geometry): number[][] {
  if (geometry.type === 'Polygon')      return geometry.coordinates[0] as number[][];
  if (geometry.type === 'MultiPolygon') {
    const polys = geometry.coordinates as number[][][][];
    const best  = polys.reduce((a, b) => (a[0].length >= b[0].length ? a : b));
    return best[0] as number[][];
  }
  return [];
}

function featureBounds(geometry: GeoJSON.Geometry): L.LatLngBounds | null {
  let pts: number[][] = [];
  if (geometry.type === 'Polygon')      pts = geometry.coordinates[0] as number[][];
  else if (geometry.type === 'MultiPolygon') {
    for (const poly of geometry.coordinates as number[][][][]) pts = pts.concat(poly[0] as number[][]);
  }
  if (pts.length === 0) return null;
  const lats = pts.map(([, lat]) => lat);
  const lons = pts.map(([lon])   => lon);
  return L.latLngBounds([[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]]);
}

// ── Component ─────────────────────────────────────────────────────────────────

const WardMap = ({ wardDataMap, selectedWard, onWardSelect, zoomToWard, testimonialMarkers = [] }: Props) => {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

  const allWards = useMemo(() => Object.values(wardDataMap), [wardDataMap]);

  // Percentile scales derived from live data
  const classify = useMemo(() => ({
    total: computeScale(allWards.map((w) => w.total_reports)),
    dump:  computeScale(allWards.map((w) => w.garbage_dump)),
    veh:   computeScale(allWards.map((w) => w.garbage_vehicle_not_arrived)),
    burn:  computeScale(allWards.map((w) => w.burning_of_garbage)),
  }), [allWards]);

  // Map of ward numbers with a centre testimonial → whether they have images.
  // Larger ! badges are shown for wards with photographic evidence.
  const centreTestimonialWards = useMemo<Map<number, boolean>>(
    () => {
      const m = new Map<number, boolean>();
      for (const t of testimonialMarkers.filter((mk) => !mk.isExact)) {
        m.set(t.wardNum, t.hasImages);
      }
      return m;
    },
    [testimonialMarkers],
  );

  // Ward cluster markers: critical-band problem icons + testimonial badge.
  // Includes any ward with at least one problem icon OR a non-exact testimonial.
  const docMarkers = useMemo<DocMarker[]>(() => {
    const out: DocMarker[] = [];
    for (const feat of (wardBoundaries as GeoJSON.FeatureCollection).features) {
      const wNum = (feat.properties as WardFeatureProperties).ward_num;
      const w    = wardDataMap[wNum];

      const parts: string[] = [];
      if (w) {
        if (classify.dump(w.garbage_dump)               === 5) parts.push(GARBAGE_MOUND_SVG);
        if (classify.veh(w.garbage_vehicle_not_arrived) === 5) parts.push('🚛');
        if (classify.burn(w.burning_of_garbage)         === 5) parts.push('🔥');
      }
      if (centreTestimonialWards.has(wNum)) {
        parts.push(makeTestimonialInlineBadge(centreTestimonialWards.get(wNum)!));
      }

      if (parts.length === 0) continue;

      const ring = outerRing(feat.geometry);
      if (ring.length === 0) continue;
      out.push({ wardNum: wNum, latlng: ringCentroid(ring), icons: parts.join('') });
    }
    return out;
  }, [wardDataMap, classify, centreTestimonialWards]);

  // GeoJSON styling
  const styleFeature = (feature?: GeoJSON.Feature): PathOptions => {
    const props      = feature?.properties as WardFeatureProperties | undefined;
    const num        = props?.ward_num ?? 0;
    const ward       = wardDataMap[num];
    const band       = (ward ? classify.total(ward.total_reports) : 0) as BandLevel;
    const isSelected = num === selectedWard;
    return {
      fillColor:   BAND[band].mapColor,
      fillOpacity: isSelected ? 0.88 : 0.60,
      color:       isSelected ? '#1a1a1a' : 'rgba(255,255,255,0.7)',
      weight:      isSelected ? 2 : 0.5,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    const props = feature.properties as WardFeatureProperties;
    const num   = props.ward_num;
    const ward  = wardDataMap[num];
    const band  = (ward ? classify.total(ward.total_reports) : 0) as BandLevel;
    const cfg   = BAND[band];

    layer.bindTooltip(
      `<div style="font-family:'Barlow Condensed',sans-serif;">
         <div style="font-size:14px;font-weight:700;">${props.ward_name}</div>
         <span style="background:${cfg.badgeBg};color:${cfg.badgeFg};font-size:11px;font-weight:700;padding:1px 8px;border-radius:999px;">${cfg.label}</span>
       </div>`,
      { sticky: true, opacity: 0.96 },
    );

    layer.on('click', (e) => {
      if (ward) onWardSelect(num, ward, props.zone ?? '');
      const poly = layer as L.Polygon;
      if (poly.getBounds) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const map = (e as any).target._map as L.Map | undefined;
        map?.flyToBounds(poly.getBounds(), { padding: [50, 50], duration: 0.6 });
      }
    });
  };

  // Re-style on selection change
  useEffect(() => {
    geoJsonRef.current?.setStyle((f) => styleFeature(f));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWard]);

  return (
    <MapContainer
      center={[12.97, 77.594]}
      zoom={11}
      minZoom={10}
      maxZoom={16}
      maxBounds={[[12.68, 77.30], [13.20, 77.90]]}
      maxBoundsViscosity={0.9}
      style={{ height: '100%', width: '100%', background: '#fff' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='© <a href="https://carto.com/attributions">CARTO</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        subdomains={['a','b','c','d']}
        opacity={0.55}
      />

      {zoomToWard != null && <ZoomController wardNum={zoomToWard} />}

      {/* Ward choropleth */}
      <GeoJSON
        // @ts-expect-error json import typing
        data={wardBoundaries}
        style={styleFeature}
        onEachFeature={onEachFeature}
        ref={(r) => { if (r) geoJsonRef.current = r; }}
      />

      {/* Ward cluster markers: problem icons + testimonial badge (merged) */}
      {docMarkers.map(({ wardNum, latlng, icons }) => (
        <Marker
          key={`prob-${wardNum}`}
          position={latlng}
          icon={makeProblemIcon(icons)}
          zIndexOffset={800}
          eventHandlers={{
            click: () => {
              const w = wardDataMap[wardNum];
              if (w) {
                const feat = (wardBoundaries as GeoJSON.FeatureCollection).features.find(
                  (f) => (f.properties as WardFeatureProperties).ward_num === wardNum
                );
                const zone = (feat?.properties as WardFeatureProperties | undefined)?.zone ?? '';
                onWardSelect(wardNum, w, zone);
              }
            },
          }}
        />
      ))}

      {/* Exact-location markers — documented cases with GPS coordinates */}
      {testimonialMarkers.filter((m) => m.isExact).map((m) => (
        <Marker
          key={`te-${m.id}`}
          position={m.latlng}
          icon={makeTestimonialExactIcon(m.hasImages)}
          zIndexOffset={950}
          eventHandlers={{
            click: () => {
              const w = wardDataMap[m.wardNum];
              if (w) {
                const feat = (wardBoundaries as GeoJSON.FeatureCollection).features.find(
                  (f) => (f.properties as WardFeatureProperties).ward_num === m.wardNum
                );
                const zone = (feat?.properties as WardFeatureProperties | undefined)?.zone ?? '';
                onWardSelect(m.wardNum, w, zone);
              }
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default WardMap;
