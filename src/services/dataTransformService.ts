import { Report } from './reportsService';
import { DocumentData, GeoPoint, Timestamp } from 'firebase/firestore';

// Legacy migrated data interface
interface MigratedReport {
  category: 'littering' | 'open_dump' | 'other_waste';
  description: string;
  extraDescriptions?: string[];
  location: GeoPoint;
  timestamp: Timestamp;
  status: 'red' | 'pending' | 'archived';  // Added 'pending' status
  photos: string[];
  reportIds: string[];
  endorsements: number;
  ward?: string | null;
  authorName?: string;  // Added authorName field
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * Transforms legacy migrated data to the expected Report schema
 */
export function transformMigratedReport(docId: string, data: DocumentData): Report {
  const migrated = data as MigratedReport;
  
  // Transform category mapping
  const categoryMap: Record<string, Report['category']> = {
    'littering': 'garbage',
    'open_dump': 'garbage', 
    'other_waste': 'other'
  };
  
  // Transform status mapping
  const statusMap: Record<string, Report['status']> = {
    'red': 'pending',        // Changed: red -> pending (not verified)
    'pending': 'pending',    // New status from fix
    'archived': 'archived'
  };
  
  // Generate title from description (first 50 chars)
  const generateTitle = (description: string): string => {
    if (!description || description === 'nil') {
      return 'Report';  // Changed from 'Legacy Report'
    }
    return description.length > 50 
      ? description.substring(0, 47) + '...'
      : description;
  };
  
  // Build description with extra descriptions if available
  const fullDescription = migrated.extraDescriptions && migrated.extraDescriptions.length > 0
    ? [migrated.description, ...migrated.extraDescriptions].join(' | ')
    : migrated.description;
  
  const transformed: Report = {
    id: docId,
    title: generateTitle(migrated.description),
    description: fullDescription === 'nil' ? 'No description provided' : fullDescription,
    category: categoryMap[migrated.category] || 'other',
    status: statusMap[migrated.status] || 'pending',  // Default to pending for unrecognized status
    location: {
      coordinates: {
        latitude: migrated.location.latitude,
        longitude: migrated.location.longitude
      },
      ward: undefined,  // Remove user ward (set to null in Firebase fix)
      address: undefined,
      city: undefined,
      state: undefined,
      postalCode: undefined
    },
    photos: migrated.photos,
    authorId: 'migrated-legacy-data',
    authorName: migrated.authorName || 'geodha-team',  // Use existing or default
    isAnonymous: true,
    endorsements: [], // Convert count to empty array
    endorsementCount: migrated.endorsements || 0,
    metadata: {
      capturedAt: migrated.timestamp || migrated.createdAt,
      deviceInfo: 'Legacy Migration',
      gpsAccuracy: undefined
    },
    createdAt: migrated.createdAt,
    updatedAt: migrated.updatedAt,
    // AI classification not available for legacy data
    aiClassification: undefined
  };
  
  return transformed;
}

/**
 * Checks if a document is legacy migrated data or new format
 */
export function isLegacyMigratedData(data: DocumentData): boolean {
  // Legacy data has these specific characteristics:
  // 1. category is one of: littering, open_dump, other_waste
  // 2. location is a GeoPoint (not an object with coordinates)
  // 3. status is red, pending, or archived (legacy statuses)
  // 4. Has reportIds array
  // 5. Title is "Report" (after our fix)
  
  return (
    data.category && 
    ['littering', 'open_dump', 'other_waste'].includes(data.category) &&
    data.location &&
    data.location.latitude !== undefined && // GeoPoint check
    data.reportIds &&
    Array.isArray(data.reportIds) &&
    data.status &&
    ['red', 'pending', 'archived'].includes(data.status) &&
    data.title === 'Report'  // After our fix, all legacy reports have title "Report"
  );
}

/**
 * Transforms any document data to Report format, handling both legacy and new schemas
 */
export function transformToReport(docId: string, data: DocumentData): Report {
  if (isLegacyMigratedData(data)) {
    return transformMigratedReport(docId, data);
  }
  
  // For new format data, return as-is with id
  return {
    id: docId,
    ...data
  } as Report;
}

/**
 * Debug function to analyze document structure
 */
export function analyzeDocumentStructure(data: DocumentData) {
  const isLegacy = isLegacyMigratedData(data);
  
  return {
    isLegacy,
    hasTitle: !!data.title,
    hasAuthorId: !!data.authorId,
    categoryType: data.category,
    statusType: data.status,
    locationType: data.location?.latitude !== undefined ? 'GeoPoint' : 'object',
    hasReportIds: !!data.reportIds,
    photoCount: data.photos?.length || 0,
    endorsementType: typeof data.endorsements === 'number' ? 'count' : 'array'
  };
}