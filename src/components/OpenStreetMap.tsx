import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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

// Component to handle map events
const MapEventHandler = ({ 
  onReportClick, 
  selectedReportId 
}: { 
  onReportClick?: (reportId: string) => void;
  selectedReportId?: string | null;
}) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedReportId) {
      // You could add logic here to center the map on the selected report
    }
  }, [selectedReportId, map]);

  return null;
};

// Custom marker icons based on status
const getMarkerIcon = (status: string, isSelected: boolean) => {
  const iconSize: [number, number] = isSelected ? [35, 57] : [25, 41];
  const iconAnchor: [number, number] = isSelected ? [17, 57] : [12, 41];
  
  const statusColors = {
    pending: '#f59e0b', // amber
    verified: '#3b82f6', // blue  
    resolved: '#10b981'  // emerald
  };

  // Create a colored marker using a data URL
  const createColoredMarker = (color: string) => {
    const svg = `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return new Icon({
    iconUrl: createColoredMarker(statusColors[status as keyof typeof statusColors] || statusColors.pending),
    shadowUrl: markerShadow,
    iconSize,
    iconAnchor,
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  reports,
  center = [12.9716, 77.5946], // Bangalore coordinates
  zoom = 13,
  onReportClick,
  selectedReportId,
  className = "h-96 w-full"
}) => {
  const mapRef = useRef<any>(null);

  // Default to Leaflet's default icon if custom icons fail
  useEffect(() => {
    // Set default icon for all markers
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
    <div className={className}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapEventHandler 
          onReportClick={onReportClick}
          selectedReportId={selectedReportId}
        />
        
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={report.position}
            icon={getMarkerIcon(report.status, selectedReportId === report.id)}
            eventHandlers={{
              click: () => onReportClick?.(report.id),
            }}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-semibold text-sm mb-1">{report.title}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {report.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded text-white ${
                    report.status === 'pending' ? 'bg-amber-500' :
                    report.status === 'verified' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}>
                    {report.status}
                  </span>
                  <span className="text-gray-500">
                    {report.endorsementCount} endorsements
                  </span>
                </div>
                {report.photos.length > 0 && (
                  <img 
                    src={report.photos[0]} 
                    alt={report.title}
                    className="w-full h-20 object-cover rounded mt-2"
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OpenStreetMap;