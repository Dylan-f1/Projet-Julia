# 🎨 Skeletons & Gestion d'Erreurs - Julia App

Guide complet pour implémenter des états de chargement professionnels et une gestion d'erreurs exhaustive.

## 📦 Composants disponibles

### Skeletons (15 variantes)
1. `Skeleton` - Skeleton de base
2. `SkeletonText` - Lignes de texte
3. `SkeletonCard` - Carte complète
4. `SkeletonList` - Liste de cartes
5. `SkeletonAvatar` - Avatar circulaire
6. `SkeletonButton` - Bouton
7. `SkeletonInput` - Champ de saisie
8. `SkeletonChart` - Graphique
9. `SkeletonPatientCard` - Carte patient
10. `SkeletonMessageBubble` - Bulle message
11. `SkeletonChatScreen` - Écran chat complet
12. `SkeletonDashboard` - Dashboard complet

### Erreurs (8 types)
1. `ErrorMessage` - Erreur générique personnalisable
2. `NetworkError` - Pas de connexion
3. `AuthError` - Erreur d'authentification
4. `NotFoundError` - Ressource introuvable
5. `ServerError` - Erreur serveur (500+)
6. `ValidationError` - Erreur de validation
7. `FormError` - Erreur dans formulaire
8. `SuccessMessage` - Message de succès
9. `WarningMessage` - Message d'avertissement

### Hook
- `useApiError` - Hook pour parser et gérer les erreurs API

---

## 🎬 Skeletons

### Import
```javascript
import Skeleton, { 
  SkeletonText, 
  SkeletonCard, 
  SkeletonList,
  SkeletonDashboard,
  SkeletonPatientCard,
  SkeletonChatScreen,
} from '../components/common/Skeleton';
```

### 1. Skeleton de base
```jsx
<Skeleton width={200} height={20} borderRadius={4} />
<Skeleton width="100%" height={48} />
```

**Props**:
- `width`: number | string (défaut: '100%')
- `height`: number (défaut: 20)
- `borderRadius`: number (défaut: 4)
- `className`: string

### 2. SkeletonText
Lignes de texte avec animation.

```jsx
<SkeletonText lines={3} />
<SkeletonText lines={5} className="mt-4" />
```

**Props**:
- `lines`: number (défaut: 3)
- `className`: string

### 3. SkeletonCard
Carte complète (avatar + texte).

```jsx
<SkeletonCard />
<SkeletonCard className="mb-4" />
```

### 4. SkeletonList
Liste de cartes skeleton.

```jsx
<SkeletonList count={5} />
```

**Props**:
- `count`: number (défaut: 3)
- `className`: string

### 5. SkeletonAvatar
Avatar circulaire.

```jsx
<SkeletonAvatar size="small" />
<SkeletonAvatar size="medium" />
<SkeletonAvatar size="large" />
<SkeletonAvatar size="xlarge" />
```

**Props**:
- `size`: 'small' | 'medium' | 'large' | 'xlarge'
- `className`: string

### 6. SkeletonPatientCard
Carte patient spécifique.

```jsx
<SkeletonPatientCard />
<SkeletonPatientCard className="mb-3" />
```

### 7. SkeletonChatScreen
Écran chat complet avec bulles.

```jsx
<SkeletonChatScreen />
```

### 8. SkeletonDashboard
Dashboard complet (stats + liste).

```jsx
<SkeletonDashboard />
```

---

## 🎨 Exemple d'utilisation Skeleton

### Écran Liste Patients

```jsx
import { SkeletonDashboard, SkeletonPatientCard } from '../components/common/Skeleton';

function PatientListScreen() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <SkeletonDashboard />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={patients}
      renderItem={({ item }) => <PatientCard patient={item} />}
    />
  );
}
```

### Écran Chat

```jsx
import { SkeletonChatScreen } from '../components/common/Skeleton';

function ChatScreen() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <SkeletonChatScreen />
      </SafeAreaView>
    );
  }

  return <ChatUI />;
}
```

---

## Gestion d'erreurs

### Import
```javascript
import ErrorMessage, {
  NetworkError,
  AuthError,
  NotFoundError,
  ServerError,
  ValidationError,
  FormError,
  SuccessMessage,
  WarningMessage,
} from '../components/common/ErrorMessage';

import useApiError from '../hooks/useApiError';
```

