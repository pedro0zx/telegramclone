import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContacts } from "../contexts/ContactContext";
import { ThemeContext } from "../contexts/ThemeContext";

type RootStackParamList = {
  ChatList: undefined;
  AddContact: undefined;
  Chat: { chatId: string; chatName: string };
};

export default function AddContactScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addContact } = useContacts();
  const { isDarkTheme } = useContext(ThemeContext);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleAddContact = () => {
    if (!contactName.trim()) {
      Alert.alert("Erro", "Por favor, digite um nome para o contato");
      return;
    }
    if (!contactPhone.trim()) {
      Alert.alert("Erro", "Por favor, digite um telefone para o contato");
      return;
    }

    addContact(contactName.trim(), contactPhone.trim());

    // Navigate back to ChatList after adding contact
    navigation.navigate("ChatList");
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Contato</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-add" size={44} color="#ffffff" />
          </View>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputContainer, isDarkTheme && styles.inputContainerDark]}>
            <Ionicons name="person-outline" size={20} color="#2AABEE" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  isDarkTheme && styles.inputDark,
                  Platform.OS === "web" ? { outlineWidth: 0, outlineColor: "transparent" } : {},
                ]}
                placeholder="Nome do contato"
                placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                value={contactName}
                onChangeText={setContactName}
                underlineColorAndroid="transparent"
                selectionColor="transparent"
              />
            </View>
          </View>

          <View style={[styles.inputContainer, isDarkTheme && styles.inputContainerDark]}>
            <Ionicons name="call-outline" size={20} color="#2AABEE" style={styles.inputIcon} />
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  isDarkTheme && styles.inputDark,
                  Platform.OS === 'web' ? { outlineWidth: 0, outlineColor: 'transparent' } : {},
                ]}
                placeholder="Telefone"
                placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                keyboardType="phone-pad"
                value={contactPhone}
                onChangeText={setContactPhone}
                underlineColorAndroid="transparent"
                selectionColor="transparent"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
            <Text style={styles.addButtonText}>Adicionar Contato</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
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
  headerDark: {
    backgroundColor: "#1a1a1a",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
    backgroundColor: "#2AABEE",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  inputContainerDark: {
    borderBottomColor: "#333333",
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    paddingVertical: 8,
  },
  inputDark: {
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#2AABEE",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

