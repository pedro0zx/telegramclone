import React, { useEffect, useState} from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";

export default function ChatScreen({ route }: any) {
    const { uid } = route.params;
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);

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
        const textMessage = new CometChat.TextMessage(uid, message, CometChat.RECEIVER_TYPE.USER);
        CometChat.sendMessage(textMessage);
        setMessage("");   
    };

    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text>{item.text}</Text>}
                keyExtractor={item => item.id}
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
            />
            <Button title="Enviar" onPress={sendMessage} />
        </View>
    );  
}