import React, { useEffect, useState, createContext } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./src/services/firebase";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { ContactProvider } from "./src/contexts/ContactContext";
import { UserProfileProvider } from "./src/contexts/UserProfileContext";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ChatListScreen from "./src/screens/ChatListScreen";
import ChatScreen from "./src/screens/ChatScreen";
import AddContactScreen from "./src/screens/AddContactScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import PrivacyScreen from "./src/screens/PrivacyScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Stack = createNativeStackNavigator();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0088cc" />
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Safety timeout - set loading to false after 5 seconds regardless
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
        }
        setLoading(false);
        clearTimeout(safetyTimeout);
      });

      return () => {
        unsubscribe();
        clearTimeout(safetyTimeout);
      };
    } catch (error) {
      console.error("Firebase auth error:", error);
      setLoading(false);
      clearTimeout(safetyTimeout);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0088cc" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <ThemeProvider>
      <UserProfileProvider>
        <ContactProvider>
          <AuthContext.Provider value={{ user, loading, logout: handleLogout }}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  <>
                    <Stack.Screen name="ChatList" component={ChatListScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen} />
                    <Stack.Screen name="AddContact" component={AddContactScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    <Stack.Screen name="Privacy" component={PrivacyScreen} />
                    <Stack.Screen name="Help" component={HelpScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </AuthContext.Provider>
        </ContactProvider>
      </UserProfileProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666666",
  },
});

