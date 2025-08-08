# Scripts de Débogage des Stores

Ce dossier contient des scripts pour déboguer et visualiser les données temporaires stockées dans les stores Pinia.

## 📁 Fichiers disponibles

### 1. `debug-stores.js`
Script Node.js pour afficher les données des stores depuis le terminal.

**Usage :**
```bash
# Depuis le dossier frontend
npm run debug-stores

# Ou directement
node src/scripts/debug-stores.js
```

### 2. `debug-stores-browser.js`
Script pour le navigateur qui expose des fonctions de débogage dans la console.

**Usage :**
1. Ouvrir la console du navigateur (F12)
2. Utiliser les fonctions disponibles via `debugStores`

## 🔧 Fonctions disponibles dans le navigateur

Une fois l'application chargée, les fonctions suivantes sont disponibles dans la console :

### `debugStores.user()`
Affiche les données du store utilisateur :
- Téléphone
- État de connexion
- Informations utilisateur (nom, email, pays, etc.)
- Crédits
- État de chargement
- Erreurs

### `debugStores.signup()`
Affiche les données du store d'inscription :
- Numéro de téléphone
- Photo de profil
- Nom complet
- Pays
- Années d'expérience
- Mode de gestion
- Méthode de contact

### `debugStores.summary()`
Affiche un résumé concis :
- État de connexion
- Inscription en cours
- Informations principales

### `debugStores.all()`
Affiche toutes les données des stores (utilisateur + signup + résumé)

### `debugStores.raw()`
Affiche les données brutes des stores (objets complets)

### `debugStores.watch()`
Active la surveillance en temps réel des changements dans les stores

## 📊 Exemple d'utilisation

```javascript
// Afficher toutes les données
debugStores.all()

// Afficher seulement le store utilisateur
debugStores.user()

// Afficher seulement le store signup
debugStores.signup()

// Afficher un résumé
debugStores.summary()

// Surveiller les changements
debugStores.watch()

// Afficher les données brutes
debugStores.raw()
```

## 🎯 Cas d'usage

### Déboguer l'authentification
```javascript
debugStores.user()
```
Vérifier si l'utilisateur est connecté et ses informations.

### Déboguer le processus d'inscription
```javascript
debugStores.signup()
```
Voir les données saisies lors de l'inscription.

### Surveiller les changements
```javascript
debugStores.watch()
```
Voir en temps réel quand les données changent.

### Vérifier l'état global
```javascript
debugStores.summary()
```
Avoir un aperçu rapide de l'état de l'application.

## 🔍 Informations affichées

### Store Utilisateur
- **Téléphone** : Numéro en mémoire
- **Utilisateur** : État de connexion
- **Nom** : Nom de l'utilisateur
- **Email** : Adresse email
- **Pays** : Pays de l'utilisateur
- **Photo** : Photo de profil
- **Crédits** : Nombre de crédits disponibles
- **Profil complet** : Si le profil est complet
- **Dernière connexion** : Date de dernière connexion
- **Chargement** : État de chargement
- **Erreur** : Messages d'erreur

### Store Signup
- **Numéro de téléphone** : Téléphone saisi
- **Photo de profil** : Photo sélectionnée
- **Nom complet** : Nom saisi
- **Pays** : Pays sélectionné
- **Années d'expérience** : Expérience saisie
- **Mode de gestion** : Mode choisi
- **Méthode de contact** : Méthode préférée

## 💡 Conseils

1. **Utilisez `debugStores.all()`** pour avoir une vue d'ensemble
2. **Utilisez `debugStores.watch()`** pour déboguer les interactions
3. **Relancez les fonctions** après chaque action pour voir les changements
4. **Vérifiez les erreurs** dans les données affichées
5. **Utilisez `debugStores.raw()`** pour voir la structure complète des données

## 🚨 Dépannage

### "Pinia non trouvé"
- Assurez-vous que l'application Vue est chargée
- Vérifiez que Pinia est bien installé et configuré

### "Store non trouvé"
- Vérifiez que les stores sont bien définis
- Assurez-vous que l'application est initialisée

### Données vides
- Vérifiez que l'utilisateur est connecté
- Vérifiez que les données ont été saisies
- Relancez la fonction après une action 