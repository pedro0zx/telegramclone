import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  loading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: null,
  setUserProfile: () => {},
  updateUserProfile: () => {},
  loading: true,
});

interface UserProfileProviderProps {
  children: ReactNode;
}

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // Initialize with Firebase user data
        setUserProfile({
          name: user.displayName || user.email?.split('@')[0] || "Usuário",
          email: user.email || "",
          phone: "",
          bio: "",
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, updateUserProfile, loading }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}

