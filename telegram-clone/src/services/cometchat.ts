import { CometChat } from "@cometchat/chat-sdk-react-native";

const appID = "16759112f9bedd90d";
const region = "us";

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();

export const initCometChat = async () => {
  await CometChat.init(appID, appSetting);
};

export const createCometChatUser = async (uid: string, name: string) => {
    const user = new CometChat.User(uid);
    user.setName(name);
    await CometChat.createUser(user, "92384077b3684abebb027650b55f2c1ca5ab4ff6");
};

export const loginCometChat = async (uid: string, name: string) => {
    await CometChat.login(uid, "92384077b3684abebb027650b55f2c1ca5ab4ff6")
};


export const logoutCometChat = async () => {
    await CometChat.logout();
};
