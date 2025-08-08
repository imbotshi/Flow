/**
 * Script pour démarrer les serveurs et diagnostiquer les problèmes de connexion
 */

const { spawn } = require('child_process');
const net = require('net');

console.log('🚀 Démarrage des serveurs Vania Flow');
console.log('====================================');

// Configuration
const config = {
  backendPort: 5000,
  frontendPort: 5174,
  host: '0.0.0.0'
};

// Fonction pour vérifier si un port est ouvert
function checkPort(port, host = 'localhost') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.connect(port, host);
  });
}

// Fonction pour démarrer le backend
function startBackend() {
  console.log('\n🔧 Démarrage du serveur backend...');
  
  const backend = spawn('npm', ['start'], {
    cwd: './backend',
    stdio: 'pipe',
    shell: true
  });
  
  backend.stdout.on('data', (data) => {
    console.log(`[Backend] ${data.toString().trim()}`);
  });
  
  backend.stderr.on('data', (data) => {
    console.error(`[Backend Error] ${data.toString().trim()}`);
  });
  
  backend.on('close', (code) => {
    console.log(`[Backend] Processus terminé avec le code ${code}`);
  });
  
  return backend;
}

// Fonction pour démarrer le frontend
function startFrontend() {
  console.log('\n🎨 Démarrage du serveur frontend...');
  
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: './frontend',
    stdio: 'pipe',
    shell: true
  });
  
  frontend.stdout.on('data', (data) => {
    console.log(`[Frontend] ${data.toString().trim()}`);
  });
  
  frontend.stderr.on('data', (data) => {
    console.error(`[Frontend Error] ${data.toString().trim()}`);
  });
  
  frontend.on('close', (code) => {
    console.log(`[Frontend] Processus terminé avec le code ${code}`);
  });
  
  return frontend;
}

// Fonction pour vérifier les ports
async function checkPorts() {
  console.log('\n🔍 Vérification des ports...');
  
  const backendOpen = await checkPort(config.backendPort);
  const frontendOpen = await checkPort(config.frontendPort);
  
  console.log(`Backend (${config.backendPort}): ${backendOpen ? '✅ Ouvert' : '❌ Fermé'}`);
  console.log(`Frontend (${config.frontendPort}): ${frontendOpen ? '✅ Ouvert' : '❌ Fermé'}`);
  
  return { backendOpen, frontendOpen };
}

// Fonction pour afficher les informations de connexion
function showConnectionInfo() {
  console.log('\n📱 Informations de connexion pour votre téléphone:');
  console.log('==================================================');
  console.log(`Frontend: http://192.168.1.216:${config.frontendPort}`);
  console.log(`Backend:  http://192.168.1.216:${config.backendPort}`);
  console.log('\n⚠️  Assurez-vous que:');
  console.log('1. Votre téléphone est sur le même réseau Wi-Fi');
  console.log('2. Le pare-feu Windows autorise les connexions');
  console.log('3. Les deux serveurs sont démarrés (voir ci-dessus)');
}

// Fonction principale
async function main() {
  try {
    // Démarrer les serveurs
    const backend = startBackend();
    const frontend = startFrontend();
    
    // Attendre que les serveurs démarrent
    console.log('\n⏳ Attente du démarrage des serveurs...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Vérifier les ports
    const ports = await checkPorts();
    
    // Afficher les informations de connexion
    showConnectionInfo();
    
    // Garder le script en vie
    process.on('SIGINT', () => {
      console.log('\n🛑 Arrêt des serveurs...');
      backend.kill();
      frontend.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Démarrer le script
main(); 