### 1. ErrorMessage générique
```jsx
<ErrorMessage
  type="general"
  title="Erreur"
  message="Une erreur s'est produite"
  onRetry={handleRetry}
  onGoBack={handleGoBack}
/>
```

**Props**:
- `type`: 'general' | 'network' | 'auth' | 'notfound' | 'server' | 'validation'
- `title`: string
- `message`: string
- `onRetry`: function
- `onGoBack`: function
- `icon`: ReactNode (optionnel)
- `actions`: Array<{ label, onPress, variant, icon }> (optionnel)
- `className`: string

### 2. NetworkError
```jsx
<NetworkError onRetry={handleRetry} />
```

Affiche:
- 🌐 Icône offline
- "Pas de connexion"
- "Vérifiez votre connexion internet"
- Bouton "Réessayer"

### 3. AuthError
```jsx
<AuthError 
  message="Votre session a expiré"
  onRetry={handleLogin}
  onGoBack={handleGoBack}
/>
```

Affiche:
- 🔒 Icône cadenas
- "Erreur d'authentification"
- Message personnalisé
- Boutons d'action

### 4. NotFoundError
```jsx
<NotFoundError 
  title="Patient introuvable"
  message="Ce patient n'existe pas"
  onGoBack={handleGoBack}
/>
```

### 5. ServerError
```jsx
<ServerError onRetry={handleRetry} />
```

Affiche:
- 🖥️ Icône serveur
- "Erreur serveur"
- "Le serveur rencontre des difficultés"
- Bouton "Réessayer"

### 6. FormError
```jsx
<FormError error="L'email est invalide" />
```

Affiche une alerte rouge en haut du formulaire.

### 7. SuccessMessage
```jsx
<SuccessMessage 
  message="Patient créé avec succès"
  onDismiss={handleDismiss}
/>
```

### 8. WarningMessage
```jsx
<WarningMessage 
  message="Cette action est irréversible"
  onDismiss={handleDismiss}
/>
```

---

## 🎣 Hook useApiError

### Import
```javascript
import useApiError from '../hooks/useApiError';
```

### Utilisation

```jsx
function MyScreen() {
  const { 
    error, 
    errorType, 
    setApiError, 
    clearError, 
    getErrorMessage, 
    hasError 
  } = useApiError();

  const loadData = async () => {
    clearError();
    
    try {
      const result = await api.getData();
      // ...
    } catch (apiError) {
      setApiError(apiError); // Parse automatiquement l'erreur
    }
  };

  if (hasError()) {
    return (
      <ErrorMessage
        type={errorType}
        title={error.title}
        message={error.message}
        onRetry={loadData}
      />
    );
  }

  return <MyContent />;
}
```

### Méthodes disponibles

**`setApiError(apiError)`**
Parse une erreur Axios et la stocke.

```javascript
try {
  const response = await api.post('/endpoint');
} catch (error) {
  setApiError(error); // Analyse et stocke l'erreur
}
```

**`clearError()`**
Efface l'erreur actuelle.

```javascript
clearError();
```

**`getErrorMessage()`**
Retourne le message d'erreur (string).

```javascript
const message = getErrorMessage();
```

**`hasError()`**
Vérifie si une erreur est présente.

```javascript
if (hasError()) {
  // Afficher erreur
}
```

**`parseApiError(error)`**
Parse manuellement une erreur.

```javascript
const parsed = parseApiError(error);
console.log(parsed.title, parsed.message);
```

---

## 📊 Codes d'erreur API parsés

| Code HTTP | Type | Message |
|-----------|------|---------|
| Network   | `network` | Impossible de se connecter |
| 400       | `validation` | Données invalides |
| 401       | `auth` | Session expirée |
| 403       | `auth` | Accès refusé |
| 404       | `notfound` | Ressource introuvable |
| 409       | `validation` | Conflit (doublon) |
| 422       | `validation` | Données non traitables |
| 429       | `general` | Trop de requêtes |
| 500+      | `server` | Erreur serveur |

---

## 🎨 Exemple complet

### Écran avec states complets

```jsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SkeletonDashboard } from '../components/common/Skeleton';
import ErrorMessage, { NetworkError } from '../components/common/ErrorMessage';
import useApiError from '../hooks/useApiError';
import patientService from '../services/patientService';

function DashboardScreen() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, errorType, setApiError, clearError, hasError } = useApiError();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    clearError();

    const result = await patientService.getMyPatients();
    setLoading(false);

    if (result.success) {
      setPatients(result.data);
    } else {
      setApiError(result.error);
    }
  };

  // 1. État Loading
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <SkeletonDashboard />
      </SafeAreaView>
    );
  }

  // 2. État Error Network
  if (errorType === 'network') {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <NetworkError onRetry={loadPatients} />
      </SafeAreaView>
    );
  }

  // 3. État Error Auth
  if (errorType === 'auth') {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <ErrorMessage
          type="auth"
          title={error.title}
          message={error.message}
          actions={[
            {
              label: 'Se reconnecter',
              onPress: handleLogin,
              variant: 'primary',
            },
          ]}
        />
      </SafeAreaView>
    );
  }

  // 4. État Error Générique
  if (hasError()) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <ErrorMessage
          type={errorType}
          title={error.title}
          message={error.message}
          onRetry={loadPatients}
        />
      </SafeAreaView>
    );
  }

  // 5. État Success
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList data={patients} ... />
    </SafeAreaView>
  );
}
```

---

## 🎯 Checklist UX

### Pour chaque écran avec données

- [ ] **Loading** : Skeleton adapté
- [ ] **Error Network** : Message + retry
- [ ] **Error Auth** : Message + redirect login
- [ ] **Error Server** : Message + retry
- [ ] **Error NotFound** : Message + go back
- [ ] **Empty State** : Message + action
- [ ] **Success State** : Données affichées
- [ ] **Refresh** : Pull to refresh

### Pour chaque formulaire

- [ ] **Validation** : FormError pour chaque champ
- [ ] **Submit Loading** : Bouton avec loading
- [ ] **Submit Success** : SuccessMessage
- [ ] **Submit Error** : FormError global
- [ ] **Network Error** : Message approprié

---

## 📱 Templates par écran

### Liste

```jsx
// Loading
<SkeletonList count={5} />

// Error
<NetworkError onRetry={loadData} />

// Empty
<EmptyState title="Aucun élément" onAction={handleAdd} />

// Success
<FlatList data={items} renderItem={...} />
```

### Détail

```jsx
// Loading
<SkeletonCard />

// Error
<NotFoundError onGoBack={goBack} />

// Success
<ScrollView><Content /></ScrollView>
```

### Chat

```jsx
// Loading
<SkeletonChatScreen />

// Error
<NetworkError onRetry={loadMessages} />

// Success
<FlatList data={messages} ... />
```

### Dashboard

```jsx
// Loading
<SkeletonDashboard />

// Error
<ErrorMessage type="..." onRetry={loadData} />

// Success
<Stats /> + <List />
```

---

## 🎨 Personnalisation

### Couleurs des erreurs

Modifiez dans `ErrorMessage.jsx` :

```javascript
const errorConfig = {
  network: {
    iconColor: '#f59e0b', // Votre couleur
    bgColor: 'bg-yellow-50',
    // ...
  },
};
```

### Animation skeleton

Modifiez dans `Skeleton.jsx` :

```javascript
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 1500, // Votre durée
  easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Votre courbe
});
```

---

## Bonnes pratiques

1. **Toujours** afficher un skeleton pendant le chargement
2. **Toujours** gérer les erreurs réseau
3. **Toujours** permettre de retry
4. **Toujours** avoir un empty state
5. **Jamais** laisser un écran blanc
6. **Jamais** afficher "Error" sans explication
7. **Toujours** donner une action à l'utilisateur
8. **Toujours** adapter le message au contexte

---

## 📊 Statistiques d'erreurs (optionnel)

```jsx
// Logger les erreurs pour analytics
import { logError } from '../utils/analytics';

const { setApiError } = useApiError();

try {
  const result = await api.call();
} catch (error) {
  setApiError(error);
  
  // Log pour analytics
  logError({
    type: errorType,
    endpoint: '/api/patients',
    statusCode: error.response?.status,
    message: error.message,
  });
}
```

---

**UX professionnelle garantie ! 🎉**
