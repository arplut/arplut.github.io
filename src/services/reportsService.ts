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

// ... (Keep the Report and CreateReportData interfaces as they are) ...
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


export default class ReportsService {
  private reportsCollection = collection(db, 'reports');

  // ... (createReport, uploadPhotos, classifyImages methods remain the same) ...
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

  private async uploadPhotos(photos: File[], userId: string): Promise<string[]> {
    const uploadPromises = photos.map(async (photo, index) => {
      const timestamp = Date.now();
      const photoRef = ref(storage, `reports/${userId}/${timestamp}_${index}.jpg`);
      const snapshot = await uploadBytes(photoRef, photo);
      return getDownloadURL(snapshot.ref);
    });

    return Promise.all(uploadPromises);
  }

  private async classifyImages(photoUrls: string[]): Promise<Report['aiClassification']> {
    // TODO: Integrate with Google Cloud Vision API
    console.log("AI Classification: Using placeholder data for:", photoUrls);
    return {
      detectedObjects: ['waste', 'garbage'],
      confidence: 0.85,
      suggestedCategory: 'garbage'
    };
  }

  // OPTIMIZED: Get reports with filters
  async getReports(filters: { authorId?: string; category?: string; status?: string; limit?: number } = {}): Promise<Report[]> {
    try {
      let constraints = [orderBy('createdAt', 'desc')];

      if (filters.authorId) {
        constraints.push(where('authorId', '==', filters.authorId));
      }
      if (filters.category && filters.category !== 'all') {
        constraints.push(where('category', '==', filters.category));
      }
      if (filters.status && filters.status !== 'all') {
        constraints.push(where('status', '==', filters.status));
      }
      if (filters.limit) {
        constraints.push(limit(filters.limit));
      }

      const q = query(this.reportsCollection, ...constraints);
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Report));

    } catch (error) {
      console.error('Error getting reports:', error);
      throw error;
    }
  }

  // ... (endorseReport, getReport, updateReportStatus, etc. remain the same) ...
  async endorseReport(reportId: string, userId: string): Promise<void> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const report = await this.getReport(reportId);
      if (report && report.endorsements.includes(userId)) {
        console.log("User has already endorsed this report.");
        return; // Or throw an error
      }
      
      await updateDoc(reportRef, {
        endorsements: [...(report?.endorsements || []), userId],
        endorsementCount: increment(1),
        updatedAt: Timestamp.now()
      });

      // Check if report should be verified (threshold: 3 endorsements)
      if (report && report.endorsementCount + 1 >= 3 && report.status === 'pending') {
        await this.updateReportStatus(reportId, 'verified');
      }
    } catch (error) {
      console.error('Error endorsing report:', error);
      throw error;
    }
  }

  async getReport(reportId: string): Promise<Report | null> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const reportDoc = await getDoc(reportRef);
      if (reportDoc.exists()) {
        return { id: reportDoc.id, ...reportDoc.data() } as Report;
      }
      return null;
    } catch (error) {
      console.error('Error getting report:', error);
      throw error;
    }
  }

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
}

export const reportsService = new ReportsService();