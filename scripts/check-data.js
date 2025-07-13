// Charger les variables d'environnement
require('dotenv').config();

const { MongoClient } = require('mongodb');

// Configuration de la base de données
const DB_NAME = 'vainiaFlowDB';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function checkData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connexion à MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connecté à MongoDB Atlas avec succès');
    
    const db = client.db(DB_NAME);
    
    console.log(`📊 Vérification des données dans: ${DB_NAME}\n`);
    
    // Vérifier toutes les collections
    const collections = [
      'modes_paiement',
      'utilisateurs', 
      'configurations',
      'partenaires',
      'paiements',
      'relances',
      'messages_programmes',
      'historique_actions',
      'abonnements'
    ];
    
    for (const collectionName of collections) {
      console.log(`📋 Collection: ${collectionName}`);
      
      try {
        const count = await db.collection(collectionName).countDocuments();
        console.log(`   📊 Nombre de documents: ${count}`);
        
        if (count > 0) {
          // Afficher quelques exemples
          const samples = await db.collection(collectionName).find({}).limit(2).toArray();
          console.log(`   📝 Exemples:`);
          samples.forEach((doc, index) => {
            console.log(`      ${index + 1}. ${JSON.stringify(doc, null, 2).substring(0, 100)}...`);
          });
        }
        
        console.log('');
      } catch (error) {
        console.log(`   ❌ Erreur: ${error.message}`);
      }
    }
    
    // Statistiques détaillées
    console.log('📈 Statistiques détaillées:');
    console.log('==========================');
    
    // Utilisateurs par type
    const userStats = await db.collection('utilisateurs').aggregate([
      { $group: { _id: '$type_utilisateur', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\n👥 Utilisateurs par type:');
    userStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });
    
    // Paiements par statut
    const paymentStats = await db.collection('paiements').aggregate([
      { $group: { _id: '$statut', count: { $sum: 1 }, total: { $sum: '$montant' } } }
    ]).toArray();
    
    console.log('\n💳 Paiements par statut:');
    paymentStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} paiements (${stat.total.toLocaleString()} FCFA)`);
    });
    
    // Relances par canal
    const relanceStats = await db.collection('relances').aggregate([
      { $group: { _id: '$canal_envoye', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\n📞 Relances par canal:');
    relanceStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });
    
    // Abonnements par plan
    const abonnementStats = await db.collection('abonnements').aggregate([
      { $group: { _id: '$plan', count: { $sum: 1 } } }
    ]).toArray();
    
    console.log('\n📦 Abonnements par plan:');
    abonnementStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count}`);
    });
    
    // Test de relations
    console.log('\n🔗 Test des relations entre collections:');
    
    // Vérifier les relations utilisateurs-partenaires
    const userWithPartners = await db.collection('utilisateurs').aggregate([
      {
        $lookup: {
          from: 'partenaires',
          localField: '_id',
          foreignField: 'user_id',
          as: 'partenaires'
        }
      },
      { $match: { partenaires: { $ne: [] } } }
    ]).toArray();
    
    console.log(`   Utilisateurs avec partenaires: ${userWithPartners.length}`);
    
    // Vérifier les relations partenaires-relances
    const partnerWithRelances = await db.collection('partenaires').aggregate([
      {
        $lookup: {
          from: 'relances',
          localField: '_id',
          foreignField: 'partner_id',
          as: 'relances'
        }
      },
      { $match: { relances: { $ne: [] } } }
    ]).toArray();
    
    console.log(`   Partenaires avec relances: ${partnerWithRelances.length}`);
    
    console.log('\n✅ Vérification terminée !');
    console.log('📊 Votre base de données contient des données d\'exemple complètes.');
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion fermée');
  }
}

// Exécution du script
checkData(); 