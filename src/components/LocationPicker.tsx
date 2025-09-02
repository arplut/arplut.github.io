import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  initialLocation?: Location;
  onLocationChange: (location: Location) => void;
  className?: string;
  height?: string;
}

// Component to handle map clicks
interface LocationMarkerProps {
  position: [number, number] | null;
  setPosition: (position: [number, number]) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPosition);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
    </Marker>
  );
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLocation,
  onLocationChange,
  className = "w-full",
  height = "400px"
}) => {
  const [position, setPosition] = useState<[number, number] | null>(
    initialLocation 
      ? [initialLocation.latitude, initialLocation.longitude] 
      : [12.9716, 77.5946] // Default to Bangalore
  );

  const handlePositionChange = useCallback(async (newPosition: [number, number]) => {
    setPosition(newPosition);
    
    // Try to get address from reverse geocoding (using Nominatim)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPosition[0]}&lon=${newPosition[1]}&addressdetails=1`
      );
      const data = await response.json();
      
      const address = data.display_name || `${newPosition[0].toFixed(6)}, ${newPosition[1].toFixed(6)}`;
      
      onLocationChange({
        latitude: newPosition[0],
        longitude: newPosition[1],
        address
      });
    } catch (error) {
      console.error('Failed to get address:', error);
      // Fallback to coordinates
      onLocationChange({
        latitude: newPosition[0],
        longitude: newPosition[1],
        address: `${newPosition[0].toFixed(6)}, ${newPosition[1].toFixed(6)}`
      });
    }
  }, [onLocationChange]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          handlePositionChange(newPos);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={className}>
      <div className="mb-2 flex gap-2">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Use Current Location
        </button>
        <span className="text-sm text-muted-foreground">
          Click on the map to set location
        </span>
      </div>
      <div style={{ height }} className="rounded-lg overflow-hidden border">
        <MapContainer
          center={position || [12.9716, 77.5946]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handlePositionChange} />
        </MapContainer>
      </div>
      {position && (
        <div className="mt-2 text-sm text-muted-foreground">
          Selected: {position[0].toFixed(6)}, {position[1].toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
