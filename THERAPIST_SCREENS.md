# 📱 Écrans Thérapeute - Julia App

Documentation complète de tous les écrans pour les thérapeutes.

## 🏠 Navigation Thérapeute

```
TherapistDashboard (Accueil)
├── PatientDetail (Détail patient)
│   ├── ConversationDetail (Lecture conversation)
│   ├── PatientStats (Statistiques détaillées)
│   ├── AddSessionNote (Ajouter note)
│   └── EditPatient (Modifier patient)
├── AddPatient (Nouveau patient)
└── TherapistLogin/Register (Authentification)
```

## 📄 Liste des Écrans

### 1. TherapistLoginScreen
**Fichier**: `src/screens/therapist/TherapistLoginScreen.js`

**Fonction**: Connexion des thérapeutes par email/password

**Features**:
- ✅ Formulaire email + mot de passe
- ✅ Toggle visibilité mot de passe
- ✅ Lien vers inscription
- ✅ Lien retour vers login patient
- ✅ Gestion d'erreurs

**Services utilisés**:
- `authService.loginTherapist()`

---

### 2. TherapistRegisterScreen  
**Fichier**: `src/screens/therapist/TherapistRegisterScreen.js`

**Fonction**: Inscription des nouveaux thérapeutes

**Features**:
- ✅ Formulaire complet (nom, prénom, email, tel, spécialité)
- ✅ Sélection de spécialité (boutons)
- ✅ Numéro ADELI/RPPS
- ✅ Mot de passe + confirmation
- ✅ Validation complète
- ✅ Toggle visibilité mots de passe

**Champs**:
- Prénom, Nom (requis)
- Email professionnel (requis)
- Téléphone (optionnel)
- Spécialité (requis) - 7 choix
- Numéro ADELI/RPPS (optionnel)
- Mot de passe (min 8 caractères, requis)

**Services utilisés**:
- `authService.registerTherapist()`

---

### 3. TherapistDashboardScreen
**Fichier**: `src/screens/therapist/TherapistDashboardScreen.js`

**Fonction**: Vue d'ensemble des patients du thérapeute

**Features**:
- ✅ Statistiques (Total, Actifs, Critiques)
- ✅ Liste de tous les patients
- ✅ Indicateur patient critique
- ✅ Dernier contact affiché
- ✅ Bouton "Ajouter patient"
- ✅ Pull-to-refresh
- ✅ Navigation vers détail patient
- ✅ Bouton déconnexion

**Statistiques affichées**:
- 📊 Total patients
- ✅ Patients actifs
- ⚠️ Situations critiques

**Services utilisés**:
- `patientService.getMyPatients()`

---

### 4. PatientDetailScreen
**Fichier**: `src/screens/therapist/PatientDetailScreen.js`

**Fonction**: Vue détaillée d'un patient avec onglets

**Features**:
- ✅ 4 onglets: Vue d'ensemble, Conversations, Évaluations, Notes
- ✅ Alerte patient critique
- ✅ Statistiques globales
- ✅ Informations patient
- ✅ Notes privées du thérapeute
- ✅ Actions rapides (Modifier, Archiver)

**Onglet "Vue d'ensemble"**:
- Stats: Nombre conversations, évaluations, notes
- Moyennes: Humeur, anxiété, sommeil avec tendances
- Infos: Date naissance, téléphone, email, dernier contact
- Notes privées du thérapeute
- Actions: Ajouter note, Modifier, Archiver

**Onglet "Conversations"**:
- Liste des conversations
- Résumé + date
- Nombre de messages
- Clic → Lecture détaillée

**Onglet "Évaluations"**:
- Liste des évaluations récentes (30 jours)
- Date + 3 scores (humeur, anxiété, sommeil)
- Notes optionnelles

**Onglet "Notes"**:
- Liste des notes de séance
- Date séance
- Résumé OCR
- Tags
- Bouton "Ajouter note"

