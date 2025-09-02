import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserProfile } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null; // You'll need to fetch this
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // TODO: Add state for userProfile

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // TODO: If user exists, fetch their profile from Firestore
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userProfile: null, // Replace with actual profile
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
