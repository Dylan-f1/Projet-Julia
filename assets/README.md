# Assets - Julia App

Ce dossier contient les ressources graphiques de l'application.

## 📁 Structure requise

```
assets/
├── icon.png              # Icône de l'app (1024x1024)
├── splash.png            # Écran de démarrage (1284x2778)
├── adaptive-icon.png     # Icône Android adaptive (1024x1024)
├── favicon.png           # Favicon web (48x48)
└── notification-icon.png # Icône de notification Android (96x96)
```

## 🎨 Spécifications

### icon.png
- **Dimensions** : 1024x1024 pixels
- **Format** : PNG avec transparence
- **Utilisation** : Icône principale de l'application
- **Plateformes** : iOS, Android, Web

### splash.png
- **Dimensions** : 1284x2778 pixels (iPhone 14 Pro Max)
- **Format** : PNG
- **Utilisation** : Écran de démarrage (splash screen)
- **Recommandation** : Placer le logo au centre, fond uni

### adaptive-icon.png
- **Dimensions** : 1024x1024 pixels
- **Format** : PNG avec transparence
- **Zone de sécurité** : Cercle de 660px de diamètre au centre
- **Utilisation** : Icône Android adaptive (différentes formes)

### favicon.png
- **Dimensions** : 48x48 pixels
- **Format** : PNG
- **Utilisation** : Favicon pour la version web

### notification-icon.png
- **Dimensions** : 96x96 pixels
- **Format** : PNG
- **Utilisation** : Icône des notifications Android
- **Recommandation** : Blanc sur transparent

## 🔧 Génération automatique

Vous pouvez générer tous les assets à partir d'une seule image haute résolution :

### Méthode 1 : Expo Asset Generator
```bash
# Installer eas-cli
npm install -g eas-cli

# Générer les assets
eas build:configure
```

### Méthode 2 : En ligne
- [App Icon Generator](https://www.appicon.co/)
- [MakeAppIcon](https://makeappicon.com/)

### Méthode 3 : Figma Template
Utilisez le template Figma officiel d'Expo :
https://www.figma.com/community/file/1155362909441341285

## 📐 Recommandations de design

### Icône (icon.png)
- ✅ Simple et reconnaissable à petite taille
- ✅ Pas de texte (sauf logo)
- ✅ Contraste élevé
- ✅ Fond transparent si possible
- ❌ Pas de détails trop fins

### Splash Screen
- ✅ Logo centré
- ✅ Fond de couleur unie (correspondant au thème)
- ✅ Nom de l'app (optionnel)
- ❌ Pas de texte de chargement
- ❌ Pas d'informations qui changent

## 🎨 Suggestions pour Julia App

### Palette de couleurs
- **Primary** : Bleu (#0284c7)
- **Secondary** : Violet (#c026d3)
- **Accent** : Vert (#22c55e)

### Idées de design
- Logo : Bulle de chat avec "J" stylisé
- Couleurs : Dégradé bleu-violet
- Style : Moderne, accueillant, professionnel

## 🔄 Mise à jour des assets

Après modification des assets :

```bash
# Clear le cache Expo
expo start -c

# Rebuild si nécessaire
eas build --platform all
```

## 📱 Preview

Pour prévisualiser vos assets :
```bash
npx expo prebuild
```

Puis ouvrez les dossiers `android/` et `ios/` pour voir les assets générés.

## 🛠️ Assets temporaires

En attendant vos assets définitifs, vous pouvez utiliser :
- Des placeholders Expo (générés automatiquement)
- Des assets de test

L'app fonctionnera avec les assets par défaut d'Expo, mais il est recommandé de les remplacer avant publication.

## ✅ Checklist avant publication

- [ ] icon.png créé (1024x1024)
- [ ] splash.png créé (1284x2778)
- [ ] adaptive-icon.png créé (1024x1024)
- [ ] favicon.png créé (48x48)
- [ ] notification-icon.png créé (96x96)
- [ ] Assets testés sur iOS
- [ ] Assets testés sur Android
- [ ] Splash screen testé
- [ ] Notifications testées
