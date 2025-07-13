# 🚀 Démarrage Rapide - Base de Données Vania Flow

## Installation en 3 étapes simples

### 1️⃣ Prérequis
- **Node.js** installé ([Télécharger ici](https://nodejs.org/))
- **Compte MongoDB Atlas** ([Créer ici](https://cloud.mongodb.com))

### 2️⃣ Configuration MongoDB Atlas
1. Connectez-vous à [MongoDB Atlas](https://cloud.mongodb.com)
2. Créez un nouveau projet
3. Créez un cluster (gratuit recommandé pour commencer)
4. Cliquez sur **"Connect"** → **"Connect your application"**
5. Créez un utilisateur avec mot de passe
6. Ajoutez votre IP aux règles de sécurité (ou `0.0.0.0/0` pour tout autoriser)
7. Copiez la chaîne de connexion

### 3️⃣ Installation automatique

#### Sur Windows :
```bash
# Double-cliquez sur install.bat
# Ou exécutez dans PowerShell :
.\install.bat
```

#### Sur Linux/Mac :
```bash
# Rendez le script exécutable et lancez-le
chmod +x install.sh
./install.sh
```

#### Manuellement :
```bash
# 1. Créez un fichier .env avec votre chaîne de connexion
echo "MONGODB_URI=mongodb+srv://bevangelistaesli:<k51tcFU4oXf715Lw0>@cluster0.v9daegs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 > .env

# 2. Installez et lancez
npm run full-setup
```

## ✅ Vérification

Après l'installation, vous devriez voir :
```
🎉 Tous les tests sont passés avec succès !
📊 Votre base de données Vania Flow est opérationnelle.
```

## 🔧 Scripts disponibles

- `npm run install-db` : Installe la base de données
- `npm run test-db` : Teste la base de données
- `npm run full-setup` : Installation complète + tests

## 🆘 Problèmes courants

### Erreur de connexion
- Vérifiez votre chaîne de connexion dans `.env`
- Assurez-vous que votre IP est autorisée dans MongoDB Atlas

### Erreur de permissions
- Utilisez un utilisateur avec le rôle `dbAdmin` dans MongoDB Atlas

### Node.js non trouvé
- Installez Node.js depuis [nodejs.org](https://nodejs.org/)

---

**🎉 Votre base de données est prête ! Vous pouvez maintenant développer votre application Vania Flow.** 