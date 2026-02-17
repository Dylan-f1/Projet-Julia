# Julia App - Frontend (React Native + Expo)

Application mobile de suivi thérapeutique permettant aux patients de communiquer avec un chatbot IA 24/7 et aux thérapeutes de suivre leurs patients.

## 📋 Architecture

### Structure du projet

```
julia-app-frontend/
├── app/                          # Routes Expo Router
│   ├── _layout.js               # Layout racine avec providers
│   ├── index.js                 # Page d'accueil (routing)
│   ├── auth/                    # Écrans d'authentification
│   ├── patient/                 # Écrans patients
│   └── therapist/               # Écrans thérapeutes
├── src/
│   ├── components/              # Composants réutilisables
│   │   ├── common/             # Composants communs (Button, Input, Card...)
│   │   └── chat/               # Composants de chat
│   ├── contexts/               # Contextes React
│   │   ├── AuthContext.js      # Gestion authentification
│   │   └── ChatContext.js      # Gestion chat
│   ├── screens/                # Écrans de l'application
│   │   ├── patient/            # Écrans patients
│   │   └── therapist/          # Écrans thérapeutes
│   ├── services/               # Services API
│   │   ├── api.js              # Configuration Axios
│   │   ├── authService.js      # Service d'authentification
│   │   ├── chatService.js      # Service de chat
│   │   ├── patientService.js   # Service patients (thérapeute)
│   │   ├── evaluationService.js # Service évaluations
│   │   ├── sessionNoteService.js # Service notes de séance
│   │   └── notificationService.js # Service notifications push
│   ├── config/
│   │   └── environment.js      # Configuration environnements
│   └── utils/                  # Utilitaires
├── assets/                     # Images, icônes, fonts
├── package.json
├── tailwind.config.js
├── babel.config.js
└── app.json
```

## 🚀 Technologies utilisées

- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **Expo Router** - Navigation file-based
- **NativeWind (Tailwind CSS)** - Styling
- **Context API** - Gestion d'état
- **Axios** - Requêtes HTTP
- **Expo Notifications** - Notifications push
- **Expo SecureStore** - Stockage sécurisé (tokens)
- **date-fns** - Manipulation de dates

## 📱 Fonctionnalités

### Pour les patients :
- Connexion par Magic Link (email)
- Chat 24/7 avec IA (Julia)
- Historique des conversations
- Évaluation quotidienne (humeur, anxiété, sommeil)
- Notifications push

### Pour les thérapeutes :
- Connexion email/password
- Dashboard avec liste des patients
- Vue détaillée par patient
- Historique des conversations
- Statistiques et évaluations
- Upload de notes de séance (OCR)
- Détection de situations critiques

## 🔧 Installation

1. **Cloner le projet**
```bash
git clone <repo-url>
cd julia-app-frontend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
Modifier `src/config/environment.js` avec l'URL de votre backend :
```javascript
const ENV = {
  dev: {
    apiUrl: 'http://YOUR_IP:3000/api',  // Remplacer YOUR_IP
    wsUrl: 'ws://YOUR_IP:3000'
  },
  // ...
}
```

4. **Lancer l'application**
```bash
npm start
```

## 📦 Services API

### AuthService
- `sendMagicLink(email)` - Envoie le magic link
- `verifyMagicLink(token)` - Vérifie et connecte
- `loginTherapist(email, password)` - Connexion thérapeute
- `registerTherapist(data)` - Inscription thérapeute
- `logout()` - Déconnexion

### ChatService
- `getPatientConversations()` - Liste conversations
- `sendMessage(message)` - Envoie message
- `getConversation(id)` - Récupère conversation
- `markAsRead(id)` - Marque comme lu

### PatientService (Thérapeute)
- `getMyPatients()` - Liste patients
- `getPatient(id)` - Détails patient
- `createPatient(data)` - Créer patient
- `updatePatient(id, data)` - Modifier patient
- `getPatientStats(id)` - Statistiques patient

### EvaluationService
- `submitDailyEvaluation(data)` - Soumettre évaluation
- `getPatientEvaluations(start, end)` - Récupérer évaluations
- `checkTodayEvaluation()` - Vérifier si fait aujourd'hui

### SessionNoteService
- `uploadSessionNote(patientId, file, date)` - Upload note
- `getSessionNotes(patientId)` - Liste notes
- `updateSessionNote(id, data)` - Modifier note
- `deleteSessionNote(id)` - Supprimer note

### NotificationService
- `registerForPushNotifications()` - Enregistre token
- `scheduleLocalNotification(...)` - Planifie notification
- `setBadgeCount(count)` - Définit badge

## 🎨 Composants réutilisables

### Button
```javascript
<Button
  title="Connexion"
  onPress={handlePress}
  variant="primary"  // primary, secondary, outline, ghost, danger
  size="medium"      // small, medium, large
  loading={false}
  disabled={false}
  icon={<Icon />}
