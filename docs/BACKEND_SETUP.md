# Configuration Backend Vania Flow

Guide complet pour configurer et utiliser le backend Node.js avec Express et Mongoose.

## 🎯 Objectif

Ce backend fournit une base solide pour l'application Vania Flow avec :
- Connexion MongoDB optimisée via Mongoose
- Structure Express modulaire et maintenable
- Sécurité et performance intégrées
- Prêt pour l'ajout de modèles et routes

## 📋 Prérequis

- Node.js 16+ 
- MongoDB (local ou Atlas)
- npm ou yarn

## 🚀 Installation rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp env.example .env

# Éditer avec vos configurations
nano .env
```

### 3. Test de la connexion
```bash
# Test avec Mongoose
npm run test-mongoose

# Test avec le driver MongoDB natif
npm run test-db
```

### 4. Démarrage du serveur
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## ⚙️ Configuration détaillée

### Variables d'environnement

#### Serveur
```env
PORT=5000                    # Port du serveur
NODE_ENV=development         # Environnement (development/production)
```

#### MongoDB
```env
# MongoDB local
MONGODB_URI=mongodb://localhost:27017

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net
```

#### Sécurité
```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## 🗄️ Configuration Mongoose

### Fichier `config/database.js`

La configuration Mongoose inclut :

```javascript
const options = {
  dbName: 'vaniaFlowDB',
  maxPoolSize: 10,              // Pool de connexions
  serverSelectionTimeoutMS: 5000, // Timeout sélection serveur
  socketTimeoutMS: 45000,       // Timeout opérations
  ssl: process.env.NODE_ENV === 'production',
  sslValidate: process.env.NODE_ENV === 'production',
};
```

### Gestion des événements

- **Connexion réussie** : Logs détaillés
- **Erreur de connexion** : Gestion d'erreur robuste
- **Déconnexion** : Reconnexion automatique
- **Fermeture** : Fermeture propre au shutdown

## 🔧 Scripts de test

### Test de connexion Mongoose
```bash
npm run test-mongoose
```

Ce script vérifie :
- ✅ Connexion à MongoDB
- ✅ Accès aux collections
- ✅ Performance (ping)
- ✅ Statistiques de la base
- ✅ Index des collections

### Test de connexion MongoDB native
```bash
npm run test-db
```

Ce script vérifie :
- ✅ Connexion avec le driver natif
- ✅ Collections et index
- ✅ Opérations CRUD de base
- ✅ Validations

## 📊 Endpoints de test

### Health Check
```http
GET http://localhost:5000/health
```

**Réponse :**
```json
{
  "status": "OK",
  "message": "Serveur Vania Flow opérationnel",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

### Database Status
```http
GET http://localhost:5000/db-status
```

**Réponse :**
```json
{
  "status": "OK",
  "database": {
    "connected": true,
    "name": "vaniaFlowDB",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🏗️ Architecture

### Structure des fichiers
```
config/
├── database.js    # Configuration Mongoose
└── app.js         # Configuration Express

server.js          # Point d'entrée
```

### Flux de démarrage
1. **Chargement des variables d'environnement**
2. **Configuration Express** (middleware, sécurité)
3. **Connexion MongoDB** (Mongoose)
4. **Configuration des routes**
5. **Démarrage du serveur**

## 🔒 Sécurité

### Middleware de sécurité
- **Helmet** : Headers de sécurité
- **CORS** : Configuration des origines
- **Morgan** : Logging des requêtes
- **Validation** : Parsing JSON sécurisé

### Headers de sécurité
```javascript
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

## 🐛 Dépannage

### Erreur de connexion MongoDB

**Symptômes :**
```
❌ Erreur lors de la connexion à MongoDB: connect ECONNREFUSED
```

**Solutions :**
1. Vérifiez que MongoDB est démarré
2. Vérifiez l'URI dans `.env`
3. Pour Atlas, vérifiez l'IP whitelist
4. Testez avec `npm run test-mongoose`

### Erreur de port

**Symptômes :**
```
❌ Erreur lors du démarrage du serveur: EADDRINUSE
```

**Solutions :**
1. Changez le port dans `.env`
2. Vérifiez qu'aucun autre service n'utilise le port
3. Redémarrez le serveur

### Erreur de dépendances

**Symptômes :**
```
❌ Cannot find module 'mongoose'
```

**Solutions :**
1. Réinstallez les dépendances : `npm install`
2. Vérifiez le fichier `package.json`
3. Supprimez `node_modules` et réinstallez

## 📝 Prochaines étapes

### 1. Créer des modèles Mongoose
```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // ...
});

module.exports = mongoose.model('User', userSchema);
```

### 2. Ajouter des routes
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  // Logique de récupération des utilisateurs
});

module.exports = router;
```

### 3. Implémenter des contrôleurs
```javascript
// controllers/userController.js
const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 🎉 Résultat

Vous avez maintenant un backend Node.js robuste avec :
- ✅ Connexion MongoDB optimisée
- ✅ Structure Express modulaire
- ✅ Sécurité intégrée
- ✅ Gestion d'erreurs
- ✅ Logging et monitoring
- ✅ Prêt pour le développement

Le backend est prêt à recevoir vos modèles Mongoose et routes Express ! 