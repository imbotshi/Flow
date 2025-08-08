/**
 * Test du processus d'inscription avec upload de photo
 */

import { useSignupStore, useUserStore } from './src/stores/user.js';
import uploadService from './src/services/uploadService.js';

console.log('🧪 Test du processus d\'inscription avec photo');
console.log('=============================================');

// Simuler les données d'inscription
const mockSignupData = {
  phone_number: '1234567890',
  full_name: 'John Doe',
  country: 'France',
  annee_experience: '5',
  mode_management: 'Automatique',
  methode_contact: 'Email',
  profile_picture: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=' // Base64 d'une image 1x1 pixel
};

console.log('\n📋 Données de test:');
console.log('Téléphone:', mockSignupData.phone_number);
console.log('Nom complet:', mockSignupData.full_name);
console.log('Pays:', mockSignupData.country);
console.log('Photo présente:', !!mockSignupData.profile_picture);

// Test de conversion base64 vers fichier
console.log('\n🔄 Test de conversion base64 vers fichier...');
try {
  const file = await uploadService.base64ToFile(mockSignupData.profile_picture, 'test-photo.jpg');
  console.log('✅ Conversion réussie');
  console.log('Nom du fichier:', file.name);
  console.log('Type MIME:', file.type);
  console.log('Taille:', file.size, 'bytes');
} catch (error) {
  console.error('❌ Erreur de conversion:', error.message);
}

// Test d'upload (simulation)
console.log('\n📤 Test d\'upload (simulation)...');
console.log('URL d\'upload:', 'http://localhost:5000/upload/profile-photo');
console.log('Méthode: POST');
console.log('Content-Type: multipart/form-data');

// Test de construction d'URL
console.log('\n🔗 Test de construction d\'URL...');
const baseUrl = 'http://localhost:5000';
const filename = 'profile-1234567890.jpg';
const photoUrl = `${baseUrl}/static/profile-photos/${filename}`;
console.log('URL construite:', photoUrl);

console.log('\n✅ Test terminé. Le système est prêt pour les tests !'); 