/>
```

### Input
```javascript
<Input
  label="Email"
  placeholder="email@example.com"
  value={value}
  onChangeText={setValue}
  error={errorMessage}
  secureTextEntry={false}
  keyboardType="email-address"
  icon={<Icon />}
/>
```

### Card
```javascript
<Card 
  variant="default"  // default, elevated, outlined, filled
  onPress={handlePress}
>
  {children}
</Card>
```

### Loading
```javascript
<Loading message="Chargement..." size="large" />
```

### EmptyState
```javascript
<EmptyState
  icon={<Icon />}
  title="Aucun résultat"
  message="Essayez autre chose"
  actionLabel="Actualiser"
  onAction={handleAction}
/>
```

## Authentification

### Flow Patient (Magic Link)
1. Patient entre son email
2. Backend envoie email avec lien
3. Patient clique sur lien → ouvre app
4. App extrait token du deep link
5. App vérifie token avec backend
6. Backend retourne JWT
7. JWT stocké dans SecureStore

### Flow Thérapeute
1. Thérapeute entre email/password
2. Backend vérifie credentials
3. Backend retourne JWT
4. JWT stocké dans SecureStore

## 🔔 Notifications Push

Les notifications sont gérées par Expo Notifications :

1. **Enregistrement** : Au login, l'app enregistre le token push
2. **Backend** : Envoie notifications via Expo Push API
3. **App** : Reçoit et affiche les notifications
4. **Navigation** : Clic sur notification → ouvre conversation

## 🎨 Theming (Tailwind)

Couleurs personnalisées définies dans `tailwind.config.js` :

- **Primary** : Bleu (chat, actions principales)
- **Secondary** : Violet (thérapeute)
- **Accent** : Vert (succès, validations)

## 📊 Gestion d'état

### AuthContext
- `user` - Utilisateur connecté
- `userRole` - 'patient' | 'therapist'
- `isAuthenticated` - État connexion
- `loading` - Chargement initial
- Méthodes de connexion/déconnexion

### ChatContext
- `conversations` - Liste conversations
- `currentConversation` - Conversation active
- `messages` - Messages de la conversation
- `sending` - Envoi en cours
- Méthodes de chat

## 🚀 Déploiement

### Build Android
```bash
eas build --platform android
```

### Build iOS
```bash
eas build --platform ios
```

### Configuration EAS
Créer `eas.json` :
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}
```

## 🔒 Sécurité

- Tokens JWT stockés dans SecureStore
- HTTPS uniquement en production
- Validation des entrées
- Gestion des erreurs API
- Timeout sur requêtes (30s)
- Refresh automatique si token expiré

## 🐛 Debugging

### Logs
```bash
npx react-native log-android
npx react-native log-ios
```

### Clear cache
```bash
expo start -c
```

## To-Do / Améliorations

- [ ] Mode hors-ligne avec cache
- [ ] Optimisation des images
- [ ] Analytics (Amplitude, Mixpanel)
- [ ] Tests unitaires (Jest)
- [ ] Tests E2E (Detox)
- [ ] Internationalisation (i18n)
- [ ] Dark mode
- [ ] Accessibilité (a11y)

## 👥 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

MIT

## 📞 Support

Pour toute question : support@julia-app.com
