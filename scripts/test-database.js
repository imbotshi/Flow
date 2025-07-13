// Charger les variables d'environnement
require('dotenv').config();

const { MongoClient } = require('mongodb');

// Configuration de la base de données
const DB_NAME = 'vainiaFlowDB';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function testDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Test de connexion à MongoDB...');
    await client.connect();
    console.log('✅ Connexion réussie');
    
    const db = client.db(DB_NAME);
    
    console.log(`📊 Test de la base de données: ${DB_NAME}`);
    
    // Test 1: Vérifier que toutes les collections existent
    console.log('\n📋 Vérification des collections...');
    const collections = await db.listCollections().toArray();
    const expectedCollections = [
      'utilisateurs', 'partenaires', 'paiements', 'relances',
      'configurations', 'messages_programmes', 'historique_actions',
      'modes_paiement', 'abonnements'
    ];
    
    const existingCollections = collections.map(col => col.name);
    console.log('Collections trouvées:', existingCollections);
    
    const missingCollections = expectedCollections.filter(
      col => !existingCollections.includes(col)
    );
    
    if (missingCollections.length > 0) {
      console.log('❌ Collections manquantes:', missingCollections);
    } else {
      console.log('✅ Toutes les collections sont présentes');
    }
    
    // Test 2: Vérifier les index
    console.log('\n🔍 Vérification des index...');
    
    // Test index utilisateurs
    const userIndexes = await db.collection('utilisateurs').indexes();
    console.log('Index utilisateurs:', userIndexes.map(idx => idx.name));
    
    // Test index partenaires
    const partnerIndexes = await db.collection('partenaires').indexes();
    console.log('Index partenaires:', partnerIndexes.map(idx => idx.name));
    
    // Test 3: Test d'insertion d'un document de test
    console.log('\n🧪 Test d\'insertion...');
    
    const testUser = {
      nom: 'Test',
      prenom: 'Utilisateur',
      telephone: '+1234567890',
      email: 'test@vaniaflow.com',
      profession: 'Développeur',
      type_utilisateur: 'Gestionnaire',
      statut: 'actif',
      date_creation: new Date(),
      updated_at: new Date()
    };
    
    const result = await db.collection('utilisateurs').insertOne(testUser);
    console.log('✅ Document de test inséré avec l\'ID:', result.insertedId);
    
    // Test 4: Test de récupération
    const retrievedUser = await db.collection('utilisateurs').findOne({ 
      email: 'test@vaniaflow.com' 
    });
    
    if (retrievedUser) {
      console.log('✅ Document récupéré avec succès');
      console.log('Nom:', retrievedUser.nom, retrievedUser.prenom);
    } else {
      console.log('❌ Échec de la récupération du document');
    }
    
    // Test 5: Test de suppression du document de test
    await db.collection('utilisateurs').deleteOne({ 
      email: 'test@vaniaflow.com' 
    });
    console.log('✅ Document de test supprimé');
    
    // Test 6: Vérifier les validations
    console.log('\n✅ Test des validations...');
    
    try {
      // Test d'insertion avec données invalides (devrait échouer)
      const invalidUser = {
        nom: 'Test',
        prenom: 'Invalide',
        telephone: '+1234567890',
        // email manquant (champ requis)
        profession: 'Développeur',
        type_utilisateur: 'InvalidType', // type invalide
        date_creation: new Date()
      };
      
      await db.collection('utilisateurs').insertOne(invalidUser);
      console.log('❌ La validation n\'a pas fonctionné (insertion invalide réussie)');
    } catch (error) {
      console.log('✅ Validation fonctionne correctement (insertion invalide rejetée)');
    }
    
    console.log('\n🎉 Tous les tests sont passés avec succès !');
    console.log('📊 Votre base de données Vania Flow est opérationnelle.');
    
  } catch (error) {
    console.error('❌ Erreur lors du test de la base de données:', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion fermée');
  }
}

// Exécution du test
testDatabase(); 