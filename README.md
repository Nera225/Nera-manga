# Manga Translator - Application Mobile de Traduction Automatique

Une application mobile innovante pour traduire automatiquement les pages de manga du japonais au français en utilisant la reconnaissance optique de caractères (OCR) et la traduction automatique.

## 🎯 Objectif

Créer une expérience fluide et intuitive permettant aux lecteurs de manga de comprendre instantanément le texte japonais sans quitter l'application. L'application détecte automatiquement les bulles de dialogue, reconnaît le texte japonais et le traduit en français.

## ✨ Fonctionnalités Principales

### 1. Importation d'Images
- **Importer une image unique** depuis la galerie du téléphone
- **Importer plusieurs images** pour lire un chapitre complet
- Support des formats courants (JPG, PNG, WebP)

### 2. Reconnaissance Optique de Caractères (OCR)
- Détection automatique du texte japonais dans les images
- Reconnaissance des bulles de dialogue
- Utilisation de Tesseract.js pour une OCR haute précision
- Extraction des coordonnées des bulles pour un positionnement précis

### 3. Traduction Automatique
- Traduction du texte japonais vers le français
- Utilisation de l'API MyMemory Translation (gratuite, sans clé requise)
- Support du langage conversationnel naturel

### 4. Affichage de la Traduction - Deux Modes

**Mode 1 : Superposition**
- La traduction s'affiche en superposition sur le texte original
- Permet de voir le texte japonais et la traduction simultanément
- Idéal pour l'apprentissage

**Mode 2 : Remplacement**
- Le texte original est masqué et remplacé par la traduction
- Offre une expérience de lecture fluide
- Idéal pour une lecture immersive

### 5. Interface de Lecteur de Manga
- **Navigation fluide** entre les pages (précédent/suivant)
- **Zoom pinch-to-zoom** pour agrandir l'image
- **Déplacement** fluide de l'image
- **Indicateur de progression** pendant la traduction
- **Affichage du texte original** au toucher d'une bulle

### 6. Historique et Sauvegarde
- **Historique des traductions** : Accès rapide aux 50 dernières pages traduites
- **Sauvegarde des images traduites** : Stockage local des traductions
- **Suppression sélective** de l'historique

## 📱 Structure du Projet

```
manga_translator/
├── app/
│   ├── _layout.tsx                 # Layout racine avec providers
│   ├── reader.tsx                  # Écran de lecteur de manga
│   ├── history.tsx                 # Écran d'historique
│   └── (tabs)/
│       ├── _layout.tsx             # Layout des onglets
│       └── index.tsx               # Écran d'accueil
├── components/
│   ├── screen-container.tsx        # Composant SafeArea
│   ├── ui/
│   │   └── icon-symbol.tsx         # Mapping des icônes
│   └── haptic-tab.tsx              # Bouton d'onglet avec feedback haptique
├── lib/
│   ├── ocr-service.ts              # Service OCR (Tesseract.js)
│   ├── translation-service.ts      # Service de traduction
│   ├── store.ts                    # Store Zustand pour l'état global
│   ├── trpc.ts                     # Client TRPC
│   ├── utils.ts                    # Utilitaires (cn, etc.)
│   ├── theme-provider.tsx          # Fournisseur de thème
│   └── _core/
│       ├── theme.ts                # Configuration du thème
│       └── manus-runtime.ts        # Runtime Manus
├── hooks/
│   ├── use-colors.ts               # Hook pour les couleurs du thème
│   ├── use-color-scheme.ts         # Hook pour le mode clair/sombre
│   └── use-auth.ts                 # Hook pour l'authentification
├── assets/
│   └── images/
│       ├── icon.png                # Logo de l'application
│       ├── splash-icon.png         # Icône splash screen
│       ├── favicon.png             # Favicon web
│       └── android-icon-*.png      # Icônes Android
├── app.config.ts                   # Configuration Expo
├── package.json                    # Dépendances du projet
├── tailwind.config.js              # Configuration Tailwind CSS
├── theme.config.js                 # Configuration du thème
├── design.md                       # Document de conception
├── todo.md                         # Liste des tâches
└── README.md                       # Ce fichier
```

