# Tests - Vania Flow

Ce dossier contient tous les fichiers de test pour le projet Vania Flow.

## Structure

```
tests/
├── README.md                 # Ce fichier
├── backend/                  # Tests backend
│   └── test-photo-system.js  # Test du système de photos de profil
└── frontend/                 # Tests frontend
    └── test-inscription-photo.js # Test du processus d'inscription avec photo
```

## Tests Backend

### test-photo-system.js
Teste le système de photos de profil côté backend.

**Utilisation :**
```bash
cd backend
node ../tests/backend/test-photo-system.js
```

**Fonctionnalités testées :**
- ✅ Existence du dossier uploads
- ✅ Configuration des routes d'upload
- ✅ Types de fichiers autorisés
- ✅ Construction d'URLs
- ✅ Photos existantes

## Tests Frontend

### test-inscription-photo.js
Simule le processus d'inscription avec upload de photo.

**Utilisation :**
```bash
cd frontend
node ../tests/frontend/test-inscription-photo.js
```

**Fonctionnalités testées :**
- ✅ Conversion base64 vers fichier
- ✅ Simulation d'upload
- ✅ Construction d'URLs d'affichage
- ✅ Données d'inscription

## Ajout de Nouveaux Tests

### Pour le Backend
1. Créez le fichier dans `tests/backend/`
2. Nommez-le avec le préfixe `test-`
3. Documentez les fonctionnalités testées

### Pour le Frontend
1. Créez le fichier dans `tests/frontend/`
2. Nommez-le avec le préfixe `test-`
3. Utilisez les imports ES6 si nécessaire

## Bonnes Pratiques

- **Nommage** : Utilisez des noms descriptifs avec le préfixe `test-`
- **Documentation** : Commentez chaque test avec `// ✅` pour les succès
- **Logs** : Utilisez des emojis pour faciliter la lecture des logs
- **Erreurs** : Gérez les erreurs avec des messages clairs
- **Nettoyage** : Supprimez les fichiers temporaires après les tests

## Exécution Automatique

Pour exécuter tous les tests :

```bash
# Tests backend
cd backend && node ../tests/backend/test-photo-system.js

# Tests frontend
cd frontend && node ../tests/frontend/test-inscription-photo.js
```

## Maintenance

- Mettez à jour ce README quand vous ajoutez de nouveaux tests
- Supprimez les tests obsolètes
- Vérifiez que les tests passent après chaque modification majeure 