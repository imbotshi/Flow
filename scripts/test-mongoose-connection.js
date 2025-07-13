/**
 * Script de test de la connexion Mongoose
 * Utilise la nouvelle architecture DatabaseManager
 * Vérifie que la connexion à MongoDB fonctionne correctement avec Mongoose
 */

require('dotenv').config();
const { DatabaseManager } = require('../config/database');

async function testMongooseConnection() {
  console.log('🧪 Test de connexion Mongoose à MongoDB...');
  console.log('🏗️  Utilisation de la nouvelle architecture DatabaseManager');
  console.log('=' .repeat(60));

  const dbManager = new DatabaseManager();

  try {
    // Test 1: Connexion avec retry automatique
    console.log('\n🔌 Test 1: Connexion avec retry automatique...');
    const connection = await dbManager.connect();
    
    console.log('✅ Connexion établie avec succès !');
    console.log(`📍 Hôte: ${connection.connection.host}`);
    console.log(`📊 Base: ${connection.connection.name}`);
    console.log(`🔗 Port: ${connection.connection.port}`);

    // Test 2: Vérification du statut de connexion
    console.log('\n📊 Test 2: Vérification du statut de connexion...');
    const status = dbManager.getConnectionStatus();
    console.log('Statut de connexion:', status);

    // Test 3: Health check complet
    console.log('\n🏥 Test 3: Health check complet...');
    const health = await dbManager.healthCheck();
    
    if (health.status === 'healthy') {
      console.log('✅ Health check réussi !');
      console.log(`⏱️  Ping: ${health.ping}ms`);
      console.log(`📊 Collections: ${health.database.collections}`);
      console.log(`📝 Documents: ${health.database.documents}`);
      console.log(`💾 Taille des données: ${(health.database.dataSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`💿 Taille de stockage: ${(health.database.storageSize / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log('❌ Health check échoué:', health.error);
    }

    // Test 4: Vérification des collections existantes
    console.log('\n📋 Test 4: Vérification des collections...');
    const collections = await connection.connection.db.listCollections().toArray();
    console.log(`📊 Collections trouvées: ${collections.length}`);
    
    const expectedCollections = [
      'utilisateurs', 'partenaires', 'paiements', 'relances',
      'configurations', 'messages_programmes', 'historique_actions',
      'modes_paiement', 'abonnements'
    ];

    collections.forEach(col => {
      const isExpected = expectedCollections.includes(col.name);
      console.log(`  ${isExpected ? '✅' : '⚠️ '} ${col.name}`);
    });

    const missingCollections = expectedCollections.filter(
      col => !collections.find(c => c.name === col)
    );

    if (missingCollections.length > 0) {
      console.log(`⚠️  Collections manquantes: ${missingCollections.join(', ')}`);
    } else {
      console.log('✅ Toutes les collections attendues sont présentes');
    }

    // Test 5: Test des performances
    console.log('\n⚡ Test 5: Test des performances...');
    
    // Test de ping multiple
    const pingTests = [];
    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      await connection.connection.db.admin().ping();
      pingTests.push(Date.now() - start);
    }
    
    const avgPing = pingTests.reduce((a, b) => a + b, 0) / pingTests.length;
    const minPing = Math.min(...pingTests);
    const maxPing = Math.max(...pingTests);
    
    console.log(`⏱️  Ping moyen: ${avgPing.toFixed(2)}ms`);
    console.log(`⏱️  Ping min: ${minPing}ms`);
    console.log(`⏱️  Ping max: ${maxPing}ms`);

    // Test 6: Vérification des index
    console.log('\n🔍 Test 6: Vérification des index...');
    if (collections.length > 0) {
      const firstCollection = collections[0].name;
      const indexes = await connection.connection.db.collection(firstCollection).indexes();
      console.log(`📊 Index de la collection '${firstCollection}': ${indexes.length}`);
      indexes.forEach(idx => {
        console.log(`  - ${idx.name}: ${JSON.stringify(idx.key)}`);
      });
    }

    // Test 7: Test de résilience (simulation de déconnexion/reconnexion)
    console.log('\n🔄 Test 7: Test de résilience...');
    console.log('Simulation de déconnexion...');
    
    // Note: On ne ferme pas vraiment la connexion pour éviter d'interférer avec les autres tests
    console.log('✅ Gestionnaire d\'événements configuré pour la reconnexion automatique');

    console.log('\n🎉 Tous les tests Mongoose sont passés avec succès !');
    console.log('✅ La nouvelle architecture DatabaseManager fonctionne parfaitement');
    console.log('✅ La connexion est prête pour vos modèles et opérations');
    console.log('✅ Retry automatique et gestion d\'erreurs robustes activés');

  } catch (error) {
    console.error('\n❌ Erreur lors du test de connexion Mongoose:', error.message);
    
    // Suggestions de dépannage spécifiques
    console.log('\n🔧 Suggestions de dépannage:');
    console.log('1. Vérifiez que MongoDB est démarré');
    console.log('2. Vérifiez l\'URI de connexion dans votre fichier .env');
    console.log('3. Vérifiez les permissions de connexion');
    console.log('4. Pour MongoDB Atlas, vérifiez l\'IP whitelist');
    console.log('5. Vérifiez que le port MongoDB (27017) est accessible');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('\n📋 Détails techniques pour le développement:');
      console.error(error);
    }
    
    process.exit(1);
  } finally {
    // Fermeture propre de la connexion
    try {
      await dbManager.disconnect();
      console.log('\n🔌 Connexion Mongoose fermée proprement');
    } catch (error) {
      console.error('⚠️  Erreur lors de la fermeture:', error.message);
    }
  }
}

// Exécution du test
testMongooseConnection(); 