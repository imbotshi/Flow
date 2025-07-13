// Charger les variables d'environnement
require('dotenv').config();

const { MongoClient } = require('mongodb');

// Configuration de la base de données
const DB_NAME = 'vainiaFlowDB';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

async function createDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connexion à MongoDB...');
    await client.connect();
    console.log('✅ Connecté à MongoDB avec succès');
    
    const db = client.db(DB_NAME);
    
    console.log(`📊 Création de la base de données: ${DB_NAME}`);
    
    // --- COLLECTION: utilisateurs ---
    console.log('👥 Création de la collection utilisateurs...');
    await db.createCollection("utilisateurs", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nom", "prenom", "telephone", "profession", "type_utilisateur", "date_creation"],
          properties: {
            nom: { bsonType: "string" },
            prenom: { bsonType: "string" },
            telephone: { bsonType: "string" },
            email: { bsonType: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
            profession: { bsonType: "string" },
            type_utilisateur: { bsonType: "string", enum: ["Gestionnaire", "Partenaire", "Client"] },
            statut: { bsonType: "string", enum: ["actif", "inactif"] },
            photo_url: { bsonType: "string" },
            date_creation: { bsonType: "date" },
            updated_at: { bsonType: "date" }
          }
        }
      }
    });
    
    await db.collection("utilisateurs").createIndex({ telephone: 1 });
    await db.collection("utilisateurs").createIndex({ email: 1 }, { unique: true, sparse: true });
    await db.collection("utilisateurs").createIndex({ nom: 1, prenom: 1 });
    console.log('✅ Collection utilisateurs créée avec succès');
    
    // --- COLLECTION: partenaires ---
    console.log('🤝 Création de la collection partenaires...');
    await db.createCollection("partenaires", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["user_id", "nom", "prenom", "telephone", "montant", "date_paiement", "mode_paiement", "statut_relance"],
          properties: {
            user_id: { bsonType: "objectId" },
            nom: { bsonType: "string" },
            prenom: { bsonType: "string" },
            telephone: { bsonType: "string" },
            profession: { bsonType: "string" },
            type_bien_partage: { bsonType: "string" },
            montant: { bsonType: "double" },
            date_paiement: { bsonType: "date" },
            mode_paiement: { bsonType: "string" },
            description_note: { bsonType: "string" },
            statut_relance: { bsonType: "string", enum: ["en cours", "terminé", "échec"] },
            date_ajout: { bsonType: "date" },
            derniere_relance: { bsonType: "date" },
            updated_at: { bsonType: "date" }
          }
        }
      }
    });
    
    await db.collection("partenaires").createIndex({ user_id: 1 });
    await db.collection("partenaires").createIndex({ telephone: 1 });
    await db.collection("partenaires").createIndex({ nom: 1, prenom: 1 });
    console.log('✅ Collection partenaires créée avec succès');
    
    // --- COLLECTION: paiements ---
    console.log('💳 Création de la collection paiements...');
    await db.createCollection("paiements", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["user_id", "montant", "date_paiement", "mode_paiement", "statut"],
          properties: {
            user_id: { bsonType: "objectId" },
            montant: { bsonType: "double" },
            date_paiement: { bsonType: "date" },
            mode_paiement: { bsonType: "string" },
            statut: { bsonType: "string", enum: ["payé", "en attente", "échoué"] },
            relances_envoyees: { bsonType: "int" },
            relances_echouees: { bsonType: "int" },
            updated_at: { bsonType: "date" }
          }
        }
      }
    });
    
    await db.collection("paiements").createIndex({ user_id: 1 });
    await db.collection("paiements").createIndex({ date_paiement: -1 });
    await db.collection("paiements").createIndex({ user_id: 1, statut: 1, date_paiement: -1 });
    console.log('✅ Collection paiements créée avec succès');
    
    // --- COLLECTION: relances ---
    console.log('📞 Création de la collection relances...');
    await db.createCollection("relances", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["partner_id", "type_relance", "contenu_message", "date_relance", "statut", "canal_envoye"],
          properties: {
            partner_id: { bsonType: "objectId" },
            type_relance: { bsonType: "string" },
            contenu_message: { bsonType: "string" },
            date_relance: { bsonType: "date" },
            statut: { bsonType: "string", enum: ["réussie", "échec", "en attente"] },
            canal_envoye: { bsonType: "string" }
          }
        }
      }
    });
    
    await db.collection("relances").createIndex({ partner_id: 1 });
    await db.collection("relances").createIndex({ date_relance: -1 });
    await db.collection("relances").createIndex({ statut: 1, date_relance: -1 });
    console.log('✅ Collection relances créée avec succès');
    
    // --- COLLECTION: configurations ---
    console.log('⚙️ Création de la collection configurations...');
    await db.createCollection("configurations", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["utilisateur_id", "annee_experience", "mode_management"],
          properties: {
            utilisateur_id: { bsonType: "objectId" },
            annee_experience: { bsonType: "int" },
            mode_management: { bsonType: "string" },
            methode_contact: { bsonType: "array", items: { bsonType: "string" } },
            echeance_type: { bsonType: "string" },
            objectifs: {
              bsonType: "object",
              properties: {
                taux_paiements: { bsonType: "string" }
              }
            }
          }
        }
      }
    });
    
    await db.collection("configurations").createIndex({ utilisateur_id: 1 });
    console.log('✅ Collection configurations créée avec succès');
    
    // --- COLLECTION: messages_programmes ---
    console.log('📅 Création de la collection messages_programmes...');
    await db.createCollection("messages_programmes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["partner_id", "type_message", "contenu_message", "date_programmee"],
          properties: {
            partner_id: { bsonType: "objectId" },
            type_message: { bsonType: "string" },
            contenu_message: { bsonType: "string" },
            date_programmee: { bsonType: "date" },
            statut: { bsonType: "string", enum: ["en attente", "envoyé", "annulé"] }
          }
        }
      }
    });
    
    await db.collection("messages_programmes").createIndex({ partner_id: 1 });
    await db.collection("messages_programmes").createIndex({ date_programmee: 1 });
    console.log('✅ Collection messages_programmes créée avec succès');
    
    // --- COLLECTION: historique_actions ---
    console.log('📋 Création de la collection historique_actions...');
    await db.createCollection("historique_actions", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["utilisateur_id", "action_type", "description", "date_action"],
          properties: {
            utilisateur_id: { bsonType: "objectId" },
            action_type: { bsonType: "string" },
            description: { bsonType: "string" },
            date_action: { bsonType: "date" }
          }
        }
      }
    });
    
    await db.collection("historique_actions").createIndex({ utilisateur_id: 1 });
    await db.collection("historique_actions").createIndex({ date_action: -1 });
    console.log('✅ Collection historique_actions créée avec succès');
    
    // --- COLLECTION: modes_paiement ---
    console.log('💱 Création de la collection modes_paiement...');
    await db.createCollection("modes_paiement", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nom", "code", "disponible"],
          properties: {
            nom: { bsonType: "string" },
            code: { bsonType: "string" },
            disponible: { bsonType: "bool" }
          }
        }
      }
    });
    
    await db.collection("modes_paiement").createIndex({ code: 1 }, { unique: true });
    console.log('✅ Collection modes_paiement créée avec succès');
    
    // --- COLLECTION: abonnements ---
    console.log('📦 Création de la collection abonnements...');
    await db.createCollection("abonnements", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["utilisateur_id", "plan", "credit_disponible", "date_debut", "date_fin"],
          properties: {
            utilisateur_id: { bsonType: "objectId" },
            plan: { bsonType: "string", enum: ["gratuit", "starter", "pro", "illimité"] },
            credit_disponible: { bsonType: "int" },
            date_debut: { bsonType: "date" },
            date_fin: { bsonType: "date" },
            renouvellement_auto: { bsonType: "bool" }
          }
        }
      }
    });
    
    await db.collection("abonnements").createIndex({ utilisateur_id: 1, date_fin: -1 });
    console.log('✅ Collection abonnements créée avec succès');
    
    console.log('\n🎉 Base de données Vania Flow créée avec succès !');
    console.log(`📊 Base de données: ${DB_NAME}`);
    console.log('📋 Collections créées:');
    console.log('   - utilisateurs');
    console.log('   - partenaires');
    console.log('   - paiements');
    console.log('   - relances');
    console.log('   - configurations');
    console.log('   - messages_programmes');
    console.log('   - historique_actions');
    console.log('   - modes_paiement');
    console.log('   - abonnements');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la base de données:', error);
  } finally {
    await client.close();
    console.log('🔌 Connexion fermée');
  }
}

// Exécution du script
createDatabase(); 