import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

type RootStackParamList = {
  Profile: undefined;
  Help: undefined;
};

export default function HelpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isDarkTheme } = useContext(ThemeContext);

  const handleContactSupport = () => {
    Alert.alert(
      "Contato de Suporte",
      "Envie um email para nossa equipe de suporte",
      [
        {
          text: "Enviar Email",
          onPress: () => {
            Linking.openURL("mailto:suporte@telegramclone.com");
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const handleFAQ = () => {
    Alert.alert("FAQ", "Seção de Perguntas Frequentes - Em breve");
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, isDarkTheme && styles.contentDark]}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Suporte</Text>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]} onPress={handleContactSupport}>
            <View style={styles.helpLeft}>
              <Ionicons name="mail-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Entre em Contato com o Suporte</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Envie um email para nossa equipe</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]} onPress={handleFAQ}>
            <View style={styles.helpLeft}>
              <Ionicons name="help-circle-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Perguntas Frequentes</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Encontre respostas rápidas</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Recursos</Text>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]}>
            <View style={styles.helpLeft}>
              <Ionicons name="book-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Como Usar o App</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Guia de funcionalidades</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]}>
            <View style={styles.helpLeft}>
              <Ionicons name="shield-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Dicas de Segurança</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Mantenha sua conta segura</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.sectionTitleDark]}>Comunidade</Text>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]}>
            <View style={styles.helpLeft}>
              <Ionicons name="people-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Comunidade Online</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Junte-se a nossa comunidade</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.helpItem, isDarkTheme && styles.helpItemDark]}>
            <View style={styles.helpLeft}>
              <Ionicons name="megaphone-outline" size={24} color="#2AABEE" />
              <View style={styles.helpInfo}>
                <Text style={[styles.helpName, isDarkTheme && styles.helpNameDark]}>Envie um Feedback</Text>
                <Text style={[styles.helpDescription, isDarkTheme && styles.helpDescriptionDark]}>Nos ajude a melhorar</Text>
              </View>
            </View>
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
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  helpLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  helpInfo: {
    flex: 1,
  },
  helpName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  helpDescription: {
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
  helpItemDark: {
    borderBottomColor: "#333333",
  },
  helpNameDark: {
    color: "#ffffff",
  },
  helpDescriptionDark: {
    color: "#aaaaaa",
  },
});
