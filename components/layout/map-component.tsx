'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

// We need to handle leaflet.heat as it doesn't have TypeScript types
declare module 'leaflet' {
  function heatLayer(latlngs: [number, number, number][], options?: any): L.Layer;
}

// Import the heatmap plugin at runtime
if (typeof window !== 'undefined') {
  require('leaflet.heat');
}

interface ReportData {
  latitude: number;
  longitude: number;
  weight?: number;
}

// This component will handle creating the heatmap inside the map context
function HeatmapLayer({ data }: { data: ReportData[] }) {
  const map = useMap();
  const heatLayerRef = useRef<L.Layer | null>(null);
  
  useEffect(() => {
    if (data.length > 0) {
      // Remove existing heatmap layer if it exists
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
      
      // Convert data to the format expected by Leaflet.heat
      const points = data.map(point => [
        point.latitude,
        point.longitude,
        point.weight || 1
      ] as [number, number, number]);
      
      // Create new heatmap layer with more intense settings
      const newHeatmapLayer = L.heatLayer(points, {
        radius: 30,
        blur: 10,
        maxZoom: 17,
        max: 0.8,
        gradient: { 0.2: 'blue', 0.5: 'lime', 0.8: 'yellow', 1: 'red' }, 
        minOpacity: 0.4,
        intensity: 1.5 
      });
      
      // Add the layer to the map
      newHeatmapLayer.addTo(map);
      heatLayerRef.current = newHeatmapLayer;
    }
    
    return () => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, data]);
  
  return null;
}

export function BangaloreMap() {
  const [heatmapData, setHeatmapData] = useState<ReportData[]>([]);
  const bangalore: [number, number] = [12.9716, 77.5946];
  
  useEffect(() => {
    // Reference to the root of your database
    const dataRef = ref(database);
    
    // Listen for changes to the data
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const reports: ReportData[] = [];
      
      if (data) {
        // Process report categories
        const categories = [
          'Electricity Outage', 
          'Littering', 
          'Open Dump', 
          'Other Waste'
        ];
        
        // Get heatmap weight from the database or use default
        const heatmapWeight = data?.heatmapweight || 1;
        
        // Extract reports from each category
        categories.forEach(category => {
          if (data[category]) {
            // Convert object to array and process each report
            Object.values(data[category]).forEach((report: any) => {
              if (report.latitude && report.longitude) {
                reports.push({
                  latitude: report.latitude,
                  longitude: report.longitude,
                  weight: heatmapWeight
                });
              }
            });
          }
        });
      }
      
      setHeatmapData(reports);
    });
    
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  
  return (
    <MapContainer 
      center={bangalore as L.LatLngExpression} 
      zoom={12} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
      />
      {heatmapData.length > 0 && <HeatmapLayer data={heatmapData} />}
    </MapContainer>
  );
}
