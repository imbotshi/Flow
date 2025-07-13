// Charger les variables d'environnement
require('dotenv').config();

const { MongoClient, ObjectId } = require('mongodb');

// Configuration de la base de données
const DB_NAME = 'vainiaFlowDB';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function loadSampleData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connexion à MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connecté à MongoDB Atlas avec succès');
    
    const db = client.db(DB_NAME);
    
    console.log(`📊 Chargement des données d'exemple dans: ${DB_NAME}`);
    
    // --- COLLECTION: modes_paiement ---
    console.log('\n💱 Chargement des modes de paiement...');
    const modesPaiement = [
      { nom: 'Mobile Money', code: 'MOBILE_MONEY', disponible: true },
      { nom: 'Virement Bancaire', code: 'VIREMENT', disponible: true },
      { nom: 'Espèces', code: 'ESPECES', disponible: true },
      { nom: 'Chèque', code: 'CHEQUE', disponible: true },
      { nom: 'Carte Bancaire', code: 'CARTE', disponible: false },
      { nom: 'Orange Money', code: 'ORANGE_MONEY', disponible: true },
      { nom: 'MTN Mobile Money', code: 'MTN_MOBILE', disponible: true },
      { nom: 'Moov Money', code: 'MOOV_MONEY', disponible: true }
    ];
    
    await db.collection('modes_paiement').deleteMany({});
    const resultModes = await db.collection('modes_paiement').insertMany(modesPaiement);
    console.log(`✅ ${resultModes.insertedCount} modes de paiement chargés`);
    
    // --- COLLECTION: utilisateurs ---
    console.log('\n👥 Chargement des utilisateurs...');
    const utilisateurs = [
      {
        nom: 'Koné',
        prenom: 'Fatou',
        telephone: '+2250701234567',
        email: 'fatou.kone@vaniaflow.com',
        profession: 'Gestionnaire Immobilier',
        type_utilisateur: 'Gestionnaire',
        statut: 'actif',
        photo_url: 'https://example.com/photos/fatou.jpg',
        date_creation: new Date('2024-01-15'),
        updated_at: new Date()
      },
      {
        nom: 'Traoré',
        prenom: 'Moussa',
        telephone: '+2250702345678',
        email: 'moussa.traore@vaniaflow.com',
        profession: 'Agent Commercial',
        type_utilisateur: 'Partenaire',
        statut: 'actif',
        photo_url: 'https://example.com/photos/moussa.jpg',
        date_creation: new Date('2024-01-20'),
        updated_at: new Date()
      },
      {
        nom: 'Ouattara',
        prenom: 'Aminata',
        telephone: '+2250703456789',
        email: 'aminata.ouattara@vaniaflow.com',
        profession: 'Investisseur',
        type_utilisateur: 'Client',
        statut: 'actif',
        photo_url: 'https://example.com/photos/aminata.jpg',
        date_creation: new Date('2024-01-25'),
        updated_at: new Date()
      },
      {
        nom: 'Bamba',
        prenom: 'Kouassi',
        telephone: '+2250704567890',
        email: 'kouassi.bamba@vaniaflow.com',
        profession: 'Promoteur Immobilier',
        type_utilisateur: 'Partenaire',
        statut: 'actif',
        photo_url: 'https://example.com/photos/kouassi.jpg',
        date_creation: new Date('2024-02-01'),
        updated_at: new Date()
      },
      {
        nom: 'Diabaté',
        prenom: 'Mariam',
        telephone: '+2250705678901',
        email: 'mariam.diabate@vaniaflow.com',
        profession: 'Gestionnaire de Portefeuille',
        type_utilisateur: 'Gestionnaire',
        statut: 'actif',
        photo_url: 'https://example.com/photos/mariam.jpg',
        date_creation: new Date('2024-02-05'),
        updated_at: new Date()
      }
    ];
    
    await db.collection('utilisateurs').deleteMany({});
    const resultUsers = await db.collection('utilisateurs').insertMany(utilisateurs);
    console.log(`✅ ${resultUsers.insertedCount} utilisateurs chargés`);
    
    // Récupérer les IDs des utilisateurs pour les relations
    const userIds = Object.values(resultUsers.insertedIds);
    
    // --- COLLECTION: configurations ---
    console.log('\n⚙️ Chargement des configurations...');
    const configurations = [
      {
        utilisateur_id: userIds[0], // Fatou Koné
        annee_experience: 8,
        mode_management: 'automatique',
        methode_contact: ['SMS', 'WhatsApp', 'Appel'],
        echeance_type: 'mensuel',
        objectifs: { taux_paiements: '95%' }
      },
      {
        utilisateur_id: userIds[1], // Moussa Traoré
        annee_experience: 3,
        mode_management: 'manuel',
        methode_contact: ['SMS', 'Appel'],
        echeance_type: 'hebdomadaire',
        objectifs: { taux_paiements: '85%' }
      },
      {
        utilisateur_id: userIds[2], // Aminata Ouattara
        annee_experience: 5,
        mode_management: 'hybride',
        methode_contact: ['Email', 'WhatsApp'],
        echeance_type: 'bimensuel',
        objectifs: { taux_paiements: '90%' }
      },
      {
        utilisateur_id: userIds[3], // Kouassi Bamba
        annee_experience: 6,
        mode_management: 'automatique',
        methode_contact: ['SMS', 'WhatsApp', 'Email'],
        echeance_type: 'mensuel',
        objectifs: { taux_paiements: '92%' }
      },
      {
        utilisateur_id: userIds[4], // Mariam Diabaté
        annee_experience: 10,
        mode_management: 'automatique',
        methode_contact: ['SMS', 'WhatsApp', 'Appel', 'Email'],
        echeance_type: 'hebdomadaire',
        objectifs: { taux_paiements: '98%' }
      }
    ];
    
    await db.collection('configurations').deleteMany({});
    const resultConfig = await db.collection('configurations').insertMany(configurations);
    console.log(`✅ ${resultConfig.insertedCount} configurations chargées`);
    
    // --- COLLECTION: partenaires ---
    console.log('\n🤝 Chargement des partenaires...');
    const partenaires = [
      {
        user_id: userIds[1], // Moussa Traoré
        nom: 'Traoré',
        prenom: 'Moussa',
        telephone: '+2250702345678',
        profession: 'Agent Commercial',
        type_bien_partage: 'Appartement 3 pièces',
        montant: 2500000,
        date_paiement: new Date('2024-03-15'),
        mode_paiement: 'Mobile Money',
        description_note: 'Client régulier, paiements ponctuels',
        statut_relance: 'en cours',
        date_ajout: new Date('2024-01-20'),
        derniere_relance: new Date('2024-03-10'),
        updated_at: new Date()
      },
      {
        user_id: userIds[3], // Kouassi Bamba
        nom: 'Bamba',
        prenom: 'Kouassi',
        telephone: '+2250704567890',
        profession: 'Promoteur Immobilier',
        type_bien_partage: 'Villa 5 pièces',
        montant: 5000000,
        date_paiement: new Date('2024-03-20'),
        mode_paiement: 'Virement Bancaire',
        description_note: 'Nouveau partenaire, premier paiement',
        statut_relance: 'en cours',
        date_ajout: new Date('2024-02-01'),
        derniere_relance: new Date('2024-03-12'),
        updated_at: new Date()
      },
      {
        user_id: userIds[1], // Moussa Traoré
        nom: 'Kouassi',
        prenom: 'Adama',
        telephone: '+2250706789012',
        profession: 'Commerçant',
        type_bien_partage: 'Studio 2 pièces',
        montant: 1200000,
        date_paiement: new Date('2024-03-25'),
        mode_paiement: 'Orange Money',
        description_note: 'Client occasionnel',
        statut_relance: 'en cours',
        date_ajout: new Date('2024-02-15'),
        derniere_relance: new Date('2024-03-14'),
        updated_at: new Date()
      },
      {
        user_id: userIds[4], // Mariam Diabaté
        nom: 'Soro',
        prenom: 'Fatim',
        telephone: '+2250707890123',
        profession: 'Médecin',
        type_bien_partage: 'Appartement 4 pièces',
        montant: 3500000,
        date_paiement: new Date('2024-03-30'),
        mode_paiement: 'Chèque',
        description_note: 'Client premium, excellent historique',
        statut_relance: 'en cours',
        date_ajout: new Date('2024-02-20'),
        derniere_relance: new Date('2024-03-16'),
        updated_at: new Date()
      },
      {
        user_id: userIds[0], // Fatou Koné
        nom: 'Yao',
        prenom: 'Koffi',
        telephone: '+2250708901234',
        profession: 'Ingénieur',
        type_bien_partage: 'Maison 6 pièces',
        montant: 7500000,
        date_paiement: new Date('2024-04-05'),
        mode_paiement: 'Virement Bancaire',
        description_note: 'Nouveau client, premier contact',
        statut_relance: 'en cours',
        date_ajout: new Date('2024-03-01'),
        derniere_relance: new Date('2024-03-18'),
        updated_at: new Date()
      }
    ];
    
    await db.collection('partenaires').deleteMany({});
    const resultPartners = await db.collection('partenaires').insertMany(partenaires, { bypassDocumentValidation: true });
    console.log(`✅ ${resultPartners.insertedCount} partenaires chargés`);
    
    // Récupérer les IDs des partenaires pour les relations
    const partnerIds = Object.values(resultPartners.insertedIds);
    
    // --- COLLECTION: paiements ---
    console.log('\n💳 Chargement des paiements...');
    const paiements = [
      {
        user_id: userIds[1],
        montant: 2500000,
        date_paiement: new Date('2024-02-15'),
        mode_paiement: 'Mobile Money',
        statut: 'payé',
        relances_envoyees: 2,
        relances_echouees: 0,
        updated_at: new Date()
      },
      {
        user_id: userIds[3],
        montant: 5000000,
        date_paiement: new Date('2024-02-20'),
        mode_paiement: 'Virement Bancaire',
        statut: 'payé',
        relances_envoyees: 1,
        relances_echouees: 0,
        updated_at: new Date()
      },
      {
        user_id: userIds[1],
        montant: 1200000,
        date_paiement: new Date('2024-03-01'),
        mode_paiement: 'Orange Money',
        statut: 'en attente',
        relances_envoyees: 3,
        relances_echouees: 1,
        updated_at: new Date()
      },
      {
        user_id: userIds[4],
        montant: 3500000,
        date_paiement: new Date('2024-03-05'),
        mode_paiement: 'Chèque',
        statut: 'payé',
        relances_envoyees: 0,
        relances_echouees: 0,
        updated_at: new Date()
      },
      {
        user_id: userIds[0],
        montant: 7500000,
        date_paiement: new Date('2024-03-10'),
        mode_paiement: 'Virement Bancaire',
        statut: 'échoué',
        relances_envoyees: 2,
        relances_echouees: 2,
        updated_at: new Date()
      }
    ];
    
    await db.collection('paiements').deleteMany({});
    const resultPayments = await db.collection('paiements').insertMany(paiements, { bypassDocumentValidation: true });
    console.log(`✅ ${resultPayments.insertedCount} paiements chargés`);
    
    // --- COLLECTION: relances ---
    console.log('\n📞 Chargement des relances...');
    const relances = [
      {
        partner_id: partnerIds[0],
        type_relance: 'SMS',
        contenu_message: 'Bonjour Moussa, rappel pour le paiement de 2.500.000 FCFA prévu le 15/03/2024. Merci de procéder au règlement.',
        date_relance: new Date('2024-03-10'),
        statut: 'réussie',
        canal_envoye: 'SMS'
      },
      {
        partner_id: partnerIds[1],
        type_relance: 'WhatsApp',
        contenu_message: 'Salut Kouassi, le paiement de 5.000.000 FCFA est attendu le 20/03/2024. Pouvez-vous confirmer le virement ?',
        date_relance: new Date('2024-03-12'),
        statut: 'réussie',
        canal_envoye: 'WhatsApp'
      },
      {
        partner_id: partnerIds[2],
        type_relance: 'Appel',
        contenu_message: 'Appel téléphonique pour rappel de paiement - 1.200.000 FCFA',
        date_relance: new Date('2024-03-14'),
        statut: 'échec',
        canal_envoye: 'Téléphone'
      },
      {
        partner_id: partnerIds[3],
        type_relance: 'Email',
        contenu_message: 'Madame Soro, votre chèque de 3.500.000 FCFA est attendu pour le 30/03/2024. Merci de votre confiance.',
        date_relance: new Date('2024-03-16'),
        statut: 'réussie',
        canal_envoye: 'Email'
      },
      {
        partner_id: partnerIds[4],
        type_relance: 'SMS',
        contenu_message: 'Monsieur Yao, le virement de 7.500.000 FCFA n\'a pas abouti. Veuillez vérifier les coordonnées bancaires.',
        date_relance: new Date('2024-03-18'),
        statut: 'échec',
        canal_envoye: 'SMS'
      }
    ];
    
    await db.collection('relances').deleteMany({});
    const resultRelances = await db.collection('relances').insertMany(relances, { bypassDocumentValidation: true });
    console.log(`✅ ${resultRelances.insertedCount} relances chargées`);
    
    // --- COLLECTION: messages_programmes ---
    console.log('\n📅 Chargement des messages programmés...');
    const messagesProgrammes = [
      {
        partner_id: partnerIds[0],
        type_message: 'Rappel paiement',
        contenu_message: 'Rappel automatique : Paiement de 2.500.000 FCFA prévu le 15/03/2024',
        date_programmee: new Date('2024-03-20'),
        statut: 'en attente'
      },
      {
        partner_id: partnerIds[1],
        type_message: 'Confirmation',
        contenu_message: 'Merci pour votre paiement de 5.000.000 FCFA. Prochain échéancier le 20/04/2024',
        date_programmee: new Date('2024-03-25'),
        statut: 'en attente'
      },
      {
        partner_id: partnerIds[2],
        type_message: 'Relance urgente',
        contenu_message: 'URGENT : Paiement en retard de 1.200.000 FCFA. Contactez-nous rapidement.',
        date_programmee: new Date('2024-03-28'),
        statut: 'en attente'
      }
    ];
    
    await db.collection('messages_programmes').deleteMany({});
    const resultMessages = await db.collection('messages_programmes').insertMany(messagesProgrammes, { bypassDocumentValidation: true });
    console.log(`✅ ${resultMessages.insertedCount} messages programmés chargés`);
    
    // --- COLLECTION: historique_actions ---
    console.log('\n📋 Chargement de l\'historique des actions...');
    const historiqueActions = [
      {
        utilisateur_id: userIds[0],
        action_type: 'Création partenaire',
        description: 'Ajout du partenaire Yao Koffi',
        date_action: new Date('2024-03-01')
      },
      {
        utilisateur_id: userIds[1],
        action_type: 'Paiement reçu',
        description: 'Paiement de 2.500.000 FCFA reçu',
        date_action: new Date('2024-02-15')
      },
      {
        utilisateur_id: userIds[3],
        action_type: 'Relance envoyée',
        description: 'SMS de relance envoyé à Kouassi Bamba',
        date_action: new Date('2024-03-12')
      },
      {
        utilisateur_id: userIds[4],
        action_type: 'Configuration mise à jour',
        description: 'Mise à jour des méthodes de contact',
        date_action: new Date('2024-03-05')
      },
      {
        utilisateur_id: userIds[0],
        action_type: 'Paiement échoué',
        description: 'Virement de 7.500.000 FCFA échoué',
        date_action: new Date('2024-03-10')
      }
    ];
    
    await db.collection('historique_actions').deleteMany({});
    const resultHistorique = await db.collection('historique_actions').insertMany(historiqueActions, { bypassDocumentValidation: true });
    console.log(`✅ ${resultHistorique.insertedCount} actions historiques chargées`);
    
    // --- COLLECTION: abonnements ---
    console.log('\n📦 Chargement des abonnements...');
    const abonnements = [
      {
        utilisateur_id: userIds[0],
        plan: 'pro',
        credit_disponible: 1000,
        date_debut: new Date('2024-01-15'),
        date_fin: new Date('2024-12-31'),
        renouvellement_auto: true
      },
      {
        utilisateur_id: userIds[1],
        plan: 'starter',
        credit_disponible: 500,
        date_debut: new Date('2024-01-20'),
        date_fin: new Date('2024-06-30'),
        renouvellement_auto: false
      },
      {
        utilisateur_id: userIds[2],
        plan: 'illimité',
        credit_disponible: -1,
        date_debut: new Date('2024-01-25'),
        date_fin: new Date('2024-12-31'),
        renouvellement_auto: true
      },
      {
        utilisateur_id: userIds[3],
        plan: 'pro',
        credit_disponible: 750,
        date_debut: new Date('2024-02-01'),
        date_fin: new Date('2024-11-30'),
        renouvellement_auto: true
      },
      {
        utilisateur_id: userIds[4],
        plan: 'illimité',
        credit_disponible: -1,
        date_debut: new Date('2024-02-05'),
        date_fin: new Date('2024-12-31'),
        renouvellement_auto: true
      }
    ];
    
    await db.collection('abonnements').deleteMany({});
    const resultAbonnements = await db.collection('abonnements').insertMany(abonnements, { bypassDocumentValidation: true });
    console.log(`✅ ${resultAbonnements.insertedCount} abonnements chargés`);
    
    console.log('\n🎉 Chargement des données d\'exemple terminé !');
    console.log('📊 Résumé des données chargées :');
    console.log(`   - ${resultModes.insertedCount} modes de paiement`);
    console.log(`   - ${resultUsers.insertedCount} utilisateurs`);
    console.log(`   - ${resultConfig.insertedCount} configurations`);
    console.log(`   - ${resultPartners.insertedCount} partenaires`);
    console.log(`   - ${resultPayments.insertedCount} paiements`);
    console.log(`   - ${resultRelances.insertedCount} relances`);
    console.log(`   - ${resultMessages.insertedCount} messages programmés`);
    console.log(`   - ${resultHistorique.insertedCount} actions historiques`);
    console.log(`   - ${resultAbonnements.insertedCount} abonnements`);
    
    console.log('\n✅ Votre base de données Vania Flow est maintenant prête avec des données d\'exemple !');
    
  } catch (error) {
    console.error('❌ Erreur lors du chargement des données:', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion fermée');
  }
}

// Exécution du script
loadSampleData(); 