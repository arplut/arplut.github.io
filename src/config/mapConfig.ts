// Bangalore Geographic Boundaries and Optimal Zoom Levels
// Reference for future map optimizations

export const BANGALORE_BOUNDARIES = {
  // Approximate boundaries of Greater Bangalore
  north: 13.1389, // Devanahalli area
  south: 12.7343, // Banashankari/Electronic City area
  east: 77.8133,  // Whitefield area
  west: 77.3910,  // Rajarajeshwari Nagar area
  
  // Central coordinates (current default)
  center: [12.9716, 77.5946] as [number, number],
  
  // Optimal zoom levels for different use cases
  zoomLevels: {
    entireMetroArea: 12,    // Shows full Bangalore metro + surrounding areas (mobile)
    entireCity: 12,        // Shows full Bangalore metro area
    cityCenter: 15,        // Shows central Bangalore districts
    neighborhood: 17,      // Shows local areas/wards
    streetLevel: 19        // Shows individual streets
  },
  
  // Administrative zones for future ward overlay
  zones: {
    central: { lat: 12.9716, lng: 77.5946 },
    north: { lat: 13.0827, lng: 77.5946 },
    south: { lat: 12.8600, lng: 77.5946 },
    east: { lat: 12.9716, lng: 77.7500 },
    west: { lat: 12.9716, lng: 77.4500 }
  }
};

// Calculate if coordinates are within Bangalore boundaries
export const isWithinBangalore = (lat: number, lng: number): boolean => {
  return lat >= BANGALORE_BOUNDARIES.south &&
         lat <= BANGALORE_BOUNDARIES.north &&
         lng >= BANGALORE_BOUNDARIES.west &&
         lng <= BANGALORE_BOUNDARIES.east;
};

// Get optimal zoom based on device and use case
export const getOptimalZoom = (
  isMobile: boolean, 
  useCase: 'overview' | 'detail' | 'navigation' = 'overview'
): number => {
  if (isMobile) {
    switch (useCase) {
      case 'overview': return BANGALORE_BOUNDARIES.zoomLevels.entireMetroArea; // Zoom 9 for wider view
      case 'detail': return BANGALORE_BOUNDARIES.zoomLevels.cityCenter;
      case 'navigation': return BANGALORE_BOUNDARIES.zoomLevels.neighborhood;
      default: return BANGALORE_BOUNDARIES.zoomLevels.entireMetroArea;
    }
  } else {
    switch (useCase) {
      case 'overview': return BANGALORE_BOUNDARIES.zoomLevels.cityCenter;
      case 'detail': return BANGALORE_BOUNDARIES.zoomLevels.neighborhood;
      case 'navigation': return BANGALORE_BOUNDARIES.zoomLevels.streetLevel;
      default: return BANGALORE_BOUNDARIES.zoomLevels.cityCenter;
    }
  }
};