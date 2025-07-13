// SCRIPT DE CRÉATION DE LA BASE DE DONNÉES VAINIA FLOW - VERSION AMÉLIORÉE

// Utilisation de la base
use vainiaFlowDB;

// --- COLLECTION: utilisateurs ---
db.createCollection("utilisateurs", {
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
        statut: { bsonType: "string", enum: ["actif", "inactif"], default: "actif" },
        photo_url: { bsonType: "string" },
        date_creation: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});
db.utilisateurs.createIndex({ telephone: 1 });
db.utilisateurs.createIndex({ email: 1 }, { unique: true, sparse: true });
db.utilisateurs.createIndex({ nom: 1, prenom: 1 });

// --- COLLECTION: partenaires ---
db.createCollection("partenaires", {
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
db.partenaires.createIndex({ user_id: 1 });
db.partenaires.createIndex({ telephone: 1 });
db.partenaires.createIndex({ nom: 1, prenom: 1 });

// --- COLLECTION: paiements ---
db.createCollection("paiements", {
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
db.paiements.createIndex({ user_id: 1 });
db.paiements.createIndex({ date_paiement: -1 });
db.paiements.createIndex({ user_id: 1, statut: 1, date_paiement: -1 });

// --- COLLECTION: relances ---
db.createCollection("relances", {
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
db.relances.createIndex({ partner_id: 1 });
db.relances.createIndex({ date_relance: -1 });
db.relances.createIndex({ statut: 1, date_relance: -1 });

// --- COLLECTION: configurations ---
db.createCollection("configurations", {
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
db.configurations.createIndex({ utilisateur_id: 1 });

// --- COLLECTION: messages_programmes ---
db.createCollection("messages_programmes", {
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
db.messages_programmes.createIndex({ partner_id: 1 });
db.messages_programmes.createIndex({ date_programmee: 1 });

// --- COLLECTION: historique_actions ---
db.createCollection("historique_actions", {
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
db.historique_actions.createIndex({ utilisateur_id: 1 });
db.historique_actions.createIndex({ date_action: -1 });

// --- COLLECTION: modes_paiement ---
db.createCollection("modes_paiement", {
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
db.modes_paiement.createIndex({ code: 1 }, { unique: true });

// --- COLLECTION: abonnements ---
db.createCollection("abonnements", {
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
db.abonnements.createIndex({ utilisateur_id: 1, date_fin: -1 });

// Fin du script
print("Base de données Vania Flow améliorée créée avec succès.");
