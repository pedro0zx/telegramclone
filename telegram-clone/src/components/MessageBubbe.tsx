import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageBubbleProps {
    message: string;
    isSentByCurrentUser: boolean;
}

export default function MessageBubble({ message, isSentByCurrentUser }: MessageBubbleProps) {
    return (
        <View
            style={[
                styles.bubble,
                isSentByCurrentUser ? styles.sentBubble : styles.receivedBubble,
            ]}
        >
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        maxWidth: "80%",
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
    },
    sentBubble: {
        alignSelf: "flex-end",
        backgroundColor: "#2AABEE",
        borderBottomRightRadius: 2,
    },
    receivedBubble: {
        alignSelf: "flex-start",
        backgroundColor: "#e0e0e0",
        borderBottomLeftRadius: 2,
    },
    messageText: {
        color: "#000000",
        fontSize: 16,
    },
});