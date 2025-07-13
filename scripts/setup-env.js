const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Configuration MongoDB Atlas pour Vania Flow');
console.log('===============================================\n');

async function setupEnvironment() {
  try {
    // Vérifier si le fichier .env existe déjà
    if (fs.existsSync('.env')) {
      const overwrite = await question('Le fichier .env existe déjà. Voulez-vous le remplacer ? (y/n): ');
      if (overwrite.toLowerCase() !== 'y') {
        console.log('Configuration annulée.');
        rl.close();
        return;
      }
    }

    console.log('📋 Veuillez fournir les informations de votre cluster MongoDB Atlas :\n');

    const username = await question('Nom d\'utilisateur MongoDB (ex: vaniaflow_user): ');
    const password = await question('Mot de passe MongoDB: ');
    const clusterUrl = await question('URL du cluster (ex: cluster0.abc123.mongodb.net): ');

    // Construire la chaîne de connexion
    const mongoUri = `mongodb+srv://${username}:${password}@${clusterUrl}/vainiaFlowDB?retryWrites=true&w=majority`;

    // Créer le contenu du fichier .env
    const envContent = `# Configuration MongoDB Atlas pour Vania Flow
# Généré automatiquement le ${new Date().toISOString()}

# Chaîne de connexion MongoDB Atlas
MONGODB_URI=${mongoUri}

# Informations du cluster :
# - Utilisateur: ${username}
# - Cluster: ${clusterUrl}
# - Base de données: vainiaFlowDB
`;

    // Écrire le fichier .env
    fs.writeFileSync('.env', envContent);

    console.log('\n✅ Fichier .env créé avec succès !');
    console.log('📁 Fichier: .env');
    console.log('🔗 URI: ' + mongoUri.replace(password, '***'));

    // Proposer de tester la connexion
    const testConnection = await question('\nVoulez-vous tester la connexion maintenant ? (y/n): ');
    if (testConnection.toLowerCase() === 'y') {
      console.log('\n🧪 Test de connexion...');
      
      // Importer les variables d'environnement
      require('dotenv').config();
      
      // Tester la connexion
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI);
      
      try {
        await client.connect();
        console.log('✅ Connexion réussie !');
        await client.close();
      } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
        console.log('💡 Vérifiez :');
        console.log('   - Votre nom d\'utilisateur et mot de passe');
        console.log('   - L\'URL de votre cluster');
        console.log('   - Les règles de sécurité réseau dans MongoDB Atlas');
      }
    }

    console.log('\n🎉 Configuration terminée !');
    console.log('Vous pouvez maintenant lancer : npm run install-db');

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
  } finally {
    rl.close();
  }
}

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

// Démarrer la configuration
setupEnvironment(); 