## 🛠️ Installation

### Prérequis
- Node.js 18+ et npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- Un téléphone Android ou iOS avec Expo Go installé (optionnel)

### Étapes d'installation

1. **Cloner ou accéder au projet**
   ```bash
   cd /home/ubuntu/manga_translator
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   pnpm dev
   ```

4. **Accéder à l'application**
   - **Sur le web** : Ouvrir `http://localhost:8081` dans le navigateur
   - **Sur mobile** : Scanner le code QR avec Expo Go ou utiliser l'URL exposée

### Dépendances Principales

| Paquet | Version | Utilisation |
|--------|---------|-------------|
| `react-native` | 0.81.5 | Framework mobile |
| `expo` | ~54.0.29 | Plateforme Expo |
| `expo-router` | ~6.0.19 | Routage et navigation |
| `nativewind` | 4.2.1 | Tailwind CSS pour React Native |
| `tesseract.js` | Dernier | OCR pour la détection de texte |
| `zustand` | Dernier | Gestion d'état |
| `@react-native-async-storage/async-storage` | 2.2.0 | Stockage local persistant |
| `expo-image-picker` | Dernier | Sélection d'images |
| `expo-media-library` | Dernier | Accès à la galerie |

## 🚀 Utilisation

### Flux Utilisateur Principal

1. **Démarrage** : Ouvrir l'application → Écran d'accueil
2. **Import** : Appuyer sur "Importer une image" → Sélectionner depuis la galerie
3. **Lecture** : L'image s'affiche dans le lecteur
4. **Navigation** : Utiliser les boutons précédent/suivant pour naviguer entre les pages
5. **Traduction** : Appuyer sur "Traduire" pour lancer l'OCR et la traduction
6. **Visualisation** : La traduction s'affiche selon le mode sélectionné
7. **Historique** : Accéder à l'historique depuis l'écran d'accueil

### Changement de Mode de Traduction

- **Mode 1 (Superposition)** : La traduction s'affiche sur le texte original
- **Mode 2 (Remplacement)** : Le texte original est remplacé par la traduction
- Changer le mode depuis l'écran d'accueil ou l'écran de lecteur

## 🎨 Design et Interface

### Palette de Couleurs
- **Primaire** : #0a7ea4 (Bleu ciel)
- **Arrière-plan** : #ffffff (Blanc) / #151718 (Noir en mode sombre)
- **Surface** : #f5f5f5 (Gris clair) / #1e2022 (Gris foncé)
- **Texte** : #11181C (Noir) / #ECEDEE (Blanc)
- **Succès** : #22C55E (Vert)
- **Erreur** : #EF4444 (Rouge)

### Principes de Design
- **Minimaliste** : Interface épurée et intuitive
- **Mobile-first** : Optimisé pour écrans mobiles en portrait
- **Accessible** : Contraste suffisant, icônes claires
- **Responsive** : Adaptation automatique à différentes tailles d'écran

## 🔧 Architecture Technique

### Gestion d'État
L'application utilise **Zustand** pour la gestion d'état global :
- Mode de traduction (overlay/replace)
- Images du manga en cours de lecture
- Historique des traductions
- État de progression de la traduction

### Stockage Persistant
- **AsyncStorage** : Sauvegarde locale du mode de traduction et de l'historique
- **Système de fichiers** : Stockage des images importées

### Services Principaux

#### OCR Service (`lib/ocr-service.ts`)
- Initialisation du worker Tesseract.js
- Reconnaissance du texte japonais
- Détection des bulles de dialogue avec coordonnées
- Gestion de la mémoire et des ressources

#### Translation Service (`lib/translation-service.ts`)
- Traduction du texte japonais vers le français
- Utilisation de l'API MyMemory (gratuite)
- Gestion des erreurs et fallback

#### App Store (`lib/store.ts`)
- État global de l'application
- Persistance avec AsyncStorage
- Actions pour modifier l'état

## 📊 Flux de Données

