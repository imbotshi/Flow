# 📜 Scripts Vania Flow Database

Ce dossier contient tous les scripts essentiels pour gérer la base de données Vania Flow.

## 🔧 Scripts disponibles

### `install-database.js`
- **Fonction** : Création de la base de données et des collections
- **Usage** : `npm run install-db`
- **Actions** :
  - Crée la base de données `vainiaFlowDB`
  - Crée 9 collections avec validation JSON Schema
  - Configure les index optimaux
  - Valide la structure des données

### `load-sample-data.js`
- **Fonction** : Chargement des données d'exemple
- **Usage** : `npm run load-data`
- **Actions** :
  - Charge 8 modes de paiement
  - Charge 5 utilisateurs (Gestionnaires, Partenaires, Clients)
  - Charge 5 partenaires avec différents biens
  - Charge 5 paiements avec différents statuts
  - Charge 5 relances via différents canaux
  - Charge configurations, messages, historique, abonnements

### `test-database.js`
- **Fonction** : Test de la base de données
- **Usage** : `npm run test-db`
- **Actions** :
  - Teste la connexion MongoDB Atlas
  - Vérifie l'existence des collections
  - Teste les index
  - Teste l'insertion/récupération de données
  - Valide les schémas JSON

### `check-data.js`
- **Fonction** : Vérification des données chargées
- **Usage** : `npm run check-data`
- **Actions** :
  - Affiche le nombre de documents par collection
  - Montre des exemples de données
  - Génère des statistiques détaillées
  - Teste les relations entre collections

### `setup-env.js`
- **Fonction** : Configuration interactive de MongoDB Atlas
- **Usage** : `npm run configure`
- **Actions** :
  - Demande les informations de connexion
  - Crée le fichier `.env`
  - Teste la connexion
  - Valide la configuration

## 🚀 Utilisation

Tous les scripts utilisent les variables d'environnement du fichier `.env` :

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vainiaFlowDB?retryWrites=true&w=majority
```

## 📊 Base de données

- **Nom** : `vainiaFlowDB`
- **Collections** : 9 collections optimisées
- **Validation** : Schémas JSON MongoDB
- **Index** : Index optimaux pour les performances
- **Relations** : Références ObjectId entre collections

## 🔍 Dépendances

- `mongodb` : Driver MongoDB pour Node.js
- `dotenv` : Gestion des variables d'environnement

---

**🎯 Scripts prêts pour la production !** 