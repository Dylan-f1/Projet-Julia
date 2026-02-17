# 🚀 Guide de Démarrage Rapide - Julia App Frontend

## ⚡ Installation rapide (5 minutes)

### 1. Prérequis

Assurez-vous d'avoir installé :
- **Node.js** (v18+) : [nodejs.org](https://nodejs.org)
- **npm** ou **yarn**
- **Expo CLI** : `npm install -g expo-cli`
- **Expo Go** app sur votre téléphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 2. Installation

```bash
# Cloner ou télécharger le projet
cd julia-app-frontend

# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

### 3. Configuration

Modifier `src/config/environment.js` :

```javascript
const ENV = {
  dev: {
    apiUrl: 'http://192.168.1.X:3000/api',  // ⚠️ REMPLACER par votre IP locale
    wsUrl: 'ws://192.168.1.X:3000'
  },
  // ...
}
```

**Comment trouver votre IP locale ?**

- **Mac/Linux** : `ifconfig | grep inet`
- **Windows** : `ipconfig`
- Cherchez quelque chose comme `192.168.1.X` ou `10.0.0.X`

### 4. Lancer l'app

```bash
npm start
# Ou
expo start
```

Un QR code apparaîtra dans le terminal et dans votre navigateur.

### 5. Tester sur votre téléphone

1. Ouvrez **Expo Go** sur votre téléphone
2. Scannez le QR code
   - **iOS** : Utilisez l'appareil photo natif
   - **Android** : Utilisez le scanner dans Expo Go
3. L'app se charge ! 🎉

## 📱 Comptes de test

### Patient
- Email : `patient@test.com`
- Méthode : Magic Link (check votre email)

### Thérapeute
- Email : `therapist@test.com`
- Password : `password123`

## 🎯 Premiers tests

### Test 1 : Chat patient
1. Connexion patient
2. Aller sur l'écran Chat
3. Envoyer un message : "Bonjour Julia"
4. Attendre la réponse de l'IA

### Test 2 : Dashboard thérapeute
1. Connexion thérapeute
2. Voir la liste des patients
3. Cliquer sur un patient
4. Consulter ses conversations

### Test 3 : Évaluation quotidienne
1. Connexion patient
2. Aller sur Évaluation
3. Remplir le formulaire
4. Soumettre

## 🔧 Commandes utiles

```bash
# Démarrer le projet
npm start

# Démarrer avec cache clear
npm start -- --clear

# Lancer sur Android
npm run android

# Lancer sur iOS (Mac uniquement)
npm run ios

# Installer une nouvelle dépendance
npm install <package-name>

# Build de production
eas build --platform all
```

## 🐛 Dépannage

### Le QR code ne marche pas
- Vérifiez que téléphone et ordinateur sont sur le **même réseau WiFi**
- Désactivez les VPN et pare-feu
- Utilisez le mode Tunnel : `expo start --tunnel`

### Erreur "Network request failed"
- Vérifiez l'URL de l'API dans `environment.js`
- Vérifiez que le backend est lancé
- Testez l'URL dans le navigateur : `http://YOUR_IP:3000/api/health`

### L'app ne se met pas à jour
```bash
# Clear cache et redémarrer
expo start -c
```

### Erreur NativeWind
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm start -- --clear
```

## 📂 Structure rapide

```
julia-app-frontend/
├── app/                      # Routes (Expo Router)
│   ├── index.js             # Point d'entrée
│   ├── auth/                # Écrans connexion
│   ├── patient/             # Écrans patient
│   └── therapist/           # Écrans thérapeute
├── src/
│   ├── components/          # Composants réutilisables
│   ├── contexts/            # State management (Context API)
│   ├── services/            # API calls
│   ├── screens/             # Écrans de l'app
│   └── config/              # Configuration
├── package.json
└── README.md
```

## 🎨 Modifier l'apparence

### Couleurs (tailwind.config.js)
```javascript
theme: {
  extend: {
    colors: {
      primary: { 500: '#0ea5e9' },  // Bleu principal
      secondary: { 500: '#d946ef' }, // Violet
      accent: { 500: '#22c55e' },    // Vert
    }
  }
}
```

### Logo et splash screen
- Remplacer `assets/icon.png` (1024x1024)
- Remplacer `assets/splash.png` (1284x2778)

## 📚 Prochaines étapes

1. **Lire le README.md** pour une vue complète
2. **Consulter ARCHITECTURE.md** pour comprendre le code
3. **Tester toutes les fonctionnalités**
4. **Personnaliser selon vos besoins**

## 🆘 Besoin d'aide ?

- **Documentation Expo** : [docs.expo.dev](https://docs.expo.dev)
- **React Native** : [reactnative.dev](https://reactnative.dev)
- **NativeWind** : [nativewind.dev](https://www.nativewind.dev)

## ✨ Fonctionnalités disponibles

- Authentification (Magic Link + Email/Password)
- Chat avec IA 24/7
- Historique des conversations
- Évaluation quotidienne
- Dashboard thérapeute
- Gestion des patients
- Notifications push
- Upload de fichiers (notes de séance)

## 🎉 C'est parti !

Vous êtes prêt à développer ! N'hésitez pas à explorer le code et à l'adapter à vos besoins.

**Happy coding! 🚀**
