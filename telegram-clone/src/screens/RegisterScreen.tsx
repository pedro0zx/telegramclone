import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { register } from '../services/authService';
import { auth } from '../services/firebase';
import { updateProfile } from 'firebase/auth';

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    const handleRegister = async () => {
        if (!name.trim()) {
            Alert.alert("Erro", "Por favor, digite seu nome");
            return;
        }
        if (!email.trim()) {
            Alert.alert("Erro", "Por favor, digite seu email");
            return;
        }
        if (!password.trim()) {
            Alert.alert("Erro", "Por favor, digite uma senha");
            return;
        }

        try {
            const userCredential = await register(email, password);
            
            // Update user profile with name
            if (userCredential) {
                await updateProfile(userCredential, {
                    displayName: name
                });
            }

            // Clear the fields after successful registration
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            
            // Navigate to login
            navigation.replace('Login');
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao realizar cadastro. Verifique os dados e tente novamente.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Ionicons name="person-add" size={40} color="white" />
                <Text style={styles.title}>CADASTRO</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Nome completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity 
                style={[styles.button, isHovered && styles.buttonHover]} 
                onPress={handleRegister}
                onPressIn={() => setIsHovered(true)}
                onPressOut={() => setIsHovered(false)}
            >
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.loginButton} 
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.loginText}>Já tem conta? Faça login</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>telegram clone, apenas para meios educacionais!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2AABEE",
        flex: 1,
        justifyContent: 'center',
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
        backgroundColor: "#ffffff",
        height: 40,
        width: "70%",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: "#0088cc",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "70%",
    },
    buttonHover: {
        backgroundColor: "#015281",
        transform: [{ scale: 1.05 }],
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginButton: {
        marginTop: 20,
        alignItems: "center",
    },
    loginText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
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

