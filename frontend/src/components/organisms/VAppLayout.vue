<template>
  <div class="app-layout" :class="layoutClasses" data-bind="app-layout">
    <header v-if="showHeader" class="app-header" data-bind="app-header">
      <VaniaLogo :size="logoSize" :theme="logoTheme" data-bind="app-logo" />
    </header>

    <main class="app-content" data-bind="app-content">
      <slot />
    </main>

    <footer v-if="showTestimonial" class="app-footer" data-bind="app-footer">
      <section class="testimonial-section" data-bind="testimonial">
        <blockquote class="testimonial-quote" data-bind="testimonial-quote">
          {{ testimonialText }}
        </blockquote>
        <cite class="testimonial-author" data-bind="testimonial-author">
          {{ testimonialAuthor }}
        </cite>
      </section>
    </footer>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VaniaLogo from "../atoms/VaniaLogo.vue";

const props = defineProps({
  theme: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark", "success"].includes(value),
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  showTestimonial: {
    type: Boolean,
    default: false,
  },
  testimonialText: {
    type: String,
    default: "J'ai testé, j'ai adopté. Vania m'a évité des migraines.",
  },
  testimonialAuthor: {
    type: String,
    default: "Bernard, Bailleur à Douala",
  },
});

const layoutClasses = computed(() => [
  "app-layout--base",
  `app-layout--${props.theme}`,
  {
    "app-layout--with-header": props.showHeader,
    "app-layout--with-testimonial": props.showTestimonial,
  },
]);

const logoSize = computed(() => {
  return props.theme === "success" ? "large" : "medium";
});

const logoTheme = computed(() => {
  if (props.theme === "dark") return "light";
  if (props.theme === "success") return "success";
  return "default";
});
</script>

<style scoped>
/* === APP LAYOUT BASE - FIGMA EXACT STRUCTURE === */
.app-layout--base {
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  display: flex;
  flex-direction: column;
  padding: 38px;
  gap: 47px;
  position: relative;
  isolation: isolate;
}

/* === THEME VARIANTS - FIGMA EXACT COLORS === */
.app-layout--light {
  background: var(--light-gray, #f5f5f5);
  color: var(--primary-green, #153d1c);
}

.app-layout--dark {
  background: linear-gradient(
    180deg,
    var(--dark-green, #0b8544) 0%,
    var(--medium-green, #15a357) 100%
  );
  color: var(--white, #ffffff);
}

.app-layout--success {
  background: linear-gradient(
    170deg,
    var(--light-green, #e1f524) 0%,
    var(--bright-green, #b9f524) 97.69%
  );
  color: var(--dark-text, #0a200e);
}

/* === HEADER SECTION - FIGMA POSITIONING === */
.app-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  z-index: 10;
}

/* === CONTENT SECTION - FIGMA CONSTRAINTS === */
.app-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 5;
}

/* === FOOTER SECTION - FIGMA TESTIMONIAL === */
.app-footer {
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 10;
}

.testimonial-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 31px;
  max-width: 327px;
  width: 100%;
  text-align: center;
}

/* === TESTIMONIAL TYPOGRAPHY - FIGMA EXACT SPECS === */
.testimonial-quote {
  color: rgba(245, 245, 245, 0.82);
  font-family: var(
    --font-accent,
    "Pacifico",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-size: 26px;
  font-weight: 400;
  line-height: 1.14;
  letter-spacing: -0.26px;
  margin: 0;
  font-style: normal;
}

.testimonial-author {
  color: rgba(245, 245, 245, 0.82);
  font-family: var(
    --font-primary,
    "Figtree",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif
  );
  font-size: 16px;
  font-style: italic;
  font-weight: 700;
  line-height: 0.64;
  letter-spacing: -0.16px;
  margin: 0;
}

/* === RESPONSIVE DESIGN - FIGMA BREAKPOINTS === */
@media (max-width: 360px) {
  .app-layout--base {
    padding: 24px 16px;
    gap: 32px;
  }

  .app-content {
    max-width: 100%;
  }

  .testimonial-quote {
    font-size: 22px;
    letter-spacing: -0.22px;
  }

  .testimonial-author {
    font-size: 14px;
    letter-spacing: -0.14px;
  }

  .testimonial-section {
    gap: 24px;
    max-width: 280px;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .app-layout--base {
    padding: 32px 24px;
    gap: 40px;
  }

  .app-content {
    max-width: 380px;
  }
}

@media (min-width: 768px) {
  .app-layout--base {
    padding: 48px;
    gap: 56px;
  }

  .app-content {
    max-width: 500px;
  }

  .testimonial-quote {
    font-size: 28px;
    letter-spacing: -0.28px;
  }

  .testimonial-section {
    max-width: 400px;
    gap: 36px;
  }
}

@media (min-width: 1024px) {
  .app-layout--base {
    padding: 64px;
    gap: 64px;
  }

  .app-content {
    max-width: 600px;
  }

  .testimonial-quote {
    font-size: 30px;
    letter-spacing: -0.3px;
  }
}

/* === LAYOUT MODIFIERS === */
.app-layout--with-header .app-content {
  margin-top: 0;
}

.app-layout--with-testimonial .app-content {
  margin-bottom: 0;
}

/* === ACCESSIBILITY IMPROVEMENTS === */
@media (prefers-reduced-motion: reduce) {
  .app-layout--base {
    animation: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .app-layout--light {
    background: var(--white, #ffffff);
    color: var(--primary-green, #153d1c);
  }

  .testimonial-quote,
  .testimonial-author {
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
}

/* === DARK MODE SUPPORT === */
@media (prefers-color-scheme: dark) {
  .app-layout--light {
    background: #1a1a1a;
    color: var(--light-gray, #f5f5f5);
  }
}

/* === PRINT STYLES === */
@media print {
  .app-layout--base {
    background: white !important;
    color: black !important;
    padding: 20px;
    gap: 20px;
  }

  .app-footer,
  .testimonial-section {
    display: none;
  }
}

/* === SAFE AREA SUPPORT FOR MOBILE === */
@supports (padding: max(0px)) {
  .app-layout--base {
    padding-top: max(38px, env(safe-area-inset-top));
    padding-bottom: max(38px, env(safe-area-inset-bottom));
    padding-left: max(38px, env(safe-area-inset-left));
    padding-right: max(38px, env(safe-area-inset-right));
  }

  @media (max-width: 360px) {
    .app-layout--base {
      padding-top: max(24px, env(safe-area-inset-top));
      padding-bottom: max(24px, env(safe-area-inset-bottom));
      padding-left: max(16px, env(safe-area-inset-left));
      padding-right: max(16px, env(safe-area-inset-right));
    }
  }
}

/* === DYNAMIC THEME STATES - READY FOR BINDING === */
.app-layout--base[data-loading="true"] {
  overflow: hidden;
}

.app-layout--base[data-loading="true"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  opacity: 0.8;
  z-index: 999;
}

.app-layout--base[data-loading="true"]::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  z-index: 1000;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
