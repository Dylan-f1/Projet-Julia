# 📱 Julia App - Frontend React Native

> Application mobile de suivi thérapeutique avec chatbot IA 24/7

## 📚 Documentation

1. **[QUICKSTART.md](./QUICKSTART.md)** - Démarrage rapide en 5 minutes
2. **[README.md](./README.md)** - Documentation complète du projet
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture technique détaillée
4. **[API_ENDPOINTS.md](./API_ENDPOINTS.md)** - Documentation des endpoints API

## 🏗️ Structure du Projet

### Configuration
- `package.json` - Dépendances et scripts
- `app.json` - Configuration Expo
- `babel.config.js` - Configuration Babel + NativeWind
- `tailwind.config.js` - Configuration Tailwind CSS
- `metro.config.js` - Configuration Metro bundler
- `.gitignore` - Fichiers à ignorer par Git

### Code Source (`src/`)

#### Services (`src/services/`)
Services de communication avec le backend :
- `api.js` - Configuration Axios + intercepteurs
- `authService.js` - Authentification (Magic Link, Login/Register)
- `chatService.js` - Gestion des conversations et messages
- `patientService.js` - Gestion des patients (thérapeute)
- `evaluationService.js` - Évaluations quotidiennes
- `sessionNoteService.js` - Notes de séance (OCR)
- `notificationService.js` - Notifications push

#### Contextes (`src/contexts/`)
Gestion d'état globale avec Context API :
- `AuthContext.js` - État d'authentification
- `ChatContext.js` - État du chat et conversations

#### Composants Communs (`src/components/common/`)
Composants réutilisables :
- `Button.js` - Bouton personnalisable
- `Input.js` - Champ de saisie
- `Card.js` - Carte
- `Loading.js` - Indicateur de chargement
- `EmptyState.js` - État vide

#### Composants Chat (`src/components/chat/`)
Composants spécifiques au chat :
- `MessageBubble.js` - Bulle de message
- `ChatInput.js` - Zone de saisie du chat
- `ConversationItem.js` - Item de liste de conversation

#### Écrans Patient (`src/screens/patient/`)
- `PatientLoginScreen.js` - Connexion par Magic Link
- `ChatScreen.js` - Écran de chat principal
- `ConversationHistoryScreen.js` - Historique des conversations
- `DailyEvaluationScreen.js` - Évaluation quotidienne

#### Écrans Thérapeute (`src/screens/therapist/`)
- `TherapistLoginScreen.js` - Connexion thérapeute
- `TherapistDashboardScreen.js` - Dashboard avec liste patients

#### Configuration (`src/config/`)
- `environment.js` - Variables d'environnement (dev/staging/prod)

### Navigation (`app/`)
Routes avec Expo Router (file-based routing) :
- `_layout.js` - Layout racine avec providers
- `index.js` - Point d'entrée et redirection
- `auth/` - Routes d'authentification
- `patient/` - Routes patient
- `therapist/` - Routes thérapeute

### Assets (`assets/`)
Ressources graphiques (icons, splash screen, etc.)

## 🚀 Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'API
# Modifier src/config/environment.js avec votre URL backend

# 3. Lancer l'app
npm start
```

## 📦 Technologies

- **React Native** - Framework mobile cross-platform
- **Expo** (~51.0.0) - Plateforme de développement
- **Expo Router** - Navigation file-based
- **NativeWind** - Tailwind CSS pour React Native
- **Context API** - State management
- **Axios** - Client HTTP
- **Expo Notifications** - Push notifications
- **Expo SecureStore** - Stockage sécurisé
- **date-fns** - Manipulation de dates

## 📱 Fonctionnalités

### Patient
- Connexion Magic Link (email sans mot de passe)
- Chat 24/7 avec IA (Julia/Gemini)
- Historique des conversations
- Évaluation quotidienne (humeur, anxiété, sommeil)
- Notifications push

### Thérapeute
- Connexion email/password
- Dashboard avec vue d'ensemble
- Liste et gestion des patients
- Consultation des conversations
- Visualisation des évaluations
- Upload de notes de séance (OCR)
- Détection de situations critiques

## 🎨 Design System

### Couleurs (Tailwind)
```javascript
primary: {
  500: '#0284c7',  // Bleu - Actions principales
  600: '#0369a1',
}
secondary: {
  500: '#d946ef',  // Violet - Thérapeute
  600: '#c026d3',
}
accent: {
  500: '#22c55e',  // Vert - Succès
  600: '#16a34a',
}
```

### Composants
Tous les composants utilisent NativeWind (Tailwind) :
```jsx
<Button 
  title="Connexion"
  variant="primary"
  size="large"
  onPress={handlePress}
/>
```

## Sécurité

- Tokens JWT stockés dans SecureStore (chiffré)
- Intercepteurs Axios pour auto-refresh
- Validation des inputs côté client
- HTTPS uniquement en production
- Timeout de 30s sur les requêtes

## 📊 Architecture

```
┌─────────────────────────────────────┐
│    UI Layer (Screens/Components)   │
├─────────────────────────────────────┤
│   State Management (Context API)   │
├─────────────────────────────────────┤
│    Business Logic (Services)       │
├─────────────────────────────────────┤
│      Data Layer (SecureStore)      │
└─────────────────────────────────────┘
```

## 🔄 Flux de données

### Exemple : Envoi de message
```
User Input → ChatContext → ChatService → API Backend
                ↓
         Update State
                ↓
           Re-render UI
```

## Scripts disponibles

```bash
npm start          # Démarre Expo
npm run android    # Lance sur Android
npm run ios        # Lance sur iOS (Mac uniquement)
npm run web        # Lance sur web
```

## 🐛 Debugging

```bash
# Clear cache
expo start -c

# Logs Android
npx react-native log-android

# Logs iOS
npx react-native log-ios
```

## Build & Déploiement

```bash
# Build Android
eas build --platform android

# Build iOS
eas build --platform ios

# Submit aux stores
eas submit --platform all
```

## 🧪 Tests (À implémenter)

```bash
# Unit tests
npm test

# E2E tests
npm run e2e
```

## 📈 Améliorations futures

- [ ] Mode hors-ligne avec cache
- [ ] Tests automatisés (Jest + Detox)
- [ ] Analytics (Amplitude/Mixpanel)
- [ ] Dark mode
- [ ] Internationalisation (i18n)
- [ ] Optimisation des images
- [ ] WebSocket pour chat temps réel
- [ ] Voice messages
- [ ] Graphiques statistiques avancés

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/NewFeature`)
3. Commit (`git commit -m 'Add NewFeature'`)
4. Push (`git push origin feature/NewFeature`)
5. Pull Request

## 📄 Fichiers importants

| Fichier | Description |
|---------|-------------|
| `package.json` | Dépendances et métadonnées |
| `app.json` | Configuration Expo |
| `tailwind.config.js` | Thème Tailwind |
| `src/config/environment.js` | URLs API |
| `src/contexts/AuthContext.js` | Auth state global |
| `src/services/api.js` | Config Axios |

## 🔗 Liens utiles

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

Pour toute question :
- Documentation : Voir les fichiers MD ci-dessus
- Issues : GitHub Issues
- Email : support@julia-app.com

## ✨ Crédits

Développé avec ❤️ pour améliorer le suivi thérapeutique

---

**Dernière mise à jour** : Janvier 2026
**Version** : 1.0.0
**Licence** : MIT
