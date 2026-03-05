# Design - Manga Translator

## Vue d'ensemble
Application mobile minimaliste pour traduire automatiquement les pages de manga du japonais au français. L'interface suit les principes du Human Interface Guidelines d'Apple avec une orientation portrait optimisée pour une utilisation à une main.

## Écrans de l'application

### 1. Écran d'accueil (Home)
**Objectif:** Point d'entrée principal pour l'utilisateur.

**Contenu principal:**
- Logo/icône de l'application en haut
- Titre "Manga Translator"
- Bouton principal "Importer une image" (large, visible)
- Bouton secondaire "Importer un dossier/CBZ"
- Bouton tertiaire "Historique" (si des traductions ont été effectuées)
- Indicateur de mode actuel (Mode 1 ou Mode 2)

**Fonctionnalité:**
- Navigation vers l'écran de sélection d'image
- Accès à l'historique des pages traduites
- Changement rapide du mode de traduction

---

### 2. Écran de lecteur de manga (Reader)
**Objectif:** Afficher l'image du manga avec les fonctionnalités de lecture.

**Contenu principal:**
- Image du manga au centre (avec zoom et déplacement)
- Barre de navigation inférieure avec:
  - Bouton "Page précédente" (flèche gauche)
  - Indicateur de page actuelle (ex: "Page 3/10")
  - Bouton "Page suivante" (flèche droite)
- Barre supérieure avec:
  - Bouton "Retour"
  - Bouton "Traduire" (lancer la traduction)
  - Bouton "Mode" (basculer entre Mode 1 et Mode 2)

**Fonctionnalité:**
- Affichage de l'image avec zoom pinch-to-zoom
- Déplacement fluide de l'image
- Navigation entre les pages
- Bouton traduire pour lancer le processus OCR + traduction

---

### 3. Écran de traduction en cours (Processing)
**Objectif:** Afficher la progression de la traduction.

**Contenu principal:**
- Image du manga avec overlay semi-transparent
- Indicateur de progression circulaire au centre
- Texte "Détection du texte..." ou "Traduction en cours..."
- Bouton "Annuler" en bas

**Fonctionnalité:**
- Afficher la progression étape par étape (OCR, traduction)
- Permettre l'annulation du processus

---

### 4. Écran de résultat traduit (Translated Result)
**Objectif:** Afficher l'image traduite avec les deux modes possibles.

**Contenu principal:**
- Image du manga avec traduction superposée (Mode 1) ou remplacée (Mode 2)
- Barre inférieure avec:
  - Bouton "Retour à l'original"
  - Bouton "Sauvegarder l'image"
  - Bouton "Partager"
  - Bouton "Voir le texte japonais" (au toucher d'une bulle)

**Fonctionnalité:**
- Affichage de la traduction selon le mode sélectionné
- Possibilité de toucher une bulle pour voir le texte original
- Sauvegarde de l'image traduite
- Partage de l'image

---

### 5. Écran d'historique (History)
**Objectif:** Afficher les pages traduites précédemment.

**Contenu principal:**
- Liste des images traduites (grille ou liste)
- Miniatures des pages
- Date et heure de la traduction
- Bouton "Supprimer" par élément

**Fonctionnalité:**
- Affichage des traductions précédentes
- Suppression de l'historique
- Accès rapide aux traductions

---

## Flux utilisateur principal

1. **Démarrage:** Utilisateur ouvre l'application → Écran d'accueil
2. **Import:** Utilisateur appuie sur "Importer une image" → Sélection d'image
3. **Lecture:** Image affichée dans le lecteur → Utilisateur peut naviguer entre les pages
4. **Traduction:** Utilisateur appuie sur "Traduire" → Écran de progression
5. **Résultat:** Traduction affichée selon le mode sélectionné
6. **Actions:** Utilisateur peut sauvegarder, partager ou revenir à l'original

---

## Palette de couleurs

### Couleurs principales
- **Primaire:** `#0a7ea4` (Bleu ciel - accent principal)
- **Arrière-plan:** `#ffffff` (Blanc en mode clair) / `#151718` (Noir en mode sombre)
- **Surface:** `#f5f5f5` (Gris clair en mode clair) / `#1e2022` (Gris foncé en mode sombre)
- **Texte principal:** `#11181C` (Noir en mode clair) / `#ECEDEE` (Blanc en mode sombre)
- **Texte secondaire:** `#687076` (Gris en mode clair) / `#9BA1A6` (Gris clair en mode sombre)
- **Bordures:** `#E5E7EB` (Gris très clair en mode clair) / `#334155` (Gris foncé en mode sombre)
- **Succès:** `#22C55E` (Vert)
- **Erreur:** `#EF4444` (Rouge)

### Utilisation
- Boutons primaires: Bleu ciel (#0a7ea4)
- Texte traduit: Vert (#22C55E) pour la distinction
- Erreurs/Avertissements: Rouge (#EF4444)
- Bulles de dialogue: Surface avec bordure

---

## Considérations de conception

### Optimisation mobile
- Boutons de grande taille (minimum 44x44 pt) pour faciliter le toucher
- Espacement généreux entre les éléments
- Texte lisible (minimum 16pt pour le corps)
- Navigation intuitive avec peu d'étapes

### Accessibilité
- Contraste suffisant entre le texte et l'arrière-plan
- Icônes accompagnées de labels textuels
- Support du mode sombre natif

### Performance
- Chargement progressif des images
- Optimisation des images pour mobile
- Cache des traductions précédentes

---

## Interactions clés

### Zoom et déplacement
- Pinch-to-zoom pour agrandir l'image
- Déplacement fluide avec un doigt
- Double-tap pour réinitialiser le zoom

### Toucher une bulle
- Affichage du texte japonais original
- Animation de transition douce
- Possibilité de masquer le texte avec un tap secondaire

### Changement de mode
- Bouton de basculement rapide
- Transition fluide entre les modes
- Indication visuelle du mode actif

---

## Typographie

- **Titre principal:** 32pt, Gras
- **Titres secondaires:** 20pt, Gras
- **Texte du corps:** 16pt, Régulier
- **Texte secondaire:** 14pt, Régulier
- **Labels:** 12pt, Régulier

---

## Icônes

- Importer: Icône de dossier ou galerie
- Traduire: Icône de traduction (bulle de dialogue)
- Mode: Icône de basculement
- Historique: Icône d'horloge
- Sauvegarder: Icône de disquette
- Partager: Icône de partage
- Retour: Icône de flèche gauche
