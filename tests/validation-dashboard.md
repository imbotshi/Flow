# Rapport de validation fonctionnelle – Dashboard Vania Flow

**Date :** [JJ/MM/AAAA]  
**Testeur :** [Nom]  
**Version :** [commit/tag]

---

## Résumé

Tous les scénarios utilisateurs du PRD ont été testés manuellement et/ou automatiquement.  
Les résultats sont conformes aux attentes, aucune anomalie bloquante n’a été détectée.

---

## Checklist de validation fonctionnelle

- [ ] 1. Connexion et redirection fonctionnent (utilisateur non authentifié → /login, authentifié → /dashboard)
- [ ] 2. Affichage dynamique des crédits utilisateur (solde correct, mise à jour après achat)
- [ ] 3. Liste des partenaires dynamique (chargement, pagination, état vide, erreur)
- [ ] 4. Relances groupées dynamiques (chargement, état vide, erreur, création OK)
- [ ] 5. Actions récentes dynamiques (pagination, bouton “Afficher plus”, état vide, erreur)
- [ ] 6. Statistiques globales affichées et cohérentes
- [ ] 7. Navigation menu utilisateur (tous les liens redirigent et chargent les données backend)
- [ ] 8. Ajout de partenaire (API appelée, feedback affiché, liste rafraîchie)
- [ ] 9. Programmation de relance (API appelée, crédits décrémentés, feedback affiché, liste rafraîchie)
- [ ] 10. Achat de crédits (API appelée, solde mis à jour, feedback affiché)
- [ ] 11. Modification profil (API appelée, données mises à jour)
- [ ] 12. Déconnexion (session vidée, redirection /login)
- [ ] 13. Gestion des erreurs (token expiré, crédits insuffisants, réseau, feedback affiché)
- [ ] 14. UI/UX responsive (mobile, tablette, desktop)
- [ ] 15. Accessibilité (navigation clavier, aria-labels, focus visible)
- [ ] 16. Loaders et messages d’état vide présents sur chaque section

---

## Scénarios testés

| Scénario                         | Résultat | Commentaire / Bug |
|-----------------------------------|----------|-------------------|
| Connexion / Redirection           | ✅ / ❌   |                   |
| Crédits utilisateur               | ✅ / ❌   |                   |
| Liste partenaires                 | ✅ / ❌   |                   |
| Relances groupées                 | ✅ / ❌   |                   |
| Actions récentes                  | ✅ / ❌   |                   |
| Statistiques globales             | ✅ / ❌   |                   |
| Navigation menu                   | ✅ / ❌   |                   |
| Ajout partenaire                  | ✅ / ❌   |                   |
| Programmation relance             | ✅ / ❌   |                   |
| Achat crédits                     | ✅ / ❌   |                   |
| Modification profil               | ✅ / ❌   |                   |
| Déconnexion                       | ✅ / ❌   |                   |
| Gestion erreurs                   | ✅ / ❌   |                   |
| UI/UX responsive                  | ✅ / ❌   |                   |
| Accessibilité                     | ✅ / ❌   |                   |
| Loaders / états vides             | ✅ / ❌   |                   |

---

## Bugs ou points à corriger

- [ ] Aucun bug bloquant
- [ ] [Décrire ici tout bug ou point d’amélioration]

---

## Conclusion

- [ ] Le dashboard est validé fonctionnellement et prêt pour la livraison/merge.
- [ ] [Optionnel] Démo réalisée avec [Nom du client/pair].

---

**Signature :** 