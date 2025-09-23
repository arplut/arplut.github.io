import { doc, getDoc } from 'firebase/firestore';
import { db, ensureAuth } from '@/lib/firebase';

export interface HeatmapConfig {
  radius: number;
  blur: number;
  maxZoom: number;
  minOpacity: number;
  maxOpacity: number;
  baseWeight: number;
  weightMultiplier: number;
  archivedWeightRatio: number;  // New: ratio for archived report weights
  minArchivedWeight: number;    // New: minimum weight for archived reports
  gradient: Record<string, string>;
  cityZoomLevel: number;
  regionZoomLevel: number;
  updateInterval: number;
  lastUpdated: Date;
  version: string;
  description: string;
}

// Default configuration (fallback if Firebase config fails)
const DEFAULT_CONFIG: HeatmapConfig = {
  radius: 45,
  blur: 25,
  maxZoom: 15,
  minOpacity: 0.1,
  maxOpacity: 0.8,
  baseWeight: 3,
  weightMultiplier: 2,
  archivedWeightRatio: 0.1,
  minArchivedWeight: 0.1,
  gradient: {
    0.1: '#fef3c7',
    0.2: '#fde047',
    0.4: '#eab308',
    0.6: '#f59e0b',
    0.8: '#dc2626',
    1.0: '#b91c1c'
  },
  cityZoomLevel: 11,
  regionZoomLevel: 13,
  updateInterval: 5000,
  lastUpdated: new Date(),
  version: '1.0',
  description: 'Default heatmap configuration'
};

let cachedConfig: HeatmapConfig | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60000; // 1 minute cache

/**
 * Load heatmap configuration from Firebase
 */
export async function getHeatmapConfig(): Promise<HeatmapConfig> {
  const now = Date.now();
  
  // Return cached config if recent
  if (cachedConfig && (now - lastFetch) < CACHE_DURATION) {
    return cachedConfig;
  }
  
  try {
    console.log('🔧 Loading heatmap configuration from Firebase...');
    
    // Ensure user is authenticated before querying
    await ensureAuth();
    
    const configRef = doc(db, 'config', 'heatmap');
    const configSnap = await getDoc(configRef);
    
    if (configSnap.exists()) {
      const data = configSnap.data();
      
      // Transform Firestore data to HeatmapConfig
      const config: HeatmapConfig = {
        radius: data.radius || DEFAULT_CONFIG.radius,
        blur: data.blur || DEFAULT_CONFIG.blur,
        maxZoom: data.maxZoom || DEFAULT_CONFIG.maxZoom,
        minOpacity: data.minOpacity || DEFAULT_CONFIG.minOpacity,
        maxOpacity: data.maxOpacity || DEFAULT_CONFIG.maxOpacity,
        baseWeight: data.baseWeight || DEFAULT_CONFIG.baseWeight,
        weightMultiplier: data.weightMultiplier || DEFAULT_CONFIG.weightMultiplier,
        archivedWeightRatio: data.archivedWeightRatio || DEFAULT_CONFIG.archivedWeightRatio,
        minArchivedWeight: data.minArchivedWeight || DEFAULT_CONFIG.minArchivedWeight,
        gradient: data.gradient || DEFAULT_CONFIG.gradient,
        cityZoomLevel: data.cityZoomLevel || DEFAULT_CONFIG.cityZoomLevel,
        regionZoomLevel: data.regionZoomLevel || DEFAULT_CONFIG.regionZoomLevel,
        updateInterval: data.updateInterval || DEFAULT_CONFIG.updateInterval,
        lastUpdated: data.lastUpdated?.toDate() || new Date(),
        version: data.version || DEFAULT_CONFIG.version,
        description: data.description || DEFAULT_CONFIG.description
      };
      
      console.log('✅ Loaded heatmap config:', {
        radius: config.radius,
        blur: config.blur,
        maxZoom: config.maxZoom,
        baseWeight: config.baseWeight,
        version: config.version
      });
      
      cachedConfig = config;
      lastFetch = now;
      
      return config;
    } else {
      console.log('⚠️ No heatmap config found in Firebase, using defaults');
      cachedConfig = DEFAULT_CONFIG;
      lastFetch = now;
      return DEFAULT_CONFIG;
    }
  } catch (error) {
    console.error('❌ Error loading heatmap config:', error);
    console.log('🔄 Using default configuration');
    return DEFAULT_CONFIG;
  }
}

/**
 * Calculate weight for a report based on config and status
 */
export function calculateReportWeight(
  endorsementCount: number, 
  status: 'pending' | 'verified' | 'resolved' | 'archived',
  config: HeatmapConfig
): number {
  // Minimal weight for archived reports using config values
  if (status === 'archived') {
    return Math.max(
      config.minArchivedWeight, 
      config.baseWeight * config.archivedWeightRatio
    );
  }
  
  // Normal weight calculation for active reports
  return Math.max(
    config.baseWeight,
    config.baseWeight + (endorsementCount * config.weightMultiplier)
  );
}

/**
 * Get gradient object with numeric keys for leaflet.heat
 */
export function getNumericGradient(config: HeatmapConfig): Record<number, string> {
  const numericGradient: Record<number, string> = {};
  
  Object.entries(config.gradient).forEach(([key, value]) => {
    numericGradient[parseFloat(key)] = value;
  });
  
  return numericGradient;
}

/**
 * Clear cached configuration (useful for testing)
 */
export function clearConfigCache(): void {
  cachedConfig = null;
  lastFetch = 0;
}