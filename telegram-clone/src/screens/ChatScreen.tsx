import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

type RootStackParamList = {
  ChatList: undefined;
  Chat: { chatId: string; chatName: string };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;

export default function ChatScreen() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<ChatScreenRouteProp>();
    const { chatId, chatName } = route.params;
    const { isDarkTheme } = useContext(ThemeContext);

    useEffect(() => {
        const listenerID = "CHAT_LISTENER";

        CometChat.addMessageListener(listenerID, new CometChat.MessageListener({
            onTextMessageReceived: (msg: CometChat.TextMessage) => {
                setMessages(prev => [...prev, msg]);
            }
        }));

        return () => {
            CometChat.removeMessageListener(listenerID);
        };
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;
        
        const textMessage = new CometChat.TextMessage(
            chatId, 
            message, 
            CometChat.RECEIVER_TYPE.USER
        );
        CometChat.sendMessage(textMessage);
        setMessages(prev => [...prev, { id: Date.now().toString(), text: message, isOwn: true }]);
        setMessage("");   
    };

    const renderMessage = ({ item }: { item: any }) => (
        <View style={[styles.messageBubble, item.isOwn ? styles.ownMessage : styles.otherMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
            <View style={[styles.header, isDarkTheme && styles.headerDark]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{chatName}</Text>
                <View style={{ width: 40 }} />
            </View>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                style={styles.list}
                contentContainerStyle={styles.listContent}
            />
            <View style={[styles.inputContainer, isDarkTheme && styles.inputContainerDark]}>
                <TextInput
                    style={[styles.input, isDarkTheme && styles.inputDark]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Digite uma mensagem..."
                    placeholderTextColor={isDarkTheme ? "#666666" : "#999999"}
                />
                <Button title="Enviar" onPress={sendMessage} />
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
        padding: 15,
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerDark: {
        backgroundColor: "#1a1a1a",
    },
    headerTitle: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    backButton: {
        padding: 5,
    },
    logoutButton: {
        padding: 5,
    },
    list: {
        flex: 1,
    },
    listContent: {
        padding: 10,
    },
    messageBubble: {
        maxWidth: "80%",
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
    },
    ownMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#2AABEE",
        borderBottomRightRadius: 2,
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#e0e0e0",
        borderBottomLeftRadius: 2,
    },
    messageText: {
        color: "#000000",
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
    },
    inputContainerDark: {
        borderTopColor: "#333333",
        backgroundColor: "#1a1a1a",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    inputDark: {
        borderColor: "#333333",
        color: "#ffffff",
        backgroundColor: "#2a2a2a",
    },
});

