'use client';

import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


export function BangaloreMap() {

  const bangalore: [number, number] = [12.9716, 77.5946];
  
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
    </MapContainer>
  );
}