**Services utilisés**:
- `patientService.getPatient()`
- `patientService.getPatientStats()`
- `chatService.getConversationsByPatient()`
- `evaluationService.getPatientEvaluationsByTherapist()`
- `sessionNoteService.getSessionNotes()`

---

### 5. AddPatientScreen
**Fichier**: `src/screens/therapist/AddPatientScreen.js`

**Fonction**: Créer un nouveau patient

**Features**:
- ✅ Formulaire complet
- ✅ Email automatique au patient
- ✅ Notes privées
- ✅ Validation des champs
- ✅ Info bulle sur l'email automatique

**Champs**:
- Prénom (requis)
- Nom (requis)  
- Email (requis) - Magic link envoyé automatiquement
- Téléphone (optionnel)
- Date de naissance (optionnel)
- Notes privées (optionnel)

**Services utilisés**:
- `patientService.createPatient()`

---

### 6. EditPatientScreen
**Fichier**: `src/screens/therapist/EditPatientScreen.js`

**Fonction**: Modifier les informations d'un patient

**Features**:
- ✅ Formulaire pré-rempli
- ✅ Tous les champs modifiables
- ✅ Validation
- ✅ Retour au détail patient après sauvegarde

**Champs modifiables**:
- Prénom, Nom
- Email
- Téléphone
- Date de naissance
- Notes privées

**Services utilisés**:
- `patientService.updatePatient()`

---

### 7. AddSessionNoteScreen
**Fichier**: `src/screens/therapist/AddSessionNoteScreen.js`

**Fonction**: Upload de notes manuscrites avec OCR

**Features**:
- ✅ 3 options: Prendre photo, Galerie, Document
- ✅ Sélection date de séance
- ✅ Preview de l'image
- ✅ Upload + OCR automatique
- ✅ Info bulle OCR + résumé IA
- ✅ Permissions caméra/galerie

**Workflow**:
1. Sélectionner date séance
2. Choisir source (caméra/galerie/fichier)
3. Preview du fichier
4. Upload → OCR + résumé IA auto
5. Retour au détail patient

**Services utilisés**:
- `sessionNoteService.uploadSessionNote()`
- `ImagePicker` (Expo)
- `DocumentPicker` (Expo)

---

### 8. ConversationDetailScreen
**Fichier**: `src/screens/therapist/ConversationDetailScreen.js`

**Fonction**: Lecture d'une conversation patient (read-only)

**Features**:
- ✅ Affichage des messages
- ✅ Bulles user/assistant
- ✅ Timestamps
- ✅ Badge "LECTURE SEULE"
- ✅ Info: Patient peut continuer à échanger

**Services utilisés**:
- `chatService.getConversation()`

---

### 9. PatientStatsScreen
**Fichier**: `src/screens/therapist/PatientStatsScreen.js`

**Fonction**: Statistiques détaillées avec graphiques

**Features**:
- ✅ Sélection période (7j, 30j, 3m, 1an)
- ✅ Stats globales (total évaluations, régularité)
- ✅ Moyennes + min/max pour chaque indicateur
- ✅ 3 graphiques (humeur, anxiété, sommeil)
- ✅ Alertes automatiques (anxiété élevée, humeur basse)
- ✅ Taux de complétion avec warning si < 50%

**Graphiques** (LineChart):
- Évolution humeur (vert)
- Évolution anxiété (rouge)
- Qualité sommeil (bleu)
- 14 derniers points maximum
- Moyenne affichée

**Alertes automatiques**:
- ⚠️ Anxiété > 3.5/5
- ⚠️ Humeur < 2.5/5
- ⚠️ Régularité < 50%

**Services utilisés**:
- `evaluationService.getPatientEvaluationsByTherapist()`

---

## 🎨 Composants Spécialisés

### EvaluationChart
**Fichier**: `src/components/therapist/EvaluationChart.js`

**Fonction**: Graphique d'évolution (humeur/anxiété/sommeil)

**Props**:
- `evaluations` - Array d'évaluations
- `type` - 'mood' | 'anxiety' | 'sleep'

