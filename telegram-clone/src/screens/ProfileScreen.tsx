import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../App";
import { ThemeContext } from "../contexts/ThemeContext";
import { useUserProfile } from "../contexts/UserProfileContext";

type RootStackParamList = {
  ChatList: undefined;
  Chat: { chatId: string; chatName: string };
  AddContact: undefined;
  Profile: undefined;
  Notifications: undefined;
  Privacy: undefined;
  Help: undefined;
  About: undefined;
  Login: undefined;
  Register: undefined;
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { userProfile, updateUserProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserName, setTempUserName] = useState(userProfile?.name || "");
  const [tempUserPhone, setTempUserPhone] = useState(userProfile?.phone || "");
  const [tempUserBio, setTempUserBio] = useState(userProfile?.bio || "");

  const handleEditPress = () => {
    setIsEditing(true);
    setTempUserName(userProfile?.name || "");
    setTempUserPhone(userProfile?.phone || "");
    setTempUserBio(userProfile?.bio || "");
  };

  const handleSaveChanges = () => {
    updateUserProfile({
      name: tempUserName,
      phone: tempUserPhone,
      bio: tempUserBio,
    });
    setIsEditing(false);
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.profileSection, isDarkTheme && styles.profileSectionDark]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userProfile?.name?.charAt(0) || "U"}</Text>
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {!isEditing ? (
            <>
              <Text style={[styles.nameText, isDarkTheme && styles.nameTextDark]}>{userProfile?.name || "Usuário"}</Text>
              <Text style={[styles.phoneText, isDarkTheme && styles.phoneTextDark]}>{userProfile?.phone || "Telefone não informado"}</Text>
              <Text style={[styles.bioText, isDarkTheme && styles.bioTextDark]}>{userProfile?.bio || "Bio não informada"}</Text>

              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditPress}
              >
                <Ionicons name="pencil" size={20} color="#ffffff" />
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.editForm}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDarkTheme && styles.labelDark]}>Nome</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isDarkTheme && styles.inputDark,
                      Platform.OS === 'web' ? { outlineWidth: 0, outlineColor: 'transparent' } : {},
                    ]}
                    value={tempUserName}
                    onChangeText={setTempUserName}
                    placeholder="Seu nome"
                    placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDarkTheme && styles.labelDark]}>Telefone</Text>
                  <TextInput
                    style={[
                      styles.input,
                      isDarkTheme && styles.inputDark,
                      Platform.OS === 'web' ? { outlineWidth: 0, outlineColor: 'transparent' } : {},
                    ]}
                    value={tempUserPhone}
                    onChangeText={setTempUserPhone}
                    placeholder="Seu telefone"
                    placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={[styles.label, isDarkTheme && styles.labelDark]}>Bio</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.bioInput,
                      isDarkTheme && styles.inputDark,
                      Platform.OS === 'web' ? { outlineWidth: 0, outlineColor: 'transparent' } : {},
                    ]}
                    value={tempUserBio}
                    onChangeText={setTempUserBio}
                    placeholder="Sua bio"
                    placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View style={styles.buttonGroup}>
                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSaveChanges}
                  >
                    <Ionicons name="checkmark" size={20} color="#ffffff" />
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Ionicons name="close" size={20} color="#ffffff" />
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={[styles.settingsSection, isDarkTheme && styles.settingsSectionDark]}>
          <TouchableOpacity 
            style={[styles.settingItem, isDarkTheme && styles.settingItemDark]}
            onPress={() => setIsDarkTheme(!isDarkTheme)}
          >
            <Ionicons name={isDarkTheme ? "sunny" : "moon"} size={24} color="#2AABEE" />
            <Text style={[styles.settingText, isDarkTheme && styles.settingTextDark]}>
              {isDarkTheme ? "Tema Claro" : "Tema Escuro"}
            </Text>
            {isDarkTheme && <Ionicons name="checkmark" size={24} color="#2AABEE" />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, isDarkTheme && styles.settingItemDark]}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications" size={24} color="#2AABEE" />
            <Text style={[styles.settingText, isDarkTheme && styles.settingTextDark]}>Notificações</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, isDarkTheme && styles.settingItemDark]}
            onPress={() => navigation.navigate("Privacy")}
          >
            <Ionicons name="lock-closed" size={24} color="#2AABEE" />
            <Text style={[styles.settingText, isDarkTheme && styles.settingTextDark]}>Privacidade e Segurança</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, isDarkTheme && styles.settingItemDark]}
            onPress={() => navigation.navigate("Help")}
          >
            <Ionicons name="help-circle" size={24} color="#2AABEE" />
            <Text style={[styles.settingText, isDarkTheme && styles.settingTextDark]}>Ajuda e Suporte</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, isDarkTheme && styles.settingItemDark]}
            onPress={() => navigation.navigate("About")}
          >
            <Ionicons name="information-circle" size={24} color="#2AABEE" />
            <Text style={[styles.settingText, isDarkTheme && styles.settingTextDark]}>Sobre</Text>
            <Ionicons name="chevron-forward" size={24} color={isDarkTheme ? "#555555" : "#cccccc"} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, styles.logoutItem, isDarkTheme && styles.settingItemDark]}
            onPress={handleLogout}
          >
            <Ionicons name="exit" size={24} color="#FF4444" />
            <Text style={[styles.settingText, styles.logoutText]}>Sair da Conta</Text>
            <View />
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
    paddingHorizontal: 15,
    paddingTop: 50,
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
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2AABEE",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 14,
    color: "#888888",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: "#2AABEE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  editForm: {
    width: "85%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#f9f9f9",
  },
  bioInput: {
    textAlignVertical: "top",
    paddingVertical: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  settingsSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    marginLeft: 15,
  },
  logoutItem: {
    borderBottomWidth: 0,
    marginTop: 20,
  },
  logoutText: {
    color: "#FF4444",
    fontWeight: "600",
  },
  // Estilos Dark Theme
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  headerDark: {
    backgroundColor: "#1a1a1a",
  },
  profileSectionDark: {
    borderBottomColor: "#333333",
  },
  nameTextDark: {
    color: "#ffffff",
  },
  phoneTextDark: {
    color: "#aaaaaa",
  },
  bioTextDark: {
    color: "#cccccc",
  },
  labelDark: {
    color: "#ffffff",
  },
  inputDark: {
    backgroundColor: "#262626",
    borderColor: "#333333",
    color: "#ffffff",
  },
  settingsSectionDark: {
    backgroundColor: "#1a1a1a",
  },
  settingItemDark: {
    borderBottomColor: "#333333",
  },
  settingTextDark: {
    color: "#ffffff",
  },
});
