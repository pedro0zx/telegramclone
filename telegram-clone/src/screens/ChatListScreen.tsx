import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../App";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContacts, Contact } from "../contexts/ContactContext";

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

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const mockChats: Chat[] = [
  { id: "1", name: "Ricardo Souza", lastMessage: "Olá, tudo bem?", time: "10:30", unreadCount: 3 },
  { id: "2", name: "Clara Saraiva", lastMessage: "Vamos combinar o encontro?", time: "09:15", unreadCount: 1 },
  { id: "3", name: "Maria Silva", lastMessage: "Enviei as fotos!", time: "Ontem", unreadCount: 0 },
  { id: "4", name: "João Oliveira", lastMessage: "O filme foi ótimo", time: "Ontem", unreadCount: 5 },
  { id: "5", name: "Ana Costa", lastMessage: "A reunião foi adiada", time: "Terça", unreadCount: 0 },
  { id: "6", name: "Pedro Santos", lastMessage: "Parabéns pelo trabalho!", time: "Seg", unreadCount: 2 },
  { id: "7", name: "Carla Lima", lastMessage: "Obrigado pelo presente!", time: "Dom", unreadCount: 0 },
  { id: "8", name: "Daniel Rocha", lastMessage: "Vamos jogar?", time: "Dom", unreadCount: 12 },
];

export default function ChatListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const { contacts } = useContacts();
  const [searchText, setSearchText] = useState("");

  // Convert contacts to chat format for display
  const contactChats: Chat[] = contacts.map((contact: Contact) => ({
    id: contact.id,
    name: contact.name,
    lastMessage: contact.phone,
    time: "",
    unreadCount: 0,
  }));

  // Combine mock chats with real contacts
  const allChats = [...mockChats, ...contactChats];

  const filteredChats = allChats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChat = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      style={[styles.chatItem, isDarkTheme && styles.chatItemDark]}
      onPress={() => navigation.navigate("Chat", { chatId: item.id, chatName: item.name })}
    >
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, isDarkTheme ? styles.chatNameDark : undefined]}>
            {item.name}
          </Text>
          <Text style={[styles.chatTime, isDarkTheme && styles.chatTimeDark]}>{item.time}</Text>
        </View>
        <View style={styles.lastMessageRow}>
          <Text style={[styles.lastMessage, isDarkTheme && styles.lastMessageDark]} numberOfLines={1}>{item.lastMessage}</Text>
          {item.unreadCount && item.unreadCount > 0 && (
            <View style={styles.notificationBadgeBelow}>
              <Text style={styles.notificationText}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <View style={[styles.header, isDarkTheme && styles.headerDark]}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={[styles.searchContainer, isDarkTheme && styles.searchContainerDark]}>
        <Ionicons name="search" size={20} color="#888888" style={styles.searchIcon} />
        <View style={styles.searchInputContainer}>
          <TextInput
              style={[
                styles.searchInput,
                isDarkTheme && styles.searchInputDark,
                Platform.OS === 'web'
                ? { outlineWidth: 0, outlineColor: "transparent" }
                : {},
              ]}
              placeholder="Pesquisar contatos..."
              placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
              value={searchText}
              onChangeText={setSearchText}
              underlineColorAndroid="transparent"
              selectionColor="transparent"
          />
        </View>
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color="#888888" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredChats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>
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
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  headerDark: {
    backgroundColor: "#1a1a1a",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 5,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  list: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  searchContainerDark: {
    backgroundColor: "#2a2a2a",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 0,
  },
  searchInputDark: {
    color: "#ffffff",
  },
  chatItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  chatItemDark: {
    borderBottomColor: "#333333",
  },
  avatarWrapper: {
    position: "relative",
    width: 50,
    height: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#2AABEE",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  notificationBadgeBelow: {
    marginLeft: 8,
    backgroundColor: "#2AABEE",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
    alignSelf: "flex-end",
  },
  lastMessageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  notificationText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  unreadChat: {
    fontWeight: "700",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatInfo: {
    flex: 1,
    marginLeft: 10,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  chatNameDark: {
    color: "#ffffff",
  },
  chatTime: {
    fontSize: 12,
    color: "#888888",
  },
  chatTimeDark: {
    color: "#aaaaaa",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  lastMessageDark: {
    color: "#cccccc",
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    paddingVertical: 8,
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

