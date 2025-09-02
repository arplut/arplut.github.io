import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string; // Changed to be required
  photoURL: string;   // Changed to be required
  isAnonymous: boolean;
  language: 'en' | 'kn' | 'hi';
  notificationPreferences: {
    nearbyReports: boolean;
    reportUpdates: boolean;
    endorsements: boolean;
  };
  privacySettings: {
    shareNamePublicly: boolean;
    allowAnonymousReporting: boolean;
  };
  createdAt: Timestamp; // Changed to Timestamp
  totalReports: number;
  totalEndorsements: number;
  badges: string[];
}

export default class AuthService {
  // Register with email and password
  async register(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Create user profile in Firestore
      await this.createUserProfile(user, displayName);
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if user profile exists, create if not
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await this.createUserProfile(user);
      }
      
      return user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Create user profile in Firestore
  private async createUserProfile(user: User, displayName?: string): Promise<void> {
    const userProfile: UserProfile = {
      id: user.uid,
      email: user.email || '', // Provide default for email
      displayName: displayName || user.displayName || 'Anonymous User', // Ensure displayName is never undefined
      photoURL: user.photoURL || '', // Provide a default empty string for photoURL
      isAnonymous: user.isAnonymous,
      language: 'en',
      notificationPreferences: {
        nearbyReports: true,
        reportUpdates: true,
        endorsements: true,
      },
      privacySettings: {
        shareNamePublicly: true,
        allowAnonymousReporting: false,
      },
      createdAt: Timestamp.now(), // Use Firestore Timestamp
      totalReports: 0,
      totalEndorsements: 0,
      badges: ['New Member'],
    };

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
  }

  // Listen for auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Get user profile from Firestore
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data() as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}