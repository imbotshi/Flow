/**
 * Serveur principal Vania Flow
 * Backend Node.js moderne avec Express et Mongoose
 * Architecture refactorisée avec DatabaseManager
 */

// Chargement des variables d'environnement
require('dotenv').config();

const express = require('express');
const { connectDB, getConnectionStatus } = require('./config/database');
const { configureApp, configureRoutes } = require('./config/app');

// Configuration du serveur
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const HOST = process.env.HOST || 'localhost';

// Création de l'application Express
const app = express();

/**
 * Démarrage du serveur avec architecture moderne
 */
const startServer = async () => {
  try {
    console.log('🚀 Démarrage du serveur Vania Flow...');
    console.log('🏗️  Architecture moderne avec DatabaseManager');
    console.log('=' .repeat(60));
    console.log(`🌍 Environnement: ${NODE_ENV}`);
    console.log(`🔗 Port: ${PORT}`);
    console.log(`📍 Hôte: ${HOST}`);
    console.log(`📊 Version: ${process.env.npm_package_version || '1.0.0'}`);
    
    // Configuration de l'application Express
    console.log('\n⚙️  Configuration de l\'application Express...');
    configureApp(app);
    console.log('✅ Configuration Express terminée');
    
    // Connexion à la base de données MongoDB
    console.log('\n📊 Initialisation de la base de données...');
    const connection = await connectDB();
    console.log('✅ Connexion MongoDB établie');
    
    // Configuration des routes
    console.log('\n🛣️  Configuration des routes...');
    configureRoutes(app);
    console.log('✅ Routes configurées');
    
    // Démarrage du serveur
    const server = app.listen(PORT, HOST, () => {
      console.log('\n🎉 Serveur démarré avec succès !');
      console.log('=' .repeat(60));
      console.log(`📍 URL: http://${HOST}:${PORT}`);
      console.log(`🔍 Health check: http://${HOST}:${PORT}/health`);
      console.log(`📊 DB Status: http://${HOST}:${PORT}/db-status`);
      console.log(`💻 System Info: http://${HOST}:${PORT}/system-info`);
      console.log(`📈 Metrics: http://${HOST}:${PORT}/metrics`);
      console.log('\n🎯 Backend Vania Flow prêt à recevoir des requêtes !');
      console.log('✅ Architecture moderne et robuste activée');
      console.log('✅ Retry automatique et gestion d\'erreurs configurés');
      console.log('✅ Monitoring et métriques disponibles');
    });

    // Configuration du serveur pour une fermeture propre
    server.keepAliveTimeout = 65000; // 65 secondes
    server.headersTimeout = 66000; // 66 secondes

    // Gestion des erreurs du serveur
    server.on('error', (error) => {
      console.error('❌ Erreur du serveur:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`🔧 Le port ${PORT} est déjà utilisé. Changez le port dans .env`);
      }
      process.exit(1);
    });

    // Gestion de la fermeture propre du serveur
    process.on('SIGTERM', () => {
      console.log('\n🛑 Signal SIGTERM reçu. Fermeture propre du serveur...');
      server.close(() => {
        console.log('✅ Serveur fermé proprement');
        process.exit(0);
      });
    });

    return server;
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error.message);
    
    // Log détaillé en développement
    if (NODE_ENV === 'development') {
      console.error('📋 Détails techniques:', error);
    }
    
    process.exit(1);
  }
};

/**
 * Gestion des erreurs non capturées
 */
const setupErrorHandling = () => {
  // Erreurs de promesses non gérées
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Erreur non gérée (Promise):', reason);
    console.error('📋 Promise:', promise);
    
    // En production, on peut choisir de ne pas arrêter le serveur
    if (NODE_ENV === 'production') {
      console.log('⚠️  Mode production: Le serveur continue de fonctionner');
    } else {
      process.exit(1);
    }
  });

  // Erreurs d'exceptions non gérées
  process.on('uncaughtException', (error) => {
    console.error('❌ Erreur non gérée (Exception):', error);
    console.error('📋 Stack trace:', error.stack);
    
    // Les exceptions non gérées sont critiques, on arrête le serveur
    process.exit(1);
  });

  // Gestion des signaux d'arrêt
  process.on('SIGINT', () => {
    console.log('\n🛑 Signal SIGINT reçu (Ctrl+C)');
    process.exit(0);
  });

  // Gestion des erreurs de mémoire
  process.on('warning', (warning) => {
    console.warn('⚠️  Avertissement système:', warning.name);
    console.warn('📋 Message:', warning.message);
    console.warn('📋 Stack:', warning.stack);
  });
};

/**
 * Affichage des informations de démarrage
 */
const displayStartupInfo = () => {
  console.log('\n📋 Informations de démarrage:');
  console.log(`   Node.js: ${process.version}`);
  console.log(`   Plateforme: ${process.platform} ${process.arch}`);
  console.log(`   PID: ${process.pid}`);
  console.log(`   Répertoire: ${process.cwd()}`);
  console.log(`   Variables d'environnement: ${Object.keys(process.env).length}`);
  
  // Vérification des variables critiques
  const criticalVars = ['NODE_ENV', 'PORT', 'MONGODB_URI'];
  criticalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`   ✅ ${varName}: ${varName === 'MONGODB_URI' ? '***configuré***' : value}`);
    } else {
      console.log(`   ⚠️  ${varName}: non défini (valeur par défaut utilisée)`);
    }
  });
};

// Configuration de la gestion d'erreurs
setupErrorHandling();

// Affichage des informations de démarrage
displayStartupInfo();

// Démarrage du serveur
startServer(); 