# ⚡ SpeedType

Une application web moderne de test de rapidité de frappe développée avec Vue.js 3 et TypeScript.

🚀 **[Essayer l'application en ligne](https://speedtypes.netlify.app/)**

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite&logoColor=white)

## 📖 Description

SpeedType est une application interactive qui permet de tester et d'améliorer sa vitesse de frappe à travers différents niveaux de difficulté. L'application mesure la vitesse (WPM), la précision et le nombre d'erreurs pour fournir des statistiques détaillées de performance.

## ✨ Fonctionnalités

### 🎯 Test de Frappe
- **Mesure en temps réel** : WPM (mots par minute), précision, erreurs
- **Fin automatique** : Le test se termine dès que vous tapez le point final "."
- **Chronométrage précis** : Timer intégré avec affichage en temps réel
- **Validation intelligente** : Gestion des espaces multiples sans pénalité

### 🏆 Niveaux de Difficulté
- **🌱 Facile** : 10 phrases avec vocabulaire simple et logique quotidienne
- **⚡ Moyen** : 10 phrases avec vocabulaire plus riche et thèmes variés
- **🔥 Difficile** : 10 phrases avec mots mélangés sans logique narrative
- **💀 Hardcore** : Génération aléatoire de 15-25 mots techniques complexes

### 📊 Statistiques Détaillées
- **WPM** : Vitesse de frappe en mots par minute
- **Précision** : Pourcentage de caractères corrects
- **Erreurs** : Nombre total de fautes (même corrigées)
- **Temps** : Durée totale du test
- **Messages personnalisés** : Feedback motivant selon les performances

### 🎮 Interface Utilisateur
- **Design moderne** : Interface responsive et élégante
- **Progression visuelle** : Barre de progression et coloration en temps réel
- **Modal de résultats** : Affichage complet des statistiques
- **Sélecteur de difficulté** : Interface intuitive avec badges colorés

### 🔒 Sécurité Anti-Triche
- **Raccourcis bloqués** : Copier-coller désactivé pendant les tests
- **Phrase cachée** : Révélation uniquement après avoir cliqué "Commencer"
- **Test équitable** : Conditions identiques pour tous les utilisateurs

## 🚀 Installation

### Prérequis
- **Node.js** : Version 20.19.0 ou supérieure
- **npm** : Gestionnaire de paquets

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/lucasrebl/speedType.git
cd speedType
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en mode développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 🛠️ Scripts Disponibles

```bash
# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Vérification TypeScript
npm run type-check

# Linting avec correction automatique
npm run lint
```

## 🏗️ Architecture

### Structure du Projet
```
src/
├── components/          # Composants Vue réutilisables
│   ├── DifficultySelector.vue
│   ├── TextDisplay.vue
│   ├── TypingInput.vue
│   ├── StatsDisplay.vue
│   ├── TestControls.vue
│   ├── ResultsModal.vue
│   ├── DifficultyDisplay.vue
│   └── RulesInfo.vue
├── services/           # Logique métier
│   ├── sentenceService.ts
│   ├── statsService.ts
│   ├── typingValidationService.ts
│   ├── timerService.ts
│   └── useTypingTest.ts
├── views/             # Pages principales
│   └── HomeView.vue
└── router/           # Configuration des routes
    └── index.ts
```

### Séparation des Responsabilités
- **Services** : Logique métier pure (calculs, validation, données)
- **Components** : Interface utilisateur réutilisable
- **Views** : Orchestration et coordination des composants
- **Composables** : État réactif et interactions utilisateur

## 🎨 Technologies Utilisées

- **Frontend** : Vue.js 3 (Composition API)
- **Langage** : TypeScript pour la sécurité des types
- **Build Tool** : Vite pour le développement et la production
- **Router** : Vue Router 4 pour la navigation
- **Styling** : CSS scoped et responsive design
- **Linting** : ESLint + Oxlint pour la qualité du code

## 🎯 Comment Jouer

1. **Choisir une difficulté** parmi les 4 niveaux disponibles
2. **Cliquer sur "Commencer"** pour révéler la phrase et démarrer le timer
3. **Taper la phrase** affichée le plus rapidement et précisément possible
4. **Terminer automatiquement** en tapant le point final "."
5. **Consulter les résultats** dans la modal avec statistiques détaillées
6. **Recommencer** avec la même phrase ou choisir un nouveau test

## 🏅 Conseils pour Améliorer

- Privilégiez la **précision** à la vitesse au début
- Maintenez une **posture droite** et détendez vos mains
- Regardez **l'écran**, pas le clavier
- **Pratiquez régulièrement** pour développer la mémoire musculaire
- Commencez par le niveau **facile** puis progressez graduellement

## 🔧 Configuration IDE Recommandée

**VS Code** + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Extensions utiles :
- Vue.js devtools pour navigateur
- TypeScript Vue Plugin (Volar)
- ESLint pour VS Code

---

**Développé avec ❤️ par [lucasrebl](https://github.com/lucasrebl)**
