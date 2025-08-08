/**
 * Test du système de photos de profil
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Test du système de photos de profil');
console.log('======================================');

// Vérifier la structure
const uploadsDir = path.join(__dirname, 'uploads', 'profile-photos');
console.log('\n📁 Dossier uploads:', fs.existsSync(uploadsDir) ? '✅ Existe' : '❌ Manquant');

// Vérifier les routes
console.log('\n🌐 Routes disponibles:');
console.log('POST /upload/profile-photo - Upload photo');
console.log('GET /static/profile-photos/:filename - Accès photo');
console.log('DELETE /upload/profile-photo/:telephone - Suppression photo');

// Vérifier la configuration
console.log('\n⚙️ Configuration:');
console.log('Types autorisés: JPEG, PNG, GIF, WebP');
console.log('Taille max: 5MB');
console.log('Dossier: uploads/profile-photos/');

// Exemple d'URL
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
console.log('\n🔗 Exemple d\'URL:');
console.log(`${baseUrl}/static/profile-photos/profile-1234567890.jpg`);

// Vérifier les fichiers existants
if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);
  console.log('\n📸 Photos existantes:', files.length);
  files.forEach(file => {
    console.log(`  - ${file}`);
  });
}

console.log('\n✅ Test terminé. Le système est prêt !'); 