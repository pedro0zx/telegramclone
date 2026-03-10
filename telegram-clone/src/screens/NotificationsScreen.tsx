import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../contexts/ThemeContext";

type RootStackParamList = {
  Profile: undefined;
  Notifications: undefined;
};

export default function NotificationsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useContext(ThemeContext);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, isDarkTheme && styles.contentDark]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Preferências de Notificação</Text>

          <View style={[styles.notificationItem, isDarkTheme && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <Ionicons name="notifications-outline" size={24} color="#2AABEE" />
              <View style={styles.notificationInfo}>
                <Text style={[styles.notificationName, isDarkTheme && styles.notificationNameDark]}>Notificações Push</Text>
                <Text style={[styles.notificationDescription, isDarkTheme && styles.notificationDescriptionDark]}>Receba alertas em tempo real</Text>
              </View>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.notificationItem, isDarkTheme && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <Ionicons name="chatbubble-outline" size={24} color="#2AABEE" />
              <View style={styles.notificationInfo}>
                <Text style={[styles.notificationName, isDarkTheme && styles.notificationNameDark]}>Notificações de Mensagens</Text>
                <Text style={[styles.notificationDescription, isDarkTheme && styles.notificationDescriptionDark]}>Alertas de novas mensagens</Text>
              </View>
            </View>
            <Switch
              value={messageNotifications}
              onValueChange={setMessageNotifications}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.notificationItem, isDarkTheme && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <Ionicons name="volume-high-outline" size={24} color="#2AABEE" />
              <View style={styles.notificationInfo}>
                <Text style={[styles.notificationName, isDarkTheme && styles.notificationNameDark]}>Som</Text>
                <Text style={[styles.notificationDescription, isDarkTheme && styles.notificationDescriptionDark]}>Reproduzir som nas notificações</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.notificationItem, isDarkTheme && styles.notificationItemDark]}>
            <View style={styles.notificationLeft}>
              <Ionicons name="phone-portrait-outline" size={24} color="#2AABEE" />
              <View style={styles.notificationInfo}>
                <Text style={[styles.notificationName, isDarkTheme && styles.notificationNameDark]}>Vibração</Text>
                <Text style={[styles.notificationDescription, isDarkTheme && styles.notificationDescriptionDark]}>Ativar vibração nas notificações</Text>
              </View>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#2AABEE",
    paddingVertical: 15,
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    padding: 5,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  notificationLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#888888",
  },
  // Dark Theme Styles
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  headerDark: {
    backgroundColor: "#1a1a1a",
  },
  contentDark: {
    backgroundColor: "#1a1a1a",
  },
  sectionTitleDark: {
    color: "#ffffff",
  },
  notificationItemDark: {
    borderBottomColor: "#333333",
  },
  notificationNameDark: {
    color: "#ffffff",
  },
  notificationDescriptionDark: {
    color: "#aaaaaa",
  },
});
