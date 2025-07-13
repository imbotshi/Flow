# Vania Flow Backend

Backend Node.js moderne avec Express et Mongoose pour l'application Vania Flow.

## 🚀 Fonctionnalités

- **Express.js** - Framework web robuste et flexible
- **Mongoose** - ODM pour MongoDB avec validation et middleware
- **MongoDB** - Base de données NoSQL performante
- **Sécurité** - Helmet, CORS, validation des entrées
- **Logging** - Morgan pour les logs HTTP
- **Gestion d'erreurs** - Middleware global de gestion d'erreurs
- **Variables d'environnement** - Configuration flexible avec dotenv

## 📁 Structure du projet

```
Vania Flow/
├── config/
│   ├── database.js      # Configuration Mongoose
│   └── app.js          # Configuration Express
├── scripts/
│   ├── test-mongoose-connection.js  # Test connexion Mongoose
│   ├── install-database.js          # Installation DB
│   ├── test-database.js             # Tests DB
│   └── ...                          # Autres scripts
├── server.js           # Point d'entrée du serveur
├── package.json        # Dépendances et scripts
├── env.example         # Variables d'environnement
└── README.md          # Documentation
```

## 🛠️ Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd "Vania Flow"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   ```bash
   # Copier le fichier d'exemple
   cp env.example .env
   
   # Éditer le fichier .env avec vos configurations
   ```

4. **Configurer MongoDB**
   ```bash
   # Pour MongoDB local
   npm run configure
   
   # Ou pour MongoDB Atlas, éditez MONGODB_URI dans .env
   ```

## ⚙️ Configuration

### Variables d'environnement (.env)

```env
# Serveur
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017
# Pour Atlas: mongodb+srv://username:password@cluster.mongodb.net

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Sécurité
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

### Test de la connexion
```bash
# Test avec le driver MongoDB natif
npm run test-db

# Test avec Mongoose
node scripts/test-mongoose-connection.js
```

## 📊 Endpoints de test

Une fois le serveur démarré, vous pouvez tester :

- **Health Check**: `GET http://localhost:5000/health`
- **DB Status**: `GET http://localhost:5000/db-status`

## 🔧 Scripts disponibles

```bash
# Démarrage
npm start              # Mode production
npm run dev           # Mode développement avec nodemon

# Tests et vérifications
npm run test-db       # Test connexion MongoDB native
npm run test-mongoose # Test connexion Mongoose

# Configuration
npm run configure     # Configuration initiale
npm run install-db    # Installation base de données
npm run load-data     # Chargement données de test
npm run check-data    # Vérification données
```

## 🗄️ Base de données

### Configuration Mongoose

La connexion MongoDB est configurée dans `config/database.js` avec :

- **Pool de connexions** optimisé
- **Gestion d'erreurs** robuste
- **Reconnexion automatique**
- **Fermeture propre** au shutdown

### Collections existantes

- `utilisateurs` - Gestion des utilisateurs
- `partenaires` - Gestion des partenaires
- `paiements` - Historique des paiements
- `relances` - Système de relances
- `configurations` - Configuration système
- `messages_programmes` - Messages automatisés
- `historique_actions` - Audit trail
- `modes_paiement` - Méthodes de paiement
- `abonnements` - Gestion des abonnements

## 🔒 Sécurité

- **Helmet** - Headers de sécurité
- **CORS** - Configuration des origines autorisées
- **Validation** - Validation des entrées
- **Rate limiting** - Protection contre les attaques
- **Logging** - Audit des requêtes

## 📝 Prochaines étapes

1. **Créer vos modèles Mongoose** dans `models/`
2. **Ajouter vos routes** dans `routes/`
3. **Implémenter vos contrôleurs** dans `controllers/`
4. **Ajouter la validation** avec Joi ou express-validator
5. **Configurer l'authentification** JWT

## 🐛 Dépannage

### Erreur de connexion MongoDB

1. Vérifiez que MongoDB est démarré
2. Vérifiez l'URI dans `.env`
3. Pour Atlas, vérifiez l'IP whitelist
4. Testez avec `npm run test-mongoose`

### Erreur de port

1. Vérifiez que le port 5000 est libre
2. Changez le port dans `.env`
3. Redémarrez le serveur

## 📄 Licence

MIT - Vania Flow Team 