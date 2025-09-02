import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  status: 'pending' | 'verified' | 'resolved';
  description: string;
  photos: string[];
  endorsementCount: number;
}

interface OpenStreetMapProps {
  reports: MapReport[];
  center?: [number, number];
  zoom?: number;
  onReportClick?: (reportId: string) => void;
  selectedReportId?: string | null;
  className?: string;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  reports,
  center = [12.9716, 77.5946], // Bangalore coordinates
  zoom = 13,
  onReportClick,
  selectedReportId,
  className = "h-96 w-full"
}) => {
  // Create custom icons for different statuses
  const createCustomIcon = (status: 'pending' | 'verified' | 'resolved', isSelected: boolean = false) => {
    const statusColors = {
      pending: '#f59e0b', // amber
      verified: '#3b82f6', // blue  
      resolved: '#10b981'  // emerald
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

  const markers = useMemo(() => {
    return reports.map(report => {
      const isSelected = selectedReportId === report.id;
      const icon = createCustomIcon(report.status, isSelected);
      
      return (
        <Marker
          key={report.id}
          position={report.position}
          icon={icon}
          eventHandlers={{
            click: () => onReportClick?.(report.id)
          }}
        >
          <Popup>
            <div style={{ maxWidth: '250px', padding: '8px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '4px', fontSize: '14px' }}>
                {report.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px', lineHeight: '1.3' }}>
                {report.description.length > 100 ? report.description.substring(0, 100) + '...' : report.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  color: 'white', 
                  backgroundColor: report.status === 'pending' ? '#f59e0b' :
                                   report.status === 'verified' ? '#3b82f6' : '#10b981'
                }}>
                  {report.status}
                </span>
                <span style={{ color: '#666' }}>
                  {report.endorsementCount} endorsements
                </span>
              </div>
              {report.photos.length > 0 && (
                <img 
                  src={report.photos[0]} 
                  alt={report.title}
                  style={{ 
                    width: '100%', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '4px', 
                    marginTop: '8px' 
                  }}
                />
              )}
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [reports, selectedReportId, onReportClick]);

  return (
    <div className={className}>
      <MapContainer 
        center={center as L.LatLngExpression} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMap;
