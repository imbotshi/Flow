# Corrections du Système de Photos de Profil

## Problèmes Identifiés

### 1. **Lors de l'inscription** : La photo de profil était toujours stockée comme avant
- **Cause** : Le processus d'inscription envoyait directement le base64 au lieu d'utiliser le nouveau système d'upload
- **Solution** : Modification de `SuccessPage.vue` pour uploader la photo avant la finalisation

### 2. **Sur le dashboard** : La photo affichée n'était pas celle de l'utilisateur
- **Cause** : L'URL de la photo n'était pas construite correctement pour le nouveau système
- **Solution** : Modification du computed property `userPhoto` dans `DashboardPage.vue`

## Modifications Apportées

### Frontend

#### 1. `frontend/src/pages/SuccessPage.vue`
```javascript
// Ajout de l'import du service d'upload
import uploadService from '../services/uploadService.js';

// Modification de la fonction saveUser()
const saveUser = async () => {
  // D'abord, uploader la photo de profil si elle existe
  let profilePictureFilename = '';
  
  if (signup.profile_picture) {
    // Convertir le base64 en fichier
    const file = await uploadService.base64ToFile(signup.profile_picture, 'profile-photo.jpg');
    
    // Uploader le fichier
    const uploadResult = await uploadService.uploadProfilePhoto(file, signup.phone_number);
    
    if (uploadResult.success) {
      profilePictureFilename = uploadResult.filename;
    }
  }
  
  // Ensuite, finaliser l'inscription avec le nom du fichier
  const result = await userService.finaliserInscription({
    // ... autres données
    profile_picture: profilePictureFilename, // Nom du fichier au lieu du base64
  });
};
```

#### 2. `frontend/src/services/uploadService.js`
```javascript
// Ajout de la méthode base64ToFile
async base64ToFile(base64, filename) {
  // Extraire le type MIME et les données
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Format base64 invalide');
  }
  
  const mimeType = matches[1];
  const data = matches[2];
  
  // Convertir base64 en blob puis en fichier
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  
  return new File([blob], filename, { type: mimeType });
}
```

#### 3. `frontend/src/pages/DashboardPage.vue`
```javascript
// Modification du computed property userPhoto
const userPhoto = computed(() => {
  const photoProfil = userData.value?.photoProfil;
  
  if (!photoProfil) {
    // Image par défaut si pas de photo
    return "https://api.builder.io/api/v1/image/assets/TEMP/01f5cbda9f8ae931a5d85847b4db7dc680bdee67?width=92";
  }
  
  // Si c'est déjà une URL complète, l'utiliser
  if (photoProfil.startsWith('http')) {
    return photoProfil;
  }
  
  // Sinon, construire l'URL avec le nouveau système
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const photoUrl = `${baseUrl}/static/profile-photos/${photoProfil}`;
  return photoUrl;
});
```

## Flux de Données Corrigé

### Avant (Problématique)
1. `UserInfoPage.vue` → Convertit photo en base64 → Store signup
2. `SuccessPage.vue` → Envoie base64 directement au backend
3. Backend → Stocke base64 dans la base de données
4. `DashboardPage.vue` → Affiche base64 ou URL incorrecte

### Après (Corrigé)
1. `UserInfoPage.vue` → Convertit photo en base64 → Store signup
2. `SuccessPage.vue` → Convertit base64 en fichier → Upload via API
3. Backend → Stocke fichier sur disque → Sauvegarde nom du fichier en DB
4. `DashboardPage.vue` → Construit URL correcte → Affiche photo

## Tests et Vérification

### Scripts de Test Créés
- `backend/test-photo-system.js` : Vérifie la structure et les routes
- `frontend/test-inscription-photo.js` : Simule le processus d'inscription

### Points de Vérification
1. ✅ Dossier `uploads/profile-photos/` existe
2. ✅ Routes d'upload et de service statique configurées
3. ✅ Conversion base64 → fichier fonctionne
4. ✅ Construction d'URL correcte pour l'affichage
5. ✅ Gestion des cas d'erreur et images par défaut

## Résultat

- **Inscription** : Les photos sont maintenant uploadées via le nouveau système et stockées comme fichiers
- **Dashboard** : Les photos s'affichent correctement en utilisant les URLs construites dynamiquement
- **Performance** : Réduction de la taille de la base de données (noms de fichiers vs base64)
- **Maintenance** : Système plus robuste et évolutif 