# 📊 Chargement Automatique des Données Vania Flow

## 🎯 Objectif

Ce guide vous permet de charger automatiquement des données d'exemple dans votre base de données MongoDB Atlas pour tester et développer votre application Vania Flow.

## 📋 Données d'exemple incluses

### 👥 **Utilisateurs (5 utilisateurs)**
- **Fatou Koné** - Gestionnaire Immobilier
- **Moussa Traoré** - Agent Commercial (Partenaire)
- **Aminata Ouattara** - Investisseur (Client)
- **Kouassi Bamba** - Promoteur Immobilier (Partenaire)
- **Mariam Diabaté** - Gestionnaire de Portefeuille

### 💱 **Modes de Paiement (8 modes)**
- Mobile Money, Virement Bancaire, Espèces, Chèque
- Orange Money, MTN Mobile Money, Moov Money
- Carte Bancaire (désactivée)

### 🤝 **Partenaires (5 partenaires)**
- Différents types de biens (appartements, villas, studios)
- Montants variés (1.2M à 7.5M FCFA)
- Statuts de relance différents

### 💳 **Paiements (5 paiements)**
- Différents statuts : payé, en attente, échoué
- Montants et modes de paiement variés
- Historique des relances

### 📞 **Relances (5 relances)**
- Différents canaux : SMS, WhatsApp, Appel, Email
- Statuts : réussie, échec, en attente
- Messages personnalisés

### ⚙️ **Configurations (5 configurations)**
- Paramètres utilisateur personnalisés
- Méthodes de contact variées
- Objectifs de taux de paiement

### 📅 **Messages Programmés (3 messages)**
- Messages de rappel et confirmation
- Dates programmées futures
- Statuts en attente

### 📋 **Historique des Actions (5 actions)**
- Journal des opérations utilisateur
- Types d'actions variés
- Traçabilité complète

### 📦 **Abonnements (5 abonnements)**
- Plans : gratuit, starter, pro, illimité
- Crédits disponibles
- Renouvellement automatique

## 🚀 Installation complète

### Option 1 : Installation complète en une commande
```bash
npm run complete-setup
```

Cette commande :
1. Installe les dépendances
2. Crée la base de données et les collections
3. Charge les données d'exemple
4. Teste la base de données

### Option 2 : Installation étape par étape

#### 1. Configuration MongoDB Atlas
```bash
npm run configure
```

#### 2. Installation de la base de données
```bash
npm run install-db
```

#### 3. Chargement des données d'exemple
```bash
npm run load-data
```

#### 4. Test de la base de données
```bash
npm run test-db
```

#### 5. Vérification des données chargées
```bash
npm run check-data
```

## 📊 Vérification des données

### Script de vérification automatique
```bash
npm run check-data
```

Ce script affiche :
- Nombre de documents par collection
- Exemples de données
- Statistiques détaillées
- Test des relations entre collections

### Vérification manuelle dans MongoDB Atlas

1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Allez dans votre cluster
3. Cliquez sur **"Browse Collections"**
4. Explorez la base de données `vainiaFlowDB`

## 🔄 Réinitialisation des données

Pour recharger les données d'exemple :

```bash
# Supprimer et recharger toutes les données
npm run load-data
```

**Note :** Ce script supprime d'abord toutes les données existantes avant de charger les nouvelles.

## 📈 Statistiques attendues

Après le chargement, vous devriez voir :

```
📊 Résumé des données chargées :
   - 8 modes de paiement
   - 5 utilisateurs
   - 5 configurations
   - 5 partenaires
   - 5 paiements
   - 5 relances
   - 3 messages programmés
   - 5 actions historiques
   - 5 abonnements
```

## 🎯 Utilisation des données d'exemple

### Test de l'application
- Connectez-vous avec les utilisateurs créés
- Testez les différents types d'utilisateurs
- Explorez les partenaires et paiements

### Développement
- Utilisez les données pour tester vos fonctionnalités
- Modifiez les données selon vos besoins
- Ajoutez de nouvelles données de test

### Démonstration
- Présentez l'application avec des données réalistes
- Montrez les différentes fonctionnalités
- Illustrez les workflows complets

## 🛠️ Personnalisation

### Modifier les données d'exemple
1. Éditez le fichier `load-sample-data.js`
2. Modifiez les tableaux de données
3. Relancez le script : `npm run load-data`

### Ajouter de nouvelles données
1. Ajoutez de nouveaux objets dans les tableaux
2. Respectez la structure des schémas
3. Maintenez les relations entre collections

## 🔍 Dépannage

### Erreur "Collection not found"
- Assurez-vous d'avoir d'abord lancé `npm run install-db`
- Vérifiez que la base de données existe

### Erreur de connexion
- Vérifiez votre fichier `.env`
- Testez la connexion avec `npm run test-db`

### Données manquantes
- Relancez le script : `npm run load-data`
- Vérifiez les logs d'erreur

---

**🎉 Vos collections sont maintenant chargées avec des données d'exemple complètes !** 