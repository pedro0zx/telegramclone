import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

type RootStackParamList = {
  Profile: undefined;
  About: undefined;
};

export default function AboutScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sobre</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, isDarkTheme && styles.contentDark]}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="chatbubble-ellipses" size={80} color="#2AABEE" />
          </View>
          <Text style={[styles.appName, isDarkTheme && styles.appNameDark]}>Telegram Clone</Text>
          <Text style={[styles.version, isDarkTheme && styles.versionDark]}>Versão 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Sobre o Aplicativo</Text>
          <Text style={[styles.descriptionText, isDarkTheme && styles.descriptionTextDark]}>
            Telegram Clone é um aplicativo de mensagens moderna que oferece comunicação segura, 
            rápida e confiável com seus contatos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Recursos Principais</Text>
          <View style={[styles.featureItem, isDarkTheme && styles.featureItemDark]}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={[styles.featureText, isDarkTheme && styles.featureTextDark]}>Mensagens instantâneas</Text>
          </View>
          <View style={[styles.featureItem, isDarkTheme && styles.featureItemDark]}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={[styles.featureText, isDarkTheme && styles.featureTextDark]}>Notificações em tempo real</Text>
          </View>
          <View style={[styles.featureItem, isDarkTheme && styles.featureItemDark]}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={[styles.featureText, isDarkTheme && styles.featureTextDark]}>Gerenciamento de contatos</Text>
          </View>
          <View style={[styles.featureItem, isDarkTheme && styles.featureItemDark]}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={[styles.featureText, isDarkTheme && styles.featureTextDark]}>Tema escuro e claro</Text>
          </View>
          <View style={[styles.featureItem, isDarkTheme && styles.featureItemDark]}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={[styles.featureText, isDarkTheme && styles.featureTextDark]}>Edição de perfil</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Desenvolvido Por</Text>
          <View style={[styles.developerInfo, isDarkTheme && styles.developerInfoDark]}>
            <Ionicons name="code-slash" size={24} color="#2AABEE" />
            <Text style={[styles.developerText, isDarkTheme && styles.developerTextDark]}>Tim de Desenvolvimento</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Legal</Text>
          <TouchableOpacity style={[styles.legalItem, isDarkTheme && styles.legalItemDark]}>
            <Text style={[styles.legalText, isDarkTheme && styles.legalTextDark]}>Termos de Serviço</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.legalItem, isDarkTheme && styles.legalItemDark]}>
            <Text style={[styles.legalText, isDarkTheme && styles.legalTextDark]}>Política de Privacidade</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.legalItem, isDarkTheme && styles.legalItemDark]}>
            <Text style={[styles.legalText, isDarkTheme && styles.legalTextDark]}>Licenças de Terceiros</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, isDarkTheme && styles.footerDark]}>
          <Text style={[styles.footerText, isDarkTheme && styles.footerTextDark]}>© 2026 Telegram Clone. Todos os direitos reservados.</Text>
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
  logoSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  logoContainer: {
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    color: "#888888",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  developerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  developerText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  legalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  legalText: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  footer: {
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
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
  appNameDark: {
    color: "#ffffff",
  },
  versionDark: {
    color: "#aaaaaa",
  },
  sectionTitleDark: {
    color: "#ffffff",
  },
  descriptionTextDark: {
    color: "#cccccc",
  },
  featureItemDark: {
    // placeholder style
  },
  featureTextDark: {
    color: "#ffffff",
  },
  developerInfoDark: {
    // placeholder style
  },
  developerTextDark: {
    color: "#ffffff",
  },
  legalItemDark: {
    borderBottomColor: "#333333",
  },
  legalTextDark: {
    color: "#ffffff",
  },
  footerDark: {
    borderTopColor: "#333333",
  },
  footerTextDark: {
    color: "#aaaaaa",
  },
});
