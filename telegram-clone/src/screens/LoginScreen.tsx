import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // O navigation será tratado automaticamente pelo App.tsx via Firebase Auth
            // Limpar os campos
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Ionicons name="person" size={40} color="#ffffff" />
                <Text style={styles.title}>LOGIN</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity 
                style={[styles.button, isHovered && styles.buttonHover]} 
                onPress={handleLogin}
                onPressIn={() => setIsHovered(true)}
                onPressOut={() => setIsHovered(false)}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.registerButton} 
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={styles.registerText}>Não tem conta? Cadastre-se</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>telegram clone, apenas para meios educacionais!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2AABEE",
        flex: 1,
        justifyContent: "center",
        padding: 16,
        
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 120,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
        marginLeft: 10,
    },
    input: {
        height: 40,
        width: "70%",
        justifyContent: "center",
        alignSelf: "center",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    button: {
        backgroundColor: "#0088cc",
        justifyContent: "center",
        alignSelf: "center",
        width: "70%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",

    },
    buttonHover: {
        backgroundColor: "#015281",
        transform: [{ scale: 2.0 }],
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerButton: {
        marginTop: 20,
        alignItems: "center",
    },
    registerText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#ffffff",
        fontSize: 12,
        opacity: 0.8,
    },
    
});