**Features**:
- ✅ LineChart avec courbe lissée (Bézier)
- ✅ 14 derniers jours max
- ✅ Moyenne calculée
- ✅ Couleur adaptée au type
- ✅ Labels dates formatées

**Librairie**:
- `react-native-chart-kit`

---

## 🔐 Sécurité & Permissions

### Permissions requises
- ✅ Camera (pour photos notes)
- ✅ Media Library (pour galerie)
- ✅ Storage (pour documents)

### Données sensibles
- ✅ Notes privées (visibles uniquement par le thérapeute)
- ✅ Conversations en lecture seule
- ✅ Données patient protégées (JWT)

---

## 🎯 Workflows Principaux

### Workflow 1: Nouveau patient
```
Dashboard → Ajouter patient
→ Remplir formulaire
→ Créer
→ Email Magic Link envoyé automatiquement
→ Patient apparaît dans liste
```

### Workflow 2: Suivi patient
```
Dashboard → Sélectionner patient
→ PatientDetail (onglets)
→ Consulter conversations/évaluations/notes
→ Voir statistiques détaillées (graphiques)
→ Ajouter note de séance si besoin
```

### Workflow 3: Note de séance
```
PatientDetail → Onglet Notes → Ajouter
→ Choisir date
→ Photo/Galerie/Document
→ Preview
→ Upload
→ OCR + IA → Texte extrait + résumé
→ Retour au patient
```

### Workflow 4: Analyse statistiques
```
PatientDetail → Bouton Stats (ou icône)
→ PatientStatsScreen
→ Sélectionner période
→ Voir graphiques + moyennes
→ Alertes automatiques si anomalie
```

---

## 📊 Données affichées

### Dashboard
- Nombre total patients
- Nombre patients actifs
- Nombre situations critiques
- Liste patients avec statut

### Détail Patient
- Infos personnelles
- Statistiques résumées
- Conversations (résumés)
- Évaluations (liste)
- Notes de séance (liste)

### Statistiques
- Graphiques évolution
- Moyennes sur période
- Min/Max
- Taux de complétion
- Alertes automatiques

---

## 🎨 Design System

### Couleurs Thérapeute
- **Principal**: Violet (#c026d3) - secondary-600
- **Success**: Vert (#22c55e)
- **Warning**: Jaune (#f59e0b)
- **Danger**: Rouge (#ef4444)

### Icônes principales
- 👨‍⚕️ `medical` - Thérapeute
- 👥 `people` - Patients
- 📊 `analytics` - Statistiques
- 💬 `chatbubbles` - Conversations
- 📝 `document-text` - Notes
- ⚠️ `warning` - Critique
- ✅ `checkmark-circle` - Actif

---

## 🧪 État d'avancement

✅ **Complet**:
- Login/Register thérapeute
- Dashboard
- Détail patient (4 onglets)
- CRUD patient
- Notes de séance (upload OCR)
- Conversation read-only
- Statistiques avec graphiques

⏳ **À ajouter (optionnel)**:
- Calendrier rendez-vous
- Messagerie thérapeute ↔ patient
- Export PDF des stats
- Notifications personnalisées

---

## 📱 Screenshots suggérés

1. Dashboard avec stats
2. Liste patients
3. Détail patient - Onglet Overview
4. Détail patient - Onglet Conversations
5. Détail patient - Onglet Évaluations
6. Statistiques avec graphiques
7. Ajout patient
8. Upload note de séance

---

## 🚀 Améliorations futures

- [ ] Filtres et recherche patients
- [ ] Export données (CSV, PDF)
- [ ] Rappels automatiques
- [ ] Messagerie sécurisée
- [ ] Visio intégrée
- [ ] Gestion agenda
- [ ] Multi-thérapeutes par patient
- [ ] Templates de notes
- [ ] IA suggestions diagnostiques
- [ ] Dark mode

---

Tous les écrans sont **opérationnels** et **connectés au backend** ! 🎉
