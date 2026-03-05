import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../App";

type RootStackParamList = {
  ChatList: undefined;
  Chat: { chatId: string; chatName: string };
};

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}

const chats: Chat[] = [
  { id: "1", name: "Chat 1", lastMessage: "Olá, tudo bem?", time: "10:30" },
  { id: "2", name: "Chat 2", lastMessage: "Vamos combinar o encontro?", time: "09:15" },
  { id: "3", name: "Chat 3", lastMessage: "Enviei as fotos!", time: "Ontem" },
  { id: "4", name: "Chat 4", lastMessage: "O filme foi ótimo", time: "Ontem" },
  { id: "5", name: "Chat 5", lastMessage: "A reunião foi adiada", time: "Terça" },
  { id: "6", name: "Chat 6", lastMessage: "Parabéns pelo trabalho!", time: "Seg" },
  { id: "7", name: "Chat 7", lastMessage: "Obrigado pelo presente!", time: "Dom" },
  { id: "8", name: "Chat 8", lastMessage: "Vamos jogar?", time: "Dom" },
];

export default function ChatListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const renderChat = ({ item }: { item: Chat }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { chatId: item.id, chatName: item.name })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="exit-outline" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={item => item.id}
        style={styles.list}
      />
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
    padding: 15,
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
  logoutButton: {
    padding: 5,
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2AABEE",
    justifyContent: "center",
    alignItems: "center",
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
  chatTime: {
    fontSize: 12,
    color: "#888888",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
});

