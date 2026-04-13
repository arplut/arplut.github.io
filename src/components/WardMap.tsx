import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import type { Layer, PathOptions } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// TODO: replace with verified ward boundary GeoJSON
import wardBoundaries from '../../data/ward-boundaries.json';
// PLACEHOLDER — replace with pre-aggregated pipeline output when confirmed
import wardHeatmap from '../../data/ward-heatmap.json';

export type HeatmapFilter = 'open_burning' | 'garbage_dump' | 'vehicle_not_arrived';

interface WardFeatureProperties {
  ward_slug: string;
  ward_name: string;
  ward_no: number;
  corporation: string;
}

interface Props {
  activeFilter: HeatmapFilter;
  selectedWard: string | null;
  onWardSelect: (slug: string, name: string, corporation: string) => void;
}

/** 4-stop heatmap colour scale: low → medium → high → extreme */
function severityColor(score: number): string {
  if (score < 0.33) return '#FEF08A';  // low
  if (score < 0.55) return '#FB923C';  // medium
  if (score < 0.78) return '#EF4444';  // high
  return '#991B1B';                    // extreme
}

/** Reset view to Bengaluru city overview */
function ResetView({ trigger }: { trigger: number }) {
  const map = useMap();
  useEffect(() => {
    if (trigger > 0) {
      map.flyTo([12.9716, 77.5946], 11, { duration: 0.8 });
    }
  }, [trigger, map]);
  return null;
}

const WardMap = ({ activeFilter, selectedWard, onWardSelect }: Props) => {
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const resetTriggerRef = useRef(0);

  // Build a lookup: ward_slug → severity score for active filter
  const severityMap = useMemo(() => {
    const map: Record<string, number> = {};
    // PLACEHOLDER — replace with pre-aggregated severity data per ward
    const wards = (wardHeatmap as { wards: Record<string, Record<string, number | string>> }).wards;
    for (const [slug, data] of Object.entries(wards)) {
      const score = data[activeFilter];
      map[slug] = typeof score === 'number' ? score : 0;
    }
    return map;
  }, [activeFilter]);

  const styleFeature = (feature?: GeoJSON.Feature): PathOptions => {
    const props = feature?.properties as WardFeatureProperties | undefined;
    const slug = props?.ward_slug ?? '';
    const score = severityMap[slug] ?? 0;
    const isSelected = slug === selectedWard;
    return {
      fillColor: severityColor(score),
      fillOpacity: isSelected ? 0.9 : 0.65,
      color: isSelected ? '#1B4332' : '#ffffff',
      weight: isSelected ? 2.5 : 0.8,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    const props = feature.properties as WardFeatureProperties;
    const slug = props.ward_slug;
    const score = severityMap[slug] ?? 0;

    const severityLabel =
      score < 0.33 ? 'Low' :
      score < 0.55 ? 'Medium' :
      score < 0.78 ? 'High' : 'Extreme';

    layer.bindTooltip(
      `<div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;">${props.ward_name}</div>
       <div style="font-size:12px;color:#555;">Severity: <strong>${severityLabel}</strong></div>`,
      { sticky: true, opacity: 0.95 }
    );

    layer.on('click', (e) => {
      onWardSelect(slug, props.ward_name, props.corporation);
      // Zoom to ward bounding box
      const leafletLayer = layer as L.Polygon;
      if (leafletLayer.getBounds) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const map = (e as any).target._map as L.Map | undefined;
        map?.flyToBounds(leafletLayer.getBounds(), { padding: [40, 40], duration: 0.6 });
      }
    });
  };

  // Re-style all layers when filter or selection changes
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.setStyle((feature) => styleFeature(feature));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, selectedWard, severityMap]);

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={11}
      minZoom={10}
      maxZoom={16}
      maxBounds={[[12.70, 77.35], [13.18, 77.85]]}
      maxBoundsViscosity={0.9}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.4}
      />

      {/* TODO: replace with verified ward boundary GeoJSON */}
      <GeoJSON
        // @ts-expect-error json import typing
        data={wardBoundaries}
        style={styleFeature}
        onEachFeature={onEachFeature}
        ref={(ref) => { if (ref) geoJsonRef.current = ref; }}
      />

      {/* PLACEHOLDER — future: overlay icon layer for GEODHA app reports (🔥 🗑️ 🚛) */}
      <ResetView trigger={resetTriggerRef.current} />
    </MapContainer>
  );
};

export default WardMap;
