import {
  collection,
  addDoc,
  getDocs,
  getDoc,
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
import { transformToReport } from './dataTransformService';

export interface Report {
  id?: string;
  title: string;
  description: string;
  category: 'garbage' | 'sewage' | 'burning' | 'construction' | 'pollution' | 'other';
  status: 'pending' | 'verified' | 'resolved' | 'archived';
  location: {
    coordinates: {
      latitude: number;
      longitude: number;
    };
    address?: string;
    ward?: string;
    city?: string;
    state?: string;
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
          ...(reportData.location.postalCode && { postalCode: reportData.location.postalCode }),
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
        ...(aiClassification && { aiClassification }),
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
      const { authorId, category, status, limit: limitCount } = filters;
      let constraints: any[] = [orderBy('createdAt', 'desc')];

      if (authorId) {
        constraints.push(where('authorId', '==', authorId));
      }
      if (category && category !== 'all') {
        constraints.push(where('category', '==', category));
      }
      if (status) {
        constraints.push(where('status', '==', status));
      }
      if (limitCount) {
        constraints.push(limit(limitCount));
      }

      const q = query(this.reportsCollection, ...constraints);
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return transformToReport(doc.id, data);
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      throw error;
    }
  }

  async getReportById(reportId: string): Promise<Report | null> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const reportSnap = await getDoc(reportRef);

      if (reportSnap.exists()) {
        const data = reportSnap.data();
        return transformToReport(reportSnap.id, data);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching report by ID:', error);
      throw error;
    }
  }

  async updateReportStatus(reportId: string, status: Report['status']): Promise<void> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        status: status,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  }

  async endorseReport(reportId: string, userId: string): Promise<void> {
    try {
      const reportRef = doc(db, 'reports', reportId);
      const report = await this.getReportById(reportId);

      if (report && !report.endorsements.includes(userId)) {
        await updateDoc(reportRef, {
          endorsements: [...report.endorsements, userId],
          endorsementCount: increment(1),
          updatedAt: Timestamp.now(),
        });
      } else if (report) {
        // Optional: Allow un-endorsing
        await updateDoc(reportRef, {
          endorsements: report.endorsements.filter(id => id !== userId),
          endorsementCount: increment(-1),
          updatedAt: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Error endorsing report:', error);
      throw error;
    }
  }

  private async updateUserReportCount(userId: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        totalReports: increment(1),
      });
    } catch (error) {
      // It's possible the user document doesn't exist yet.
      // We can choose to create it here or handle it gracefully.
      console.warn('Could not update user report count. User doc might not exist.', error);
    }
  }
}

export const reportsService = new ReportsService();