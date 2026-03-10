import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../contexts/ThemeContext";

type RootStackParamList = {
  Profile: undefined;
  Privacy: undefined;
};

export default function PrivacyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useContext(ThemeContext);
  const [lastSeenVisible, setLastSeenVisible] = useState(true);
  const [profilePhotoVisible, setProfilePhotoVisible] = useState(true);
  const [statusVisible, setStatusVisible] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacidade e Segurança</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, isDarkTheme && styles.contentDark]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Visibilidade do Perfil</Text>

          <View style={[styles.privacyItem, isDarkTheme && styles.privacyItemDark]}>
            <View style={styles.privacyLeft}>
              <Ionicons name="eye-outline" size={24} color="#2AABEE" />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyName, isDarkTheme && styles.privacyNameDark]}>Mostrar Último Acesso</Text>
                <Text style={[styles.privacyDescription, isDarkTheme && styles.privacyDescriptionDark]}>Deixe visível quando você estava online</Text>
              </View>
            </View>
            <Switch
              value={lastSeenVisible}
              onValueChange={setLastSeenVisible}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.privacyItem, isDarkTheme && styles.privacyItemDark]}>
            <View style={styles.privacyLeft}>
              <Ionicons name="image-outline" size={24} color="#2AABEE" />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyName, isDarkTheme && styles.privacyNameDark]}>Foto do Perfil Visível</Text>
                <Text style={[styles.privacyDescription, isDarkTheme && styles.privacyDescriptionDark]}>Todos podem ver sua foto</Text>
              </View>
            </View>
            <Switch
              value={profilePhotoVisible}
              onValueChange={setProfilePhotoVisible}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={[styles.privacyItem, isDarkTheme && styles.privacyItemDark]}>
            <View style={styles.privacyLeft}>
              <Ionicons name="heart-outline" size={24} color="#2AABEE" />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyName, isDarkTheme && styles.privacyNameDark]}>Status Online</Text>
                <Text style={[styles.privacyDescription, isDarkTheme && styles.privacyDescriptionDark]}>Mostrar quando está online</Text>
              </View>
            </View>
            <Switch
              value={statusVisible}
              onValueChange={setStatusVisible}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Mensagens</Text>

          <View style={[styles.privacyItem, isDarkTheme && styles.privacyItemDark]}>
            <View style={styles.privacyLeft}>
              <Ionicons name="checkmark-done-outline" size={24} color="#2AABEE" />
              <View style={styles.privacyInfo}>
                <Text style={[styles.privacyName, isDarkTheme && styles.privacyNameDark]}>Confirmação de Leitura</Text>
                <Text style={[styles.privacyDescription, isDarkTheme && styles.privacyDescriptionDark]}>Notifique quando leu uma mensagem</Text>
              </View>
            </View>
            <Switch
              value={readReceipts}
              onValueChange={setReadReceipts}
              trackColor={{ false: "#cccccc", true: "#81c784" }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Bloqueados</Text>
          <TouchableOpacity style={[styles.blockItem, isDarkTheme && styles.blockItemDark]}>
            <Ionicons name="ban-outline" size={24} color="#FF4444" />
            <Text style={[styles.blockText, isDarkTheme && styles.blockTextDark]}>Ver Contatos Bloqueados</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
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
  privacyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  privacyLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  privacyInfo: {
    flex: 1,
  },
  privacyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  privacyDescription: {
    fontSize: 14,
    color: "#888888",
  },
  blockItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  blockText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF4444",
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
  privacyItemDark: {
    borderBottomColor: "#333333",
  },
  privacyNameDark: {
    color: "#ffffff",
  },
  privacyDescriptionDark: {
    color: "#aaaaaa",
  },
  blockItemDark: {
    borderBottomColor: "#333333",
  },
  blockTextDark: {
    color: "#FF6666",
  },
});
