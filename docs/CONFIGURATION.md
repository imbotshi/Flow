# 🔧 Guide de Configuration MongoDB Atlas

## Étape 1 : Créer un utilisateur de base de données

### 1.1 Accéder à Database Access
1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur **"Database Access"**

### 1.2 Créer un nouvel utilisateur
1. Cliquez sur **"Add New Database User"**
2. Remplissez les informations :
   - **Username** : `vaniaflow_user` (ou un nom de votre choix)
   - **Password** : Créez un mot de passe sécurisé (notez-le !)
   - **Database User Privileges** : Sélectionnez **"Built-in Role"**
   - **Built-in Role** : Choisissez **"Atlas admin"** ou **"Read and write to any database"**
3. Cliquez sur **"Add User"**

## Étape 2 : Configurer l'accès réseau

### 2.1 Accéder à Network Access
1. Dans le menu de gauche, cliquez sur **"Network Access"**
2. Cliquez sur **"Add IP Address"**

### 2.2 Choisir une option d'accès
**Option A - Développement (moins sécurisé) :**
- Cliquez sur **"Allow Access from Anywhere"**
- Cela ajoute `0.0.0.0/0` (accès depuis n'importe où)

**Option B - Production (plus sécurisé) :**
- Cliquez sur **"Add Current IP Address"**
- Ou utilisez **"Allow Access from Specific IP Address"** pour votre IP

### 2.3 Confirmer
- Cliquez sur **"Confirm"**

## Étape 3 : Récupérer la chaîne de connexion

### 3.1 Accéder au cluster
1. Retournez à votre cluster principal
2. Cliquez sur le bouton **"Connect"**

### 3.2 Choisir la méthode de connexion
1. Sélectionnez **"Connect your application"**
2. Choisissez **"Node.js"** comme driver
3. Sélectionnez la version **"5.0 or later"**

### 3.3 Copier la chaîne de connexion
Vous verrez une chaîne comme :
```
mongodb+srv://vaniaflow_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Notez :**
- L'URL de votre cluster (ex: `cluster0.abc123.mongodb.net`)
- Votre nom d'utilisateur
- Votre mot de passe

## Étape 4 : Configuration automatique

### 4.1 Lancer le script de configuration
```bash
npm run configure
```

### 4.2 Suivre les instructions
Le script vous demandera :
- **Nom d'utilisateur MongoDB** : `vaniaflow_user`
- **Mot de passe MongoDB** : Le mot de passe que vous avez créé
- **URL du cluster** : L'URL de votre cluster (ex: `cluster0.abc123.mongodb.net`)

### 4.3 Tester la connexion
Le script proposera de tester la connexion automatiquement.

## Étape 5 : Installation de la base de données

Une fois la configuration terminée :

```bash
# Installation complète
npm run full-setup

# Ou étape par étape
npm run install-db
npm run test-db
```

## 🔍 Vérification

Après l'installation, vous devriez voir :
```
🎉 Tous les tests sont passés avec succès !
📊 Votre base de données Vania Flow est opérationnelle.
```

## 🛠️ Dépannage

### Erreur "Authentication failed"
- Vérifiez votre nom d'utilisateur et mot de passe
- Assurez-vous que l'utilisateur a les bonnes permissions

### Erreur "Network is unreachable"
- Vérifiez les règles de sécurité réseau dans MongoDB Atlas
- Assurez-vous que votre IP est autorisée

### Erreur "Server selection timed out"
- Vérifiez l'URL de votre cluster
- Assurez-vous que le cluster est actif

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur
2. Consultez la [documentation MongoDB Atlas](https://docs.atlas.mongodb.com/)
3. Vérifiez que votre cluster est bien configuré

---

**🎯 Votre base de données Vania Flow sera prête en quelques minutes !** 