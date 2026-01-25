# 📡 API Endpoints - Julia App Frontend

Documentation de tous les endpoints API utilisés par l'application mobile.

## 🔐 Authentification

### Patient - Magic Link

#### Envoyer le Magic Link
```http
POST /api/auth/magic-link
Content-Type: application/json

{
  "email": "patient@example.com"
}

Response 200:
{
  "message": "Email envoyé avec succès"
}
```

#### Vérifier le Magic Link
```http
POST /api/auth/verify-magic-link
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response 200:
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "email": "patient@example.com",
    "role": "patient"
  }
}
```

### Thérapeute

#### Connexion
```http
POST /api/auth/therapist/login
Content-Type: application/json

{
  "email": "therapist@example.com",
  "password": "password123"
}

Response 200:
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "email": "therapist@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "therapist"
  }
}
```

#### Inscription
```http
POST /api/auth/therapist/register
Content-Type: application/json

{
  "email": "new@therapist.com",
  "password": "secure_password",
  "firstName": "Jane",
  "lastName": "Smith",
  "specialty": "Psychologue clinicien",
  "phone": "+33612345678"
}

Response 201:
{
  "token": "jwt_token_here",
  "user": { ... }
}
```

## 💬 Conversations & Chat

### Obtenir les conversations du patient
```http
GET /api/conversations/patient
Authorization: Bearer {token}

Response 200:
{
  "conversations": [
    {
      "_id": "conv_id",
      "patient": "patient_id",
      "messages": [...],
      "summary": "Résumé de la conversation",
      "unreadCount": 2,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### Obtenir une conversation spécifique
```http
GET /api/conversations/{conversationId}
Authorization: Bearer {token}

Response 200:
{
  "_id": "conv_id",
  "patient": "patient_id",
  "messages": [
    {
      "role": "user",
      "content": "Bonjour Julia",
      "timestamp": "2024-01-15T10:00:00Z"
    },
    {
      "role": "assistant",
      "content": "Bonjour ! Comment allez-vous aujourd'hui ?",
      "timestamp": "2024-01-15T10:00:05Z"
    }
  ],
  "summary": "Salutations initiales",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:05Z"
}
```

### Envoyer un message
```http
POST /api/conversations/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Je me sens anxieux aujourd'hui"
}

Response 200:
{
  "conversation": {
    "_id": "conv_id",
    "summary": "Discussion sur l'anxiété",
    ...
  },
  "messages": [
    {
      "role": "user",
      "content": "Je me sens anxieux aujourd'hui",
      "timestamp": "2024-01-15T14:30:00Z"
    },
    {
      "role": "assistant",
      "content": "Je comprends que vous vous sentez anxieux. Pouvez-vous m'en dire plus sur ce qui vous préoccupe ?",
      "timestamp": "2024-01-15T14:30:05Z"
    }
  ]
}
```

### Marquer comme lu
```http
PUT /api/conversations/{conversationId}/read
Authorization: Bearer {token}

Response 200:
{
  "message": "Conversation marquée comme lue"
}
```

### Obtenir les conversations d'un patient (Thérapeute)
```http
GET /api/conversations/patient/{patientId}
Authorization: Bearer {token}

Response 200:
{
  "conversations": [...]
}
```

## 👥 Gestion des Patients (Thérapeute)

### Obtenir tous les patients
```http
GET /api/therapist/patients
Authorization: Bearer {token}

