# Points d'Ancrage pour Contenu Dynamique

## Vue d'ensemble

Tous les composants Vania Flow ont été optimisés avec des points d'ancrage (`data-bind`) pour faciliter l'intégration de contenu dynamique. Cette documentation explique comment utiliser ces points d'ancrage pour connecter vos données et APIs.

## Structure des Data-Bind

### Conventions de nommage

- Format: `data-bind="component-element"`
- Exemple: `data-bind="login-page"`, `data-bind="phone-input"`
- Hiérarchie: page > section > component > element

## Pages

### LoginPage (`data-bind="login-page"`)

```vue
<main class="login-container" data-bind="login-page">
  <form class="login-form" data-bind="login-form">
    <!-- Sections avec points d'ancrage -->
    <section data-bind="phone-section">
      <VInput data-bind="phone-number" />
    </section>
    
    <section data-bind="security-section">
      <VInput data-bind="security-code" />
      <button data-bind="send-code" />
      <button data-bind="resend-code" />
    </section>
    
    <section data-bind="actions-section">
      <VButton data-bind="validate-button" />
      <VButton data-bind="signup-button" />
    </section>
  </form>
</main>
```

**États dynamiques disponibles:**

- `data-error="true"` - État d'erreur
- `data-loading="true"` - État de chargement
- `data-success="true"` - État de succès

## Composants Atoms

### VInput (`data-bind="input-wrapper"`)

```vue
<div data-bind="input-wrapper">
  <div data-bind="input-container">
    <div data-bind="input-icon"><!-- Icône --></div>
    <input data-bind="input-field" />
    <div data-bind="input-action"><!-- Actions --></div>
  </div>
  <div data-bind="input-divider"><!-- Séparateur --></div>
</div>
```

**Propriétés dynamiques:**

- `autocomplete` - Auto-complétion HTML5
- `inputmode` - Type de clavier mobile
- `aria-label` - Accessibilité
- `data-error`, `data-success`, `data-loading` - États visuels

### VButton (`data-bind="button"`)

```vue
<button data-bind="button">
  <span data-bind="button-icon"><!-- Icône --></span>
  <span data-bind="button-text"><!-- Texte --></span>
</button>
```

**États dynamiques:**

- `data-state="success|error|warning"` - États colorés
- `data-loading="true"` - Animation de chargement

## Composants Organisms

### VAppLayout (`data-bind="app-layout"`)

```vue
<div data-bind="app-layout">
  <header data-bind="app-header">
    <VaniaLogo data-bind="app-logo" />
  </header>
  
  <main data-bind="app-content">
    <!-- Contenu de la page -->
  </main>
  
  <footer data-bind="app-footer">
    <section data-bind="testimonial">
      <blockquote data-bind="testimonial-quote" />
      <cite data-bind="testimonial-author" />
    </section>
  </footer>
</div>
```

**Props dynamiques:**

- `testimonialText` - Texte du témoignage
- `testimonialAuthor` - Auteur du témoignage

## Intégration API

### Exemple avec Pinia Store

```javascript
// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    phoneNumber: "",
    securityCode: "",
    isLoading: false,
    error: null,
  }),

  actions: {
    async sendOTP(phoneNumber) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch("/api/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber }),
        });

        if (!response.ok) throw new Error("Erreur envoi OTP");

        // Mettre à jour l'état via data-bind
        document
          .querySelector('[data-bind="phone-section"]')
          ?.setAttribute("data-success", "true");
      } catch (error) {
        this.error = error.message;
        document
          .querySelector('[data-bind="phone-section"]')
          ?.setAttribute("data-error", "true");
      } finally {
        this.isLoading = false;
      }
    },
  },
});
```

### Exemple avec Composables

```javascript
// composables/useAuth.js
import { ref, computed } from "vue";

export function useAuth() {
  const phoneNumber = ref("");
  const securityCode = ref("");
  const isLoading = ref(false);
  const error = ref(null);

  const canValidate = computed(
    () => phoneNumber.value.length > 0 && securityCode.value.length > 0,
  );

  const sendOTP = async () => {
    const phoneSection = document.querySelector('[data-bind="phone-section"]');
    const sendButton = document.querySelector('[data-bind="send-code"]');

    isLoading.value = true;
    sendButton?.setAttribute("data-loading", "true");

    try {
      // Appel API
      await apiService.sendOTP(phoneNumber.value);
      phoneSection?.setAttribute("data-success", "true");
    } catch (err) {
      error.value = err.message;
      phoneSection?.setAttribute("data-error", "true");
    } finally {
      isLoading.value = false;
      sendButton?.removeAttribute("data-loading");
    }
  };

  return {
    phoneNumber,
    securityCode,
    isLoading,
    error,
    canValidate,
    sendOTP,
  };
}
```

## États Visuels Dynamiques

### Classes CSS automatiques

```css
/* États d'erreur */
[data-error="true"] {
  animation: shake 0.3s ease-in-out;
  border-color: var(--error-color);
}

/* États de succès */
[data-success="true"] {
  border-color: var(--success-color);
  box-shadow: 0 0 0 3px rgba(49, 146, 11, 0.1);
}

/* États de chargement */
[data-loading="true"] {
  position: relative;
  pointer-events: none;
}

[data-loading="true"]::after {
  content: "";
  position: absolute;
  /* Animation spinner */
}
```

### Manipulation programmatique

```javascript
// Fonctions utilitaires pour les états
const setElementState = (selector, state, value = "true") => {
  const element = document.querySelector(`[data-bind="${selector}"]`);
  if (element) {
    if (value) {
      element.setAttribute(`data-${state}`, value);
    } else {
      element.removeAttribute(`data-${state}`);
    }
  }
};

// Exemples d'usage
setElementState("phone-input", "error", "true");
setElementState("validate-button", "loading", "true");
setElementState("login-form", "success", "true");

// Reset tous les états
const resetStates = (selector) => {
  const element = document.querySelector(`[data-bind="${selector}"]`);
  if (element) {
    ["error", "success", "loading"].forEach((state) => {
      element.removeAttribute(`data-${state}`);
    });
  }
};
```

## Accessibilité et ARIA

Tous les composants incluent les attributs ARIA appropriés :

```vue
<!-- Exemple complet avec accessibilité -->
<VInput
  v-model="phoneNumber"
  data-bind="phone-number"
  aria-label="Saisir votre numéro de téléphone"
  :aria-invalid="hasError"
  :aria-describedby="hasError ? 'phone-error' : null"
  autocomplete="tel"
  inputmode="tel"
/>

<div v-if="hasError" id="phone-error" role="alert">
  {{ errorMessage }}
</div>
```

## Intégration avec Builder.io

Pour une intégration future avec Builder.io, tous les `data-bind` peuvent être utilisés comme sélecteurs de composants :

```javascript
// Configuration Builder.io
const builderComponents = {
  "login-page": LoginPage,
  "phone-input": VInput,
  "validate-button": VButton,
};

// Mapping automatique via data-bind
document.querySelectorAll("[data-bind]").forEach((element) => {
  const bindName = element.getAttribute("data-bind");
  if (builderComponents[bindName]) {
    // Registrer le composant dans Builder.io
    Builder.registerComponent(builderComponents[bindName], {
      name: bindName,
      selector: `[data-bind="${bindName}"]`,
    });
  }
});
```

Cette structure permet une intégration fluide avec n'importe quel système de gestion de contenu ou CMS headless.