```
Utilisateur
    ↓
Importe une image
    ↓
Image stockée dans le state (Zustand)
    ↓
Appuie sur "Traduire"
    ↓
OCR Service (Tesseract.js)
    ↓
Détection du texte japonais
    ↓
Translation Service (MyMemory API)
    ↓
Traduction en français
    ↓
Affichage selon le mode sélectionné
    ↓
Sauvegarde dans l'historique
```

## 🚀 Améliorations Futures de l'IA

### 1. OCR Amélioré
- **Modèles d'IA spécialisés** : Entraîner des modèles OCR spécifiquement pour le manga
- **Détection de bulles avancée** : Utiliser la vision par ordinateur pour détecter les formes de bulles
- **Reconnaissance de caractères manuscrits** : Support des textes manuscrits dans les mangas

### 2. Traduction Contextuelle
- **Modèles de traduction neuronaux** : Utiliser des modèles comme Google Translate API ou DeepL
- **Contexte de manga** : Entraîner des modèles sur des corpus de mangas pour une traduction plus naturelle
- **Dictionnaire spécialisé** : Créer un dictionnaire des termes spécifiques aux mangas

### 3. Traitement d'Image Avancé
- **Correction d'image** : Améliorer la qualité des images avant l'OCR
- **Détection de texte blanc sur fond** : Améliorer la détection du texte blanc
- **Suppression du texte original** : Nettoyer automatiquement le texte original avant d'ajouter la traduction

### 4. Intégration Backend
- **Serveur de traduction personnalisé** : Créer un serveur dédié avec des modèles optimisés
- **Cache de traductions** : Stocker les traductions précédentes pour accélérer les requêtes
- **Synchronisation cloud** : Synchroniser l'historique entre appareils

### 5. Machine Learning
- **Fine-tuning de modèles** : Adapter les modèles OCR et de traduction aux mangas
- **Apprentissage actif** : Utiliser les corrections utilisateur pour améliorer les modèles
- **Prédiction intelligente** : Prédire le texte manquant ou flou

### 6. Fonctionnalités Avancées
- **Reconnaissance de personnages** : Identifier les personnages et adapter la traduction
- **Détection d'onomatopées** : Gérer spécifiquement les effets sonores
- **Traduction de texte en image** : Générer des images avec le texte traduit

## 🔐 Sécurité et Confidentialité

- **Stockage local** : Les images sont stockées localement sur l'appareil
- **Pas de serveur** : L'application fonctionne principalement hors ligne
- **API gratuite** : Utilisation d'API publiques sans authentification requise
- **Données utilisateur** : Aucune donnée utilisateur n'est envoyée à des serveurs externes

## 📝 Notes de Développement

### Tesseract.js
- Tesseract.js est une implémentation JavaScript de Tesseract OCR
- Supporte le japonais (jpn) avec le modèle LSTM
- Fonctionne dans le navigateur et sur mobile via React Native
- Peut être lent sur les appareils faibles ; considérer une optimisation future

### MyMemory Translation API
- API gratuite sans clé requise
- Limite de requêtes : ~1000 par jour
- Latence : ~100-500ms par requête
- Alternative future : Google Translate API, DeepL, ou serveur personnalisé

### Zustand vs Redux
- Zustand choisi pour sa simplicité et légèreté
- Moins de boilerplate que Redux
- Persistance facile avec middleware
- Idéal pour les applications mobiles

## 🐛 Dépannage

### L'OCR est lent
- **Solution** : Réduire la taille de l'image avant le traitement
- **Alternative** : Utiliser un serveur backend dédié

### La traduction est incorrecte
- **Solution** : Vérifier la qualité de l'image
- **Alternative** : Utiliser une API de traduction plus avancée

### L'application se bloque
- **Solution** : Vérifier la mémoire disponible
- **Alternative** : Traiter les images par batch

## 📞 Support

Pour toute question ou problème, veuillez consulter :
- La documentation Expo : https://docs.expo.dev
- La documentation Tesseract.js : https://github.com/naptha/tesseract.js
- La documentation React Native : https://reactnative.dev

## 📄 Licence

Ce projet est fourni à titre d'exemple éducatif. Utilisez-le librement pour vos besoins personnels.

---

**Créé avec ❤️ pour les fans de manga**
