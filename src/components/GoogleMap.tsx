/// <reference types="google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

export interface MapReport {
  id: string;
  position: [number, number];
  title: string;
  category: string;
  status: 'pending' | 'verified' | 'resolved';
  description: string;
  photos: string[];
  endorsementCount: number;
}

interface GoogleMapProps {
  reports: MapReport[];
  center?: [number, number];
  zoom?: number;
  onReportClick?: (reportId: string) => void;
  selectedReportId?: string | null;
  className?: string;
}

interface MapComponentProps extends GoogleMapProps {
  apiKey: string;
}

const MapComponent: React.FC<GoogleMapProps> = ({
  reports,
  center = [12.9716, 77.5946], // Bangalore coordinates
  zoom = 13,
  onReportClick,
  selectedReportId,
  className = "h-96 w-full"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: center[0], lng: center[1] },
      zoom,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    setMap(mapInstance);
  }, [center, zoom]);

  // Update markers when reports change
  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: google.maps.Marker[] = [];

    reports.forEach(report => {
      const statusColors = {
        pending: '#f59e0b', // amber
        verified: '#3b82f6', // blue  
        resolved: '#10b981'  // emerald
      };

      const isSelected = selectedReportId === report.id;
      const color = statusColors[report.status];

      // Create custom marker icon
      const markerIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: isSelected ? 3 : 2,
        scale: isSelected ? 12 : 8,
      };

      const marker = new google.maps.Marker({
        position: { lat: report.position[0], lng: report.position[1] },
        map,
        icon: markerIcon,
        title: report.title
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="max-width: 250px; padding: 8px;">
            <h3 style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">${report.title}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px; line-height: 1.3;">
              ${report.description.length > 100 ? report.description.substring(0, 100) + '...' : report.description}
            </p>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
              <span style="padding: 2px 8px; border-radius: 4px; color: white; background-color: ${color};">
                ${report.status}
              </span>
              <span style="color: #666;">
                ${report.endorsementCount} endorsements
              </span>
            </div>
            ${report.photos.length > 0 ? `
              <img 
                src="${report.photos[0]}" 
                alt="${report.title}"
                style="width: 100%; height: 60px; object-fit: cover; border-radius: 4px; margin-top: 8px;"
              />
            ` : ''}
          </div>
        `
      });

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        onReportClick?.(report.id);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, reports, selectedReportId, onReportClick]);

  return <div ref={mapRef} className={className} />;
};

const GoogleMapWrapper: React.FC<MapComponentProps> = ({ apiKey, ...props }) => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div className="flex items-center justify-center h-96 w-full bg-muted rounded-lg">
          <div className="text-muted-foreground">Loading map...</div>
        </div>;
      case Status.FAILURE:
        return <div className="flex items-center justify-center h-96 w-full bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="text-destructive text-center">
            <p className="font-medium">Error loading Google Maps</p>
            <p className="text-sm mt-1">Please check your API key configuration</p>
          </div>
        </div>;
      case Status.SUCCESS:
        return <MapComponent {...props} />;
    }
  };

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['geometry', 'places']} />
  );
};

// Main component with API key handling
const GoogleMap: React.FC<GoogleMapProps> = (props) => {
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    // Try to get API key from environment or localStorage
    const storedApiKey = localStorage.getItem('GOOGLE_MAPS_API_KEY') || '***REMOVED***';
    setApiKey(storedApiKey);
  }, []);

  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    return (
      <div className="flex flex-col items-center justify-center h-96 w-full bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25">
        <div className="text-center max-w-md p-6">
          <h3 className="font-semibold text-lg mb-2">Google Maps API Key Required</h3>
          <p className="text-muted-foreground text-sm mb-4">
            To use Google Maps, please add your API key. Get one from the Google Cloud Console.
          </p>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter your Google Maps API Key"
              className="w-full px-3 py-2 border border-input rounded-md text-sm"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  if (target.value) {
                    localStorage.setItem('GOOGLE_MAPS_API_KEY', target.value);
                    setApiKey(target.value);
                  }
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              Press Enter to save and load the map
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <GoogleMapWrapper apiKey={apiKey} {...props} />;
};

export default GoogleMap;