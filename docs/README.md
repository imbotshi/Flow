# 🚀 Base de Données Vania Flow

## 📋 Vue d'ensemble

Ce projet contient la configuration et les scripts pour installer et gérer la base de données MongoDB Atlas pour l'application Vania Flow.

## 🗄️ Structure de la base de données

La base de données `vainiaFlowDB` contient 9 collections optimisées :

- **👥 utilisateurs** - Gestion des utilisateurs (Gestionnaire, Partenaire, Client)
- **🤝 partenaires** - Gestion des partenaires commerciaux
- **💳 paiements** - Historique des transactions
- **📞 relances** - Suivi des relances de paiement
- **⚙️ configurations** - Paramètres utilisateur
- **📅 messages_programmes** - Messages programmés
- **📋 historique_actions** - Journal des actions
- **💱 modes_paiement** - Méthodes de paiement
- **📦 abonnements** - Plans d'abonnement

## 🚀 Installation rapide

### 1. Configuration MongoDB Atlas
```bash
npm run configure
```

### 2. Installation complète
```bash
npm run complete-setup
```

## 📝 Scripts disponibles

- `npm run configure` - Configuration interactive de MongoDB Atlas
- `npm run install-db` - Installation de la base de données
- `npm run test-db` - Test de la base de données
- `npm run load-data` - Chargement des données d'exemple
- `npm run check-data` - Vérification des données chargées
- `npm run complete-setup` - Installation complète + données + tests

## 📊 Données d'exemple

Le projet inclut des données d'exemple complètes :
- 5 utilisateurs (Gestionnaires, Partenaires, Clients)
- 8 modes de paiement
- 5 partenaires avec différents biens
- 5 paiements avec différents statuts
- 5 relances via différents canaux
- Configurations, messages programmés, historique, abonnements

## 📚 Documentation

- [`CONFIGURATION.md`](CONFIGURATION.md) - Guide de configuration MongoDB Atlas
- [`LOAD_DATA.md`](LOAD_DATA.md) - Guide de chargement des données
- [`QUICKSTART.md`](QUICKSTART.md) - Démarrage rapide

## 🔧 Développement

### Ajouter de nouvelles données
1. Modifiez `load-sample-data.js`
2. Relancez : `npm run load-data`

### Vérifier les données
```bash
npm run check-data
```

## 🛠️ Dépannage

### Erreur de connexion
- Vérifiez votre fichier `.env`
- Testez avec : `npm run test-db`

### Données manquantes
- Rechargez avec : `npm run load-data`

---

**🎉 Votre base de données Vania Flow est prête à l'emploi !** 