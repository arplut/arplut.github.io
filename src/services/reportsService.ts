import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  GeoPoint,
  Timestamp,
  increment
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

export interface Report {
  id?: string;
  title: string;
  description: string;
  category: 'garbage' | 'sewage' | 'burning' | 'construction' | 'pollution' | 'other';
  status: 'pending' | 'verified' | 'resolved';
  location: {
    coordinates: GeoPoint;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  photos: string[];
  authorId: string;
  authorName?: string;
  isAnonymous: boolean;
  endorsements: string[]; // Array of user IDs who endorsed
  endorsementCount: number;
  metadata: {
    capturedAt: Timestamp;
    deviceInfo?: string;
    gpsAccuracy?: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  aiClassification?: {
    detectedObjects: string[];
    confidence: number;
    suggestedCategory: string;
  };
}

export interface CreateReportData {
  title: string;
  description: string;
  category: Report['category'];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
  };
  photos: File[];
  isAnonymous: boolean;
  capturedAt: Date;
}

class ReportsService {
  private reportsCollection = collection(db, 'reports');

  // Create a new report
  async createReport(reportData: CreateReportData, userId: string): Promise<string> {
    try {
      // Upload photos first
      const photoUrls = await this.uploadPhotos(reportData.photos, userId);
      
      // Classify images with AI (placeholder for now)
      const aiClassification = await this.classifyImages(photoUrls);
      
      const report: Omit<Report, 'id'> = {
        title: reportData.title,
        description: reportData.description,
        category: reportData.category,
        status: 'pending',
        location: {
          coordinates: new GeoPoint(reportData.location.latitude, reportData.location.longitude),
          address: reportData.location.address,
          city: reportData.location.city,
          state: reportData.location.state,
          postalCode: reportData.location.postalCode,
        },
        photos: photoUrls,
        authorId: userId,
        isAnonymous: reportData.isAnonymous,
        endorsements: [],
        endorsementCount: 0,
        metadata: {
          capturedAt: Timestamp.fromDate(reportData.capturedAt),
          deviceInfo: navigator.userAgent,
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        aiClassification,
      };

      const docRef = await addDoc(this.reportsCollection, report);
      
      // Update user's report count
      await this.updateUserReportCount(userId);
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating report:', error);
      throw error;
    }
  }

  // Upload photos to Firebase Storage
  private async uploadPhotos(photos: File[], userId: string): Promise<string[]> {
    const uploadPromises = photos.map(async (photo, index) => {
      const timestamp = Date.now();
      const photoRef = ref(storage, `reports/${userId}/${timestamp}_${index}.jpg`);
      const snapshot = await uploadBytes(photoRef, photo);
      return getDownloadURL(snapshot.ref);
    });

    return Promise.all(uploadPromises);
  }

  // AI Image Classification (placeholder - integrate with Google Vision AI)
  private async classifyImages(photoUrls: string[]): Promise<Report['aiClassification']> {
    // TODO: Integrate with Google Cloud Vision API
    // For now, return mock data
    return {
      detectedObjects: ['waste', 'garbage'],
      confidence: 0.85,
      suggestedCategory: 'garbage'
    };
  }

  // Get reports with filters
  async getReports(filters?: {
    category?: string;
    status?: string;
    location?: {
      latitude: number;
      longitude: number;
      radius: number; // in kilometers
    };
    limit?: number;
  }): Promise<Report[]> {
    try {
      let q = query(this.reportsCollection, orderBy('createdAt', 'desc'));

      if (filters?.category && filters.category !== 'all') {
        q = query(q, where('category', '==', filters.category));
      }

      if (filters?.status && filters.status !== 'all') {
        q = query(q, where('status', '==', filters.status));
      }

      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      const reports: Report[] = [];
      
      querySnapshot.forEach((doc) => {
        reports.push({
          id: doc.id,
          ...doc.data() as Omit<Report, 'id'>
        });
      });

      // Apply location filter if specified (simple distance calculation)
      if (filters?.location) {
        return reports.filter(report => {
          const distance = this.calculateDistance(
            filters.location!.latitude,
            filters.location!.longitude,
            report.location.coordinates.latitude,
            report.location.coordinates.longitude
          );
          return distance <= filters.location!.radius;
        });
      }

      return reports;
    } catch (error) {
      console.error('Error getting reports:', error);
      throw error;
    }
  }

  // Endorse a report
  async endorseReport(reportId: string, userId: string): Promise<void> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      
      await updateDoc(reportRef, {
        endorsements: [...(await this.getReport(reportId))?.endorsements || [], userId],
        endorsementCount: increment(1),
        updatedAt: Timestamp.now()
      });

      // Check if report should be verified (threshold: 3 endorsements)
      const report = await this.getReport(reportId);
      if (report && report.endorsementCount >= 3 && report.status === 'pending') {
        await this.updateReportStatus(reportId, 'verified');
      }
    } catch (error) {
      console.error('Error endorsing report:', error);
      throw error;
    }
  }

  // Get single report
  async getReport(reportId: string): Promise<Report | null> {
    try {
      const reportDoc = await getDocs(query(this.reportsCollection, where('__name__', '==', reportId)));
      if (!reportDoc.empty) {
        const doc = reportDoc.docs[0];
        return {
          id: doc.id,
          ...doc.data() as Omit<Report, 'id'>
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting report:', error);
      throw error;
    }
  }

  // Update report status
  async updateReportStatus(reportId: string, status: Report['status']): Promise<void> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  }

  // Update user's report count
  private async updateUserReportCount(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        totalReports: increment(1)
      });
    } catch (error) {
      console.error('Error updating user report count:', error);
    }
  }

  // Calculate distance between two coordinates (Haversine formula)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.degreesToRadians(lat1)) * Math.cos(this.degreesToRadians(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI/180);
  }
}

export const reportsService = new ReportsService();