const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Configuration de l'application Express
 * Architecture moderne avec sécurité renforcée
 */
const configureApp = (app) => {
  // Middleware de sécurité avancé
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // Configuration CORS avancée
  const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = process.env.ALLOWED_ORIGINS 
        ? process.env.ALLOWED_ORIGINS.split(',') 
        : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'];
      
      // Autoriser les requêtes sans origine (applications mobiles, Postman, etc.)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Non autorisé par CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
    maxAge: 86400 // 24 heures
  };

  app.use(cors(corsOptions));

  // Middleware de logging avancé
  const morganFormat = process.env.NODE_ENV === 'production' 
    ? 'combined' 
    : ':method :url :status :res[content-length] - :response-time ms';

  app.use(morgan(morganFormat, {
    skip: (req, res) => {
      // Ignorer les requêtes de health check dans les logs
      return req.url === '/health' && res.statusCode === 200;
    }
  }));

  // Middleware pour parser le JSON avec limites
  app.use(express.json({ 
    limit: process.env.JSON_LIMIT || '10mb',
    verify: (req, res, buf) => {
      // Vérification de la validité JSON
      try {
        JSON.parse(buf);
      } catch (e) {
        throw new Error('Invalid JSON');
      }
    }
  }));

  app.use(express.urlencoded({ 
    extended: true, 
    limit: process.env.URL_ENCODED_LIMIT || '10mb' 
  }));

  // Middleware pour les headers de sécurité supplémentaires
  app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // Headers personnalisés pour Vania Flow
    res.header('X-Powered-By', 'Vania Flow Backend');
    res.header('X-API-Version', '1.0.0');
    
    next();
  });

  // Middleware de gestion des timeouts
  app.use((req, res, next) => {
    req.setTimeout(30000, () => {
      res.status(408).json({ 
        error: 'Request timeout',
        message: 'La requête a pris trop de temps à traiter'
      });
    });
    next();
  });

  return app;
};

/**
 * Configuration des routes de base avec monitoring avancé
 */
const configureRoutes = (app) => {
  // Route de santé avancée
  app.get('/health', async (req, res) => {
    try {
      const { healthCheck } = require('./database');
      const dbHealth = await healthCheck();
      
      const healthStatus = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          external: Math.round(process.memoryUsage().external / 1024 / 1024)
        },
        database: dbHealth
      };

      const statusCode = dbHealth.status === 'healthy' ? 200 : 503;
      res.status(statusCode).json(healthStatus);

    } catch (error) {
      res.status(503).json({
        status: 'ERROR',
        message: 'Erreur lors de la vérification de santé',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Route de statut de la base de données détaillée
  app.get('/db-status', async (req, res) => {
    try {
      const { getConnectionStatus, healthCheck } = require('./database');
      const connectionStatus = getConnectionStatus();
      const health = await healthCheck();
      
      res.status(200).json({
        status: 'OK',
        connection: connectionStatus,
        health: health,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        status: 'ERROR',
        message: 'Erreur lors de la vérification de la base de données',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Route d'informations système
  app.get('/system-info', (req, res) => {
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };

    res.status(200).json(systemInfo);
  });

  // Route de métriques (pour monitoring)
  app.get('/metrics', (req, res) => {
    const metrics = {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        heapUsed: process.memoryUsage().heapUsed,
        heapTotal: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external,
        rss: process.memoryUsage().rss
      },
      cpu: process.cpuUsage(),
      activeConnections: process._getActiveRequests ? process._getActiveRequests().length : 'N/A'
    };

    res.status(200).json(metrics);
  });

  // Route 404 personnalisée
  app.use('*', (req, res) => {
    res.status(404).json({
      status: 'ERROR',
      message: 'Route non trouvée',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      availableEndpoints: [
        'GET /health',
        'GET /db-status', 
        'GET /system-info',
        'GET /metrics'
      ]
    });
  });

  // Middleware de gestion d'erreurs global avancé
  app.use((error, req, res, next) => {
    // Log de l'erreur
    console.error('Erreur serveur:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });

    // Réponse d'erreur adaptée à l'environnement
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    const errorResponse = {
      status: 'ERROR',
      message: isDevelopment ? error.message : 'Erreur interne du serveur',
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method
    };

    // Ajouter les détails en développement
    if (isDevelopment) {
      errorResponse.stack = error.stack;
      errorResponse.details = error;
    }

    // Code de statut approprié
    const statusCode = error.status || error.statusCode || 500;
    res.status(statusCode).json(errorResponse);
  });
};

module.exports = {
  configureApp,
  configureRoutes
}; 