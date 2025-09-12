import React, { useMemo, useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import CustomHeatmapLayer from './CustomHeatmapLayer';
import { getHeatmapConfig, calculateReportWeight, getNumericGradient, type HeatmapConfig } from '@/services/heatmapConfigService';
import { useIsMobile } from '@/hooks/use-mobile';
import { getOptimalZoom, BANGALORE_BOUNDARIES } from '@/config/mapConfig';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface MapReport {
  id: string;
  position: [number, number];
  title: string;
  category: string;
  status: 'pending' | 'verified' | 'resolved' | 'archived';
  description: string;
  photos: string[];
  endorsementCount: number;
  ward?: string;
  createdAt: string;
}

interface OpenStreetMapProps {
  reports: MapReport[];
  center?: [number, number];
  zoom?: number;
  onReportClick?: (reportId: string) => void;
  selectedReportId?: string | null;
  className?: string;
  showHeatmap?: boolean;
  enableClustering?: boolean;
}

const MapController: React.FC<{
  reports: MapReport[];
  onReportClick?: (reportId: string) => void;
  selectedReportId?: string | null;
  showHeatmap?: boolean;
  enableClustering?: boolean;
}> = ({ reports, onReportClick, selectedReportId, showHeatmap = false, enableClustering = true }) => {
  const map = useMap();
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);

  // Create custom icons for different statuses
  const createCustomIcon = (status: 'pending' | 'verified' | 'resolved' | 'archived', isSelected: boolean = false) => {
    const statusColors = {
      pending: '#ef4444', // red
      verified: '#eab308', // yellow
      resolved: '#22c55e', // green
      archived: '#6b7280'  // gray
    };

    const color = statusColors[status];
    const size = isSelected ? 32 : 24;
    
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: ${isSelected ? 3 : 2}px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Prepare heatmap data
  const heatmapData = useMemo(() => {
    return reports.map(report => ({
      lat: report.position[0],
      lng: report.position[1],
      weight: Math.max(report.endorsementCount || 1, 1) // Ensure minimum weight of 1
    }));
  }, [reports]);

  useEffect(() => {
    if (!map || showHeatmap) return;

    // Clear existing cluster layer
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
    }

    // Create cluster group or individual markers for pin mode
    if (enableClustering) {
      clusterGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          const childCount = cluster.getChildCount();
          const children = cluster.getAllChildMarkers();
          
          // Determine cluster color based on status priority
          let clusterColor = '#6b7280'; // default gray
          let hasPending = false;
          let hasVerified = false;
          let hasResolved = false;
          
          children.forEach((marker: any) => {
            if (marker.options.reportStatus === 'pending') hasPending = true;
            else if (marker.options.reportStatus === 'verified') hasVerified = true;
            else if (marker.options.reportStatus === 'resolved') hasResolved = true;
          });
          
          // Priority: pending (red) > verified (yellow) > resolved (green) > archived (gray)
          if (hasPending) clusterColor = '#ef4444'; // red
          else if (hasVerified) clusterColor = '#eab308'; // yellow  
          else if (hasResolved) clusterColor = '#22c55e'; // green
          
          return L.divIcon({
            html: `<div style="
              background-color: ${clusterColor};
              color: white;
              border-radius: 50%;
              text-align: center;
              font-weight: bold;
              width: 40px;
              height: 40px;
              line-height: 40px;
              border: 2px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              font-size: 14px;
            ">${childCount}</div>`,
            className: 'custom-cluster-icon',
            iconSize: new L.Point(40, 40)
          });
        }
      });
    }

    reports.forEach(report => {
      const isSelected = selectedReportId === report.id;
      const icon = createCustomIcon(report.status, isSelected);
      
      const marker = L.marker(report.position as L.LatLngExpression, { 
        icon,
        reportStatus: report.status  // Add status for cluster color calculation
      } as any)
        .bindPopup(`
          <div style="max-width: 250px; padding: 8px;">
            <h3 style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">
              ${report.title}
            </h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px; line-height: 1.3;">
              ${report.description.length > 100 ? report.description.substring(0, 100) + '...' : report.description}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; margin-bottom: 8px;">
              <span style="
                padding: 2px 8px; 
                border-radius: 4px; 
                color: white; 
                background-color: ${report.status === 'pending' ? '#ef4444' :
                                  report.status === 'verified' ? '#eab308' : 
                                  report.status === 'resolved' ? '#22c55e' : '#6b7280'}"
              >
                ${report.status}
              </span>
              <span style="color: #666;">
                ${report.endorsementCount} endorsements
              </span>
            </div>
            ${report.ward ? `<p style="font-size: 11px; color: #888; margin-bottom: 4px;">Ward: ${report.ward}</p>` : ''}
            ${report.photos.length > 0 ? `
              <img 
                src="${report.photos[0]}" 
                alt="${report.title}"
                style="
                  width: 100%; 
                  height: 60px; 
                  object-fit: cover; 
                  border-radius: 4px; 
                "
              />
            ` : ''}
          </div>
        `)
        .on('click', () => onReportClick?.(report.id));

      if (enableClustering && clusterGroupRef.current) {
        clusterGroupRef.current.addLayer(marker);
      } else {
        marker.addTo(map);
      }
    });

    if (enableClustering && clusterGroupRef.current) {
      map.addLayer(clusterGroupRef.current);
    }

    return () => {
      if (clusterGroupRef.current) {
        map.removeLayer(clusterGroupRef.current);
      }
    };
  }, [map, reports, selectedReportId, showHeatmap, enableClustering, onReportClick]);

  // Handle zoom to selected report
  useEffect(() => {
    if (!map || !selectedReportId) return;

    const selectedReport = reports.find(report => report.id === selectedReportId);
    if (selectedReport) {
      // Zoom to the selected report with smooth animation
      map.flyTo(selectedReport.position, 16, {
        animate: true,
        duration: 1.5
      });
    }
  }, [map, selectedReportId, reports]);

  return null;
};

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  reports,
  center = BANGALORE_BOUNDARIES.center, // Use configured Bangalore center
  zoom, // Let default be handled by mobile logic
  onReportClick,
  selectedReportId,
  className = "h-96 w-full",
  showHeatmap = false,
  enableClustering = true
}) => {
  const isMobile = useIsMobile();
  const [heatmapConfig, setHeatmapConfig] = useState<HeatmapConfig | null>(null);

  // Determine optimal zoom level based on device and use case
  const defaultZoom = useMemo(() => {
    if (zoom !== undefined) return zoom; // Use provided zoom if specified
    
    // Use sophisticated zoom calculation
    // Mobile: Show entire Bangalore city (zoom 10) for better overview and context
    // Desktop: Show central Bangalore (zoom 13) for better interaction and detail
    // This ensures mobile users can see the full metropolitan area at first glance
    return getOptimalZoom(isMobile, 'overview');
  }, [zoom, isMobile]);

  // Load heatmap configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const config = await getHeatmapConfig();
        setHeatmapConfig(config);
      } catch (error) {
        console.error('Failed to load heatmap config:', error);
      }
    };
    loadConfig();
  }, []);

  // Prepare heatmap data with configurable weights
  const heatmapData = useMemo(() => {
    if (!heatmapConfig) return [];
    
    const validReports = reports.filter(report => 
      report.position && 
      report.position.length === 2 && 
      !isNaN(report.position[0]) && 
      !isNaN(report.position[1])
    );
    
    console.log('🗺️ OpenStreetMap - Total reports:', reports.length);
    console.log('🗺️ OpenStreetMap - Valid reports for heatmap:', validReports.length);
    console.log('🗺️ OpenStreetMap - Show heatmap:', showHeatmap);
    console.log('🔧 OpenStreetMap - Using config:', {
      radius: heatmapConfig.radius,
      blur: heatmapConfig.blur,
      baseWeight: heatmapConfig.baseWeight,
      weightMultiplier: heatmapConfig.weightMultiplier
    });
    
    const heatData = validReports.map(report => ({
      lat: report.position[0],
      lng: report.position[1],
      weight: calculateReportWeight(report.endorsementCount || 0, report.status, heatmapConfig)
    }));
    
    console.log('🗺️ OpenStreetMap - Heatmap data points:', heatData);
    
    return heatData;
  }, [reports, heatmapConfig]);

  return (
    <div className={className}>
      <MapContainer 
        center={center as L.LatLngExpression} 
        zoom={defaultZoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {showHeatmap && heatmapData.length > 0 && heatmapConfig ? (
          <CustomHeatmapLayer
            points={heatmapData}
            radius={heatmapConfig.radius}
            blur={heatmapConfig.blur}
            maxZoom={heatmapConfig.maxZoom}
            gradient={getNumericGradient(heatmapConfig)}
          />
        ) : showHeatmap && heatmapData.length === 0 ? (
          <div className="absolute top-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm p-2 rounded text-sm">
            No heatmap data available
          </div>
        ) : null}
        
        {!showHeatmap && (
          <MapController
            reports={reports}
            onReportClick={onReportClick}
            selectedReportId={selectedReportId}
            showHeatmap={showHeatmap}
            enableClustering={enableClustering}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMap;
