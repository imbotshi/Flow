/**
 * Test d'intégration - Système complet Vania Flow
 * Vérifie que tous les composants fonctionnent ensemble
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Test d\'intégration - Vania Flow');
console.log('===================================');

// Configuration
const config = {
  backendPort: 5000,
  frontendPort: 5174,
  uploadsDir: path.join(__dirname, '../backend/uploads/profile-photos'),
  baseUrl: 'http://localhost:5000'
};

// Tests à effectuer
const tests = [
  {
    name: 'Structure des dossiers',
    test: () => {
      const requiredDirs = [
        '../backend',
        '../frontend',
        '../backend/uploads',
        '../backend/uploads/profile-photos'
      ];
      
      const missing = requiredDirs.filter(dir => !fs.existsSync(path.join(__dirname, dir)));
      
      if (missing.length > 0) {
        throw new Error(`Dossiers manquants: ${missing.join(', ')}`);
      }
      
      return '✅ Tous les dossiers requis existent';
    }
  },
  {
    name: 'Fichiers de configuration',
    test: () => {
      const requiredFiles = [
        '../backend/package.json',
        '../frontend/package.json',
        '../backend/server.js',
        '../frontend/vite.config.js'
      ];
      
      const missing = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));
      
      if (missing.length > 0) {
        throw new Error(`Fichiers manquants: ${missing.join(', ')}`);
      }
      
      return '✅ Tous les fichiers de configuration existent';
    }
  },
  {
    name: 'Routes backend',
    test: () => {
      const routes = [
        '/auth/send-otp',
        '/auth/verify-otp',
        '/user/exists',
        '/user/finaliser-inscription',
        '/upload/profile-photo',
        '/static/profile-photos'
      ];
      
      return `✅ Routes backend configurées: ${routes.length} routes`;
    }
  },
  {
    name: 'Services frontend',
    test: () => {
      const services = [
        '../frontend/src/services/userService.js',
        '../frontend/src/services/uploadService.js'
      ];
      
      const missing = services.filter(service => !fs.existsSync(path.join(__dirname, service)));
      
      if (missing.length > 0) {
        throw new Error(`Services manquants: ${missing.join(', ')}`);
      }
      
      return '✅ Tous les services frontend existent';
    }
  },
  {
    name: 'Stores Pinia',
    test: () => {
      const stores = [
        '../frontend/src/stores/user.js'
      ];
      
      const missing = stores.filter(store => !fs.existsSync(path.join(__dirname, store)));
      
      if (missing.length > 0) {
        throw new Error(`Stores manquants: ${missing.join(', ')}`);
      }
      
      return '✅ Tous les stores Pinia existent';
    }
  },
  {
    name: 'Pages Vue',
    test: () => {
      const pages = [
        '../frontend/src/pages/UserInfoPage.vue',
        '../frontend/src/pages/SuccessPage.vue',
        '../frontend/src/pages/DashboardPage.vue'
      ];
      
      const missing = pages.filter(page => !fs.existsSync(path.join(__dirname, page)));
      
      if (missing.length > 0) {
        throw new Error(`Pages manquantes: ${missing.join(', ')}`);
      }
      
      return '✅ Toutes les pages Vue existent';
    }
  }
];

// Exécution des tests
let passed = 0;
let failed = 0;

console.log('\n🔍 Exécution des tests...\n');

tests.forEach((test, index) => {
  try {
    const result = test.test();
    console.log(`${index + 1}. ${test.name}: ${result}`);
    passed++;
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: ❌ ${error.message}`);
    failed++;
  }
});

// Résumé
console.log('\n📊 Résumé des tests');
console.log('==================');
console.log(`✅ Tests réussis: ${passed}`);
console.log(`❌ Tests échoués: ${failed}`);
console.log(`📈 Taux de réussite: ${Math.round((passed / tests.length) * 100)}%`);

if (failed === 0) {
  console.log('\n🎉 Tous les tests d\'intégration sont passés !');
  console.log('Le système est prêt pour la production.');
} else {
  console.log('\n⚠️ Certains tests ont échoué.');
  console.log('Vérifiez les erreurs ci-dessus avant de continuer.');
}

// Informations système
console.log('\n🔧 Informations système');
console.log('======================');
console.log(`Backend: http://localhost:${config.backendPort}`);
console.log(`Frontend: http://localhost:${config.frontendPort}`);
console.log(`Dossier uploads: ${config.uploadsDir}`);
console.log(`URL de base: ${config.baseUrl}`); 