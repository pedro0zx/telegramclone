import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: true, // Default to dark theme
  setIsDarkTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to dark theme

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("isDarkTheme");
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === "true");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    loadTheme();
  }, []);

  const handleSetDarkTheme = (value: boolean) => {
    setIsDarkTheme(value);
    // Save theme preference
    AsyncStorage.setItem("isDarkTheme", value.toString()).catch((error) => {
      console.error("Error saving theme:", error);
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme: handleSetDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
