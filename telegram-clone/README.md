# Telegram Clone 📱

Um aplicativo de mensagens móveis construído com React Native e Expo, replicando funcionalidades básicas do Telegram com autenticação Firebase e chat em tempo real.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Configuração Adicional](#configuração-adicional)
- [Resolução de Problemas](#resolução-de-problemas)
- [Contribuição](#contribuição)

---

## 📱 Sobre o Projeto

Este é um clone do Telegram desenvolvido com React Native e Expo. O aplicativo inclui:

- 🔐 **Autenticação**: Login e registro de usuários via Firebase Authentication
- 💬 **Mensagens**: Chat em tempo real utilizando CometChat
- 👥 **Contatos**: Gerenciamento de contatos
- 🎨 **Temas**: Suporte a temas claro e escuro
- 👤 **Perfil**: Gerenciamento de perfil do usuário

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Expo | ~55.0.2 | Framework para React Native |
| React Native | 0.83.2 | Framework mobile cross-platform |
| React | 19.2.0 | Biblioteca de UI |
| Firebase | ^12.9.0 | Autenticação e backend |
| CometChat | ^4.0.19 | Chat em tempo real |
| React Navigation | ^7.1.31 | Navegação entre telas |
| TypeScript | ~5.9.2 | Superset JavaScript tipado |
| AsyncStorage | ^2.2.0 | Armazenamento local |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 18 ou superior)
   - [Download Node.js](https://nodejs.org/)

2. **npm** ou **yarn** (gerenciador de pacotes)
   - npm já vem com o Node.js

3. **Expo CLI** (opcional, pode usar npx)
   ```bash
   npm install -g expo-cli
   ```

4. **Expo Go** (no seu dispositivo móvel) ou **Emulador Android/iOS**

5. **Java Development Kit (JDK)** (para Android)
   - Recomendado: JDK 17 ou superior
   - [Download JDK](https://www.oracle.com/java/technologies/downloads/)

6. **Android Studio** (para emulador Android - opcional)
   - [Download Android Studio](https://developer.android.com/studio)

---

## 🚀 Instalação

Siga estes passos para configurar o ambiente de desenvolvimento:

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd telegram-clone
```

### 2. Acesse o Diretório do Projeto

```bash
cd telegram-clone
```

### 3. Instale as Dependências

Utilize npm ou yarn:

**Com npm:**
```bash
npm install
```

**Com yarn:**
```bash
yarn install
```

### 4. Configure o Firebase (Opcional)

O projeto já vem configurado com um projeto Firebase existente. Se você quiser usar sua própria instância:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto
3. Ative a **Authentication** (Email/Senha)
4. Copie as configurações do Firebase em `src/services/firebase.ts`

### 5. Configure o CometChat (Opcional)

O projeto já vem configurado com o CometChat. Para alterar:

1. Acesse [CometChat Dashboard](https://www.cometchat.com/)
2. Crie uma conta e um app
3. Atualize as configurações em `src/services/cometchat.ts`

---

## ▶️ Executando o Projeto

### Opção 1: Expo Go (Recomendado para Desenvolvimento)

1. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
expo start
```

2. No terminal, você verá um QR Code

3. No seu dispositivo móvel:
   - Baixe o **Expo Go** da App Store (iOS) ou Google Play (Android)
   - Escaneie o QR Code exibido no terminal

### Opção 2: Emulador Android

1. Inicie o Android Studio e configure um emulador

2. Execute:
```bash
npm run android
# ou
expo run:android
```

### Opção 3: Emulador iOS (macOS apenas)

1. Execute:
```bash
npm run ios
# ou
expo run:ios
```

### Opção 4: Web

```bash
npm run web
# ou
expo start --web
```

---

## 📂 Estrura do Projeto

```
telegram-clone/
├── App.tsx                 # Componente principal da aplicação
├── index.ts               # Ponto de entrada
├── app.json               # Configurações do Expo
├── package.json           # Dependências do projeto
├── tsconfig.json          # Configurações do TypeScript
├── assets/                # Imagens e ícones
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
└── src/
    ├── components/        # Componentes reutilizáveis
    │   └── MessageBubbe.tsx
    ├── contexts/          # Contextos React
    │   ├── ThemeContext.tsx        # Gerenciamento de tema
    │   ├── ContactContext.tsx      # Gerenciamento de contatos
    │   └── UserProfileContext.tsx  # Gerenciamento de perfil
    ├── navigation/        # Navegação da aplicação
    │   └── RootNavigation.tsx
    ├── screens/           # Telas da aplicação
    │   ├── LoginScreen.tsx         # Tela de login
    │   ├── RegisterScreen.tsx      # Tela de registro
    │   ├── ChatListScreen.tsx      # Lista de chats
    │   ├── ChatScreen.tsx          # Tela de chat
    │   ├── AddContactScreen.tsx    # Adicionar contato
    │   ├── ProfileScreen.tsx       # Perfil do usuário
    │   ├── NotificationsScreen.tsx # Notificações
    │   ├── PrivacyScreen.tsx       # Privacidade
    │   ├── HelpScreen.tsx          # Ajuda
    │   └── AboutScreen.tsx         # Sobre
    └── services/          # Serviços externos
        ├── firebase.ts            # Configuração Firebase
        ├── authService.ts         # Serviços de autenticação
        └── cometchat.ts           # Configuração CometChat
```

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Registro de novos usuários com email e senha
- Login com email e senha
- Logout
- Persistência de sessão

### 💬 Mensagens
- Envio e recebimento de mensagens em tempo real
- Visualização de conversas
- bubbles de mensagem estilizadas

### 👥 Contatos
- Adicionar novos contatos
- Lista de contatos
- Gerenciamento de contatos

### ⚙️ Configurações
- Perfil do usuário
- Configurações de notificação
- Privacidade
- Ajuda
- Sobre o aplicativo

### 🎨 Temas
- Tema claro
- Tema escuro
- Alternância entre temas

---

## ⚙️ Configuração Adicional

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Firebase
EXPO_FIREBASE_API_KEY=sua_api_key
EXPO_FIREBASE_AUTH_DOMAIN=seu_dominio.firebaseapp.com
EXPO_FIREBASE_PROJECT_ID=seu_project_id
EXPO_FIREBASE_STORAGE_BUCKET=seu_bucket.firebasestorage.app
EXPO_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_FIREBASE_APP_ID=seu_app_id

# CometChat
COMETCHAT_APP_ID=seu_app_id
COMETCHAT_API_KEY=sua_api_key
COMETCHAT_REGION=sua_regiao
```

### Build para Produção

#### Android (APK)
```bash
eas build -p android --profile preview
```

#### iOS
```bash
eas build -p ios --profile preview
```

---

## 🔧 Resolução de Problemas

### Erro de Instalação de Dependências

Se houver problemas ao instalar dependências:

```bash
# Limpe o cache
npm cache clean --force

# Remova node_modules e reinstale
rm -rf node_modules
npm install
```

### Erro no Expo Go

Se o Expo Go não carregar o app:

1. Pare o servidor (Ctrl+C)
2. Delete a pasta `.expo`
3. Reinicie o servidor:
```bash
npm start
```

### Problemas com Firebase

Se a autenticação não funcionar:

1. Verifique se o Firebase Authentication está habilitado no console
2. Confirme que o email/senha está como método de autenticação
3. Verifique as configurações em `src/services/firebase.ts`

### Problemas com CometChat

Se o chat não funcionar:

1. Verifique as credenciais em `src/services/cometchat.ts`
2. Confirme que o App ID está correto
3. Verifique a região configurada

### Erro de Build no Android

Se ocorrer erro ao buildar para Android:

1. Configure as variáveis de ambiente do Android SDK
2. No Windows:
```cmd
set ANDROID_HOME=C:\Users\seu_usuario\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools
```

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de uso estritamente educacional e não possui licença para uso comercial. Sinta-se livre para estudar, modificar e aprender com o código.

Desenvolvido com fins educacionais para aprendizado de React Native, Expo, Firebase e CometChat.

---

## 📞 Suporte

Se você encontrar algum problema, por favor, abra uma issue no repositório.

---

**Desenvolvido com ❤️ utilizando React Native e Expo**

