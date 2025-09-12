import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

// Extend Leaflet types for heatmap
declare module 'leaflet' {
  function heatLayer(points: any[], options?: any): any;
}

interface HeatmapPoint {
  lat: number;
  lng: number;
  weight: number;
}

interface CustomHeatmapLayerProps {
  points: HeatmapPoint[];
  radius?: number;
  blur?: number;
  maxZoom?: number;
  gradient?: Record<number, string>;
}

const CustomHeatmapLayer: React.FC<CustomHeatmapLayerProps> = ({
  points,
  radius = 25,
  blur = 15,
  maxZoom = 17,
  gradient = {
    0.1: '#22c55e', // green for low density
    0.5: '#eab308', // yellow for medium density  
    1.0: '#ef4444'  // red for high density
  }
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    console.log('🔥 CustomHeatmapLayer - Creating heatmap with', points.length, 'points');
    console.log('🔥 CustomHeatmapLayer - Points data:', points);

    // Convert points to leaflet.heat format: [lat, lng, weight]
    const heatmapPoints = points.map(point => [
      point.lat,
      point.lng,
      point.weight || 1
    ]);

    console.log('🔥 CustomHeatmapLayer - Converted points:', heatmapPoints);

    // Create heatmap layer
    const heatLayer = (L as any).heatLayer(heatmapPoints, {
      radius,
      blur,
      maxZoom,
      gradient
    });

    // Add to map
    map.addLayer(heatLayer);

    console.log('🔥 CustomHeatmapLayer - Heatmap layer added to map');

    // Cleanup function
    return () => {
      console.log('🔥 CustomHeatmapLayer - Removing heatmap layer');
      map.removeLayer(heatLayer);
    };
  }, [map, points, radius, blur, maxZoom, gradient]);

  return null;
};

export default CustomHeatmapLayer;
