// Firebase Cloud Messaging (FCM) service for push notifications

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, string>;
}

class NotificationService {
  private messaging: any;
  private vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY; // Use environment variable

  constructor() {
    if (typeof window !== 'undefined') {
      this.messaging = getMessaging();
    }
  }

  // Request notification permission and get FCM token
  async requestPermission(userId?: string): Promise<string | null> {
    try {
      if (!this.messaging) return null;

      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await getToken(this.messaging, {
          vapidKey: this.vapidKey
        });
        
        console.log('FCM Token:', token);
        
        // Save token to user profile in Firestore
        if (userId && token) {
          await this.saveFCMToken(userId, token);
        }
        
        return token;
      } else {
        console.log('Notification permission denied');
        return null;
      }
    } catch (error) {
      console.error('Error getting notification permission:', error);
      return null;
    }
  }

  // Save FCM token to user profile
  private async saveFCMToken(userId: string, token: string): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        fcmToken: token,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving FCM token:', error);
    }
  }

  // Listen for foreground messages
  onForegroundMessage(callback: (payload: any) => void) {
    if (!this.messaging) return;

    return onMessage(this.messaging, (payload) => {
      console.log('Foreground message received:', payload);
      callback(payload);
    });
  }

  // Send notification to specific user (server-side function)
  async sendNotificationToUser(
    userId: string, 
    notification: NotificationPayload
  ): Promise<void> {
    try {
      // This would typically be handled by a Cloud Function
      // For now, we'll just log it
      console.log('Sending notification to user:', userId, notification);
      
      // In production, this would call a Cloud Function:
      // const response = await fetch('/api/sendNotification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, notification })
      // });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  // Send notification for nearby reports
  async sendNearbyReportNotification(
    userIds: string[], 
    reportData: {
      title: string;
      location: string;
      category: string;
    }
  ): Promise<void> {
    const notification: NotificationPayload = {
      title: 'New Report Near You',
      body: `${reportData.category} issue reported at ${reportData.location}`,
      icon: '/icons/notification-icon.png',
      data: {
        type: 'nearby_report',
        reportId: reportData.title
      }
    };

    for (const userId of userIds) {
      await this.sendNotificationToUser(userId, notification);
    }
  }

  // Send notification for report endorsement
  async sendEndorsementNotification(
    userId: string,
    reportTitle: string,
    endorserName: string
  ): Promise<void> {
    const notification: NotificationPayload = {
      title: 'Your Report Was Endorsed',
      body: `${endorserName} endorsed your report: "${reportTitle}"`,
      icon: '/icons/endorsement-icon.png',
      data: {
        type: 'endorsement',
        reportTitle
      }
    };

    await this.sendNotificationToUser(userId, notification);
  }

  // Send notification for status update
  async sendStatusUpdateNotification(
    userId: string,
    reportTitle: string,
    newStatus: string
  ): Promise<void> {
    const statusMessages: Record<string, string> = {
      'verified': 'Your report has been verified by the community',
      'resolved': 'Great news! Your reported issue has been resolved'
    };

    const notification: NotificationPayload = {
      title: 'Report Status Updated',
      body: `${reportTitle}: ${statusMessages[newStatus] || 'Status updated'}`,
      icon: '/icons/status-icon.png',
      data: {
        type: 'status_update',
        reportTitle,
        newStatus
      }
    };

    await this.sendNotificationToUser(userId, notification);
  }

  // Show local notification (for testing)
  showLocalNotification(notification: NotificationPayload): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || '/icons/default-notification.png',
        badge: '/icons/badge-icon.png',
        tag: 'geodha-notification'
      });
    }
  }

  // Check if notifications are supported
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  // Get current notification permission status
  getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }
}

export const notificationService = new NotificationService();