Response 200:
{
  "patients": [
    {
      "_id": "patient_id",
      "firstName": "Marie",
      "lastName": "Dupont",
      "email": "marie@example.com",
      "dateOfBirth": "1990-05-15",
      "status": "active",
      "criticalStatus": false,
      "therapist": "therapist_id",
      "lastContact": "2024-01-15T10:00:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Obtenir un patient spécifique
```http
GET /api/therapist/patients/{patientId}
Authorization: Bearer {token}

Response 200:
{
  "_id": "patient_id",
  "firstName": "Marie",
  "lastName": "Dupont",
  "email": "marie@example.com",
  "dateOfBirth": "1990-05-15",
  "phone": "+33612345678",
  "status": "active",
  "criticalStatus": false,
  "notes": "Notes privées du thérapeute",
  "therapist": "therapist_id",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Créer un nouveau patient
```http
POST /api/therapist/patients
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Pierre",
  "lastName": "Martin",
  "email": "pierre@example.com",
  "dateOfBirth": "1985-03-20",
  "phone": "+33687654321",
  "notes": "Notes initiales"
}

Response 201:
{
  "_id": "new_patient_id",
  "firstName": "Pierre",
  ...
}
```

### Mettre à jour un patient
```http
PUT /api/therapist/patients/{patientId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "phone": "+33611111111",
  "notes": "Notes mises à jour",
  "status": "active"
}

Response 200:
{
  "_id": "patient_id",
  ...
}
```

### Archiver un patient
```http
PUT /api/therapist/patients/{patientId}/archive
Authorization: Bearer {token}

Response 200:
{
  "message": "Patient archivé avec succès",
  "patient": { ... }
}
```

### Obtenir les statistiques d'un patient
```http
GET /api/therapist/patients/{patientId}/stats
Authorization: Bearer {token}

Response 200:
{
  "totalConversations": 45,
  "totalMessages": 230,
  "averageMood": 3.5,
  "averageAnxiety": 2.8,
  "averageSleep": 3.2,
  "lastEvaluation": {
    "date": "2024-01-15",
    "mood": 4,
    "anxiety": 2,
    "sleep": 3
  },
  "moodTrend": "stable",
  "anxietyTrend": "decreasing",
  "criticalAlerts": 0
}
```

## 📊 Évaluations Quotidiennes

### Soumettre une évaluation
```http
POST /api/evaluations/daily
Authorization: Bearer {token}
Content-Type: application/json

{
  "mood": 4,
  "anxiety": 2,
  "sleep": 3,
  "notes": "Bonne journée aujourd'hui"
}

Response 201:
{
  "_id": "evaluation_id",
  "patient": "patient_id",
  "date": "2024-01-15",
  "mood": 4,
  "anxiety": 2,
  "sleep": 3,
  "notes": "Bonne journée aujourd'hui"
}
```

### Obtenir les évaluations du patient
```http
GET /api/evaluations/patient?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}

Response 200:
{
  "evaluations": [
    {
      "_id": "eval_id",
      "date": "2024-01-15",
      "mood": 4,
      "anxiety": 2,
      "sleep": 3,
      "notes": "..."
    }
  ]
}
```

### Vérifier si l'évaluation du jour est faite
```http
GET /api/evaluations/today
Authorization: Bearer {token}

Response 200:
{
  "completed": true,
  "evaluation": { ... }
}
// Ou
{
  "completed": false
}
```

### Obtenir les évaluations d'un patient (Thérapeute)
```http
GET /api/evaluations/patient/{patientId}?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer {token}

Response 200:
{
  "evaluations": [...]
}
```

## 📝 Notes de Séance

### Upload une note de séance
```http
POST /api/session-notes/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData:
- file: [image file]
- patientId: "patient_id"
- sessionDate: "2024-01-15"

Response 201:
{
  "_id": "note_id",
  "therapist": "therapist_id",
  "patient": "patient_id",
  "sessionDate": "2024-01-15",
  "fileUrl": "https://s3.../note.jpg",
  "extractedText": "Texte extrait par OCR...",
  "summary": "Résumé généré par IA",
  "createdAt": "2024-01-15T16:00:00Z"
}
```

### Obtenir les notes d'un patient
```http
GET /api/session-notes/patient/{patientId}
Authorization: Bearer {token}

Response 200:
{
  "notes": [
    {
      "_id": "note_id",
      "sessionDate": "2024-01-15",
      "fileUrl": "https://...",
      "extractedText": "...",
      "summary": "...",
      "createdAt": "2024-01-15T16:00:00Z"
    }
  ]
}
```

### Obtenir une note spécifique
```http
GET /api/session-notes/{noteId}
Authorization: Bearer {token}

Response 200:
{
  "_id": "note_id",
  "therapist": "therapist_id",
  "patient": "patient_id",
  "sessionDate": "2024-01-15",
  "fileUrl": "https://...",
  "extractedText": "...",
  "summary": "...",
  "tags": ["anxiété", "stress"],
  "createdAt": "2024-01-15T16:00:00Z"
}
```

### Mettre à jour une note
```http
PUT /api/session-notes/{noteId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "summary": "Résumé mis à jour",
  "tags": ["anxiété", "progrès"]
}

Response 200:
{
  "_id": "note_id",
  ...
}
```

### Supprimer une note
```http
DELETE /api/session-notes/{noteId}
Authorization: Bearer {token}

Response 200:
{
  "message": "Note supprimée avec succès"
}
```

## 🔔 Notifications

### Enregistrer le token push
```http
POST /api/notifications/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "pushToken": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
}

Response 200:
{
  "message": "Token enregistré avec succès"
}
```

## ⚙️ Configuration

### Headers requis

Toutes les requêtes (sauf auth) nécessitent :
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

### Codes de réponse

- `200` : Succès
- `201` : Créé avec succès
- `400` : Erreur de validation
- `401` : Non authentifié / Token invalide
- `403` : Non autorisé
- `404` : Ressource non trouvée
- `500` : Erreur serveur

### Format des erreurs

```json
{
  "error": "Message d'erreur descriptif"
}
```

## 🔄 Exemple de flux complet

### Flux patient - Envoi de message

```javascript
// 1. Envoyer le message
POST /api/conversations/message
{
  "message": "Je me sens stressé"
}

// 2. Réponse avec conversation mise à jour
Response: {
  "conversation": { ... },
  "messages": [
    { "role": "user", "content": "Je me sens stressé" },
    { "role": "assistant", "content": "Je comprends..." }
  ]
}

// 3. Notification push envoyée au thérapeute (backend)
// 4. Badge mis à jour
```

### Flux thérapeute - Consultation patient

```javascript
// 1. Liste des patients
GET /api/therapist/patients

// 2. Sélection d'un patient
GET /api/therapist/patients/{patientId}

// 3. Statistiques
GET /api/therapist/patients/{patientId}/stats

// 4. Conversations
GET /api/conversations/patient/{patientId}

// 5. Évaluations
GET /api/evaluations/patient/{patientId}

// 6. Notes de séance
GET /api/session-notes/patient/{patientId}
```

## 🔧 Variables d'environnement

Dans `src/config/environment.js` :

```javascript
const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
    wsUrl: 'ws://localhost:3000'
  },
  staging: {
    apiUrl: 'https://staging-api.julia-app.com/api',
    wsUrl: 'wss://staging-api.julia-app.com'
  },
  prod: {
    apiUrl: 'https://api.julia-app.com/api',
    wsUrl: 'wss://api.julia-app.com'
  }
};
```

## 📚 Ressources

- Swagger/OpenAPI : `http://localhost:3000/api-docs` (si implémenté)
- Postman Collection : Disponible dans `/docs/postman`
- Backend Repository : [Lien vers le repo backend]
