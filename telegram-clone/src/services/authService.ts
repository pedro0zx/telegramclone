import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";
import {
  createCometChatUser,
  loginCometChat,
  logoutCometChat
} from "./cometchat";

export const register = async (email: string, password: string) => {
  // Criar usuário Firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  // Criar usuário no CometChat
  await createCometChatUser(uid, email);

  // Login no CometChat
  await loginCometChat(uid, email);

  return userCredential.user;
};

export const login = async (email: string, password: string) => {
  // Login Firebase
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  // Login CometChat
  await loginCometChat(uid, email);

  return userCredential.user;
};

export const logout = async () => {
  await logoutCometChat();
  await signOut(auth);
};