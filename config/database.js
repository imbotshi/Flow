const mongoose = require('mongoose');

/**
 * Configuration de la connexion MongoDB avec Mongoose
 * Architecture moderne avec gestion d'erreurs robuste
 */

class DatabaseManager {
  constructor() {
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 secondes
  }

  /**
   * Configuration des options de connexion selon l'environnement
   */
  getConnectionOptions() {
    const isProduction = process.env.NODE_ENV === 'production';
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Options de base
    const baseOptions = {
      dbName: 'vaniaFlowDB',
      maxPoolSize: isProduction ? 20 : 10,
      minPoolSize: isProduction ? 5 : 1,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
      retryWrites: true,
      w: 'majority',
    };

    // Options spécifiques à la production
    if (isProduction) {
      return {
        ...baseOptions,
        ssl: true,
        sslValidate: true,
        retryReads: true,
        maxIdleTimeMS: 30000,
        compressors: ['zlib'],
      };
    }

    // Options de développement
    if (isDevelopment) {
      return {
        ...baseOptions,
        ssl: false,
        sslValidate: false,
        retryReads: false,
      };
    }

    return baseOptions;
  }

  /**
   * Établir la connexion avec retry automatique
   */
  async connect() {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const options = this.getConnectionOptions();

    console.log('🔌 Initialisation de la connexion MongoDB...');
    console.log(`📊 Base de données: ${options.dbName}`);
    console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 URI: ${this.maskUri(MONGODB_URI)}`);

    try {
      // Configuration des événements Mongoose
      this.setupEventHandlers();

      // Tentative de connexion avec retry
      const connection = await this.connectWithRetry(MONGODB_URI, options);
      
      this.isConnected = true;
      this.connectionAttempts = 0;

      console.log('✅ Connexion MongoDB établie avec succès !');
      console.log(`📍 Hôte: ${connection.connection.host}`);
      console.log(`📊 Base: ${connection.connection.name}`);
      console.log(`🔗 Port: ${connection.connection.port}`);
      console.log(`🔄 Pool de connexions: ${options.maxPoolSize} max`);

      return connection;

    } catch (error) {
      console.error('❌ Échec de la connexion MongoDB après tous les essais:', error.message);
      this.handleConnectionError(error);
      throw error;
    }
  }

  /**
   * Connexion avec retry automatique
   */
  async connectWithRetry(uri, options) {
    while (this.connectionAttempts < this.maxRetries) {
      try {
        this.connectionAttempts++;
        console.log(`🔄 Tentative de connexion ${this.connectionAttempts}/${this.maxRetries}...`);
        
        const connection = await mongoose.connect(uri, options);
        return connection;

      } catch (error) {
        console.error(`❌ Tentative ${this.connectionAttempts} échouée:`, error.message);
        
        if (this.connectionAttempts >= this.maxRetries) {
          throw error;
        }

        console.log(`⏳ Nouvelle tentative dans ${this.retryDelay / 1000} secondes...`);
        await this.delay(this.retryDelay);
      }
    }
  }

  /**
   * Configuration des gestionnaires d'événements
   */
  setupEventHandlers() {
    // Événement de connexion réussie
    mongoose.connection.once('connected', () => {
      console.log('🎉 Mongoose connecté à MongoDB');
      this.isConnected = true;
    });

    // Événement d'erreur
    mongoose.connection.on('error', (error) => {
      console.error('❌ Erreur de connexion MongoDB:', error);
      this.isConnected = false;
      this.handleConnectionError(error);
    });

    // Événement de déconnexion
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Connexion MongoDB perdue');
      this.isConnected = false;
    });

    // Événement de reconnexion
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Connexion MongoDB rétablie');
      this.isConnected = true;
    });

    // Événement de fermeture
    mongoose.connection.on('close', () => {
      console.log('🔌 Connexion MongoDB fermée');
      this.isConnected = false;
    });

    // Gestion propre de la fermeture de l'application
    this.setupGracefulShutdown();
  }

  /**
   * Gestion propre de la fermeture
   */
  setupGracefulShutdown() {
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Signal ${signal} reçu. Fermeture propre...`);
      
      try {
        if (mongoose.connection.readyState === 1) {
          await mongoose.connection.close();
          console.log('✅ Connexion MongoDB fermée proprement');
        }
        
        console.log('👋 Application arrêtée proprement');
        process.exit(0);
        
      } catch (error) {
        console.error('❌ Erreur lors de la fermeture:', error);
        process.exit(1);
      }
    };

    // Gestion des signaux d'arrêt
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'));
  }

  /**
   * Gestion des erreurs de connexion
   */
  handleConnectionError(error) {
    const errorMessages = {
      'ECONNREFUSED': 'MongoDB n\'est pas accessible. Vérifiez que le service est démarré.',
      'ENOTFOUND': 'Impossible de résoudre l\'hôte MongoDB. Vérifiez l\'URI de connexion.',
      'ETIMEDOUT': 'Timeout de connexion. Vérifiez votre réseau et l\'URI.',
      'MongoNetworkError': 'Erreur réseau MongoDB. Vérifiez la connectivité.',
      'MongoServerSelectionError': 'Impossible de sélectionner un serveur MongoDB.',
    };

    const errorType = error.code || error.name;
    const message = errorMessages[errorType] || 'Erreur de connexion inconnue';

    console.error(`🔧 Dépannage: ${message}`);
    
    if (process.env.NODE_ENV === 'development') {
      console.error('📋 Détails techniques:', error);
    }
  }

  /**
   * Vérification de l'état de la connexion
   */
  getConnectionStatus() {
    const states = {
      0: 'Déconnecté',
      1: 'Connecté',
      2: 'Connexion en cours',
      3: 'Déconnexion en cours'
    };

    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      stateName: states[mongoose.connection.readyState] || 'Inconnu',
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      port: mongoose.connection.port
    };
  }

  /**
   * Fermeture propre de la connexion
   */
  async disconnect() {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('🔌 Connexion MongoDB fermée proprement');
        this.isConnected = false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la fermeture de la connexion:', error);
      throw error;
    }
  }

  /**
   * Test de santé de la connexion
   */
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return { status: 'disconnected', message: 'Non connecté' };
      }

      // Test de ping
      const startTime = Date.now();
      await mongoose.connection.db.admin().ping();
      const pingTime = Date.now() - startTime;

      // Statistiques de la base
      const stats = await mongoose.connection.db.stats();

      return {
        status: 'healthy',
        ping: pingTime,
        database: {
          name: mongoose.connection.name,
          collections: stats.collections,
          documents: stats.objects,
          dataSize: stats.dataSize,
          storageSize: stats.storageSize
        },
        connection: this.getConnectionStatus()
      };

    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        connection: this.getConnectionStatus()
      };
    }
  }

  /**
   * Masquer les credentials dans l'URI pour les logs
   */
  maskUri(uri) {
    return uri.replace(/\/\/.*@/, '//***:***@');
  }

  /**
   * Délai asynchrone
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Instance singleton
const databaseManager = new DatabaseManager();

// Fonctions d'export pour compatibilité
const connectDB = () => databaseManager.connect();
const isConnected = () => databaseManager.isConnected;
const disconnectDB = () => databaseManager.disconnect();
const getConnectionStatus = () => databaseManager.getConnectionStatus();
const healthCheck = () => databaseManager.healthCheck();

module.exports = {
  connectDB,
  isConnected,
  disconnectDB,
  getConnectionStatus,
  healthCheck,
  DatabaseManager
}; 