// src/config/firebase.config.ts
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// Development config (uses environment variables)
const developmentConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

// Production config (for GitHub Pages - uses restricted keys)
const productionConfig: FirebaseConfig = {
  apiKey: 'your-restricted-production-api-key',
  authDomain: '***REMOVED***',
  projectId: '***REMOVED***',
  storageBucket: '***REMOVED***.firebasestorage.app',
  messagingSenderId: '***REMOVED***',
  appId: 'your-restricted-production-app-id',
  measurementId: '***REMOVED***'
};

// Select config based on environment
const isProduction = import.meta.env.PROD;
export const firebaseConfig = isProduction ? productionConfig : developmentConfig;

// For Google Maps (if needed)
export const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// For VAPID key
export const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'production-vapid-key';
