<template>
  <div class="v-avatar" :class="avatarClasses">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="v-avatar__image"
      @error="handleImageError"
    />
    <div v-else-if="initials" class="v-avatar__initials">
      {{ initials }}
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Props {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "small" | "medium" | "large" | "xl";
  variant?: "circle" | "rounded" | "square";
}

const props = withDefaults(defineProps<Props>(), {
  alt: "",
  size: "medium",
  variant: "circle",
});

const imageError = ref(false);

const avatarClasses = computed(() => [
  `v-avatar--${props.size}`,
  `v-avatar--${props.variant}`,
  {
    "v-avatar--error": imageError.value,
  },
]);

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style scoped>
.v-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 600;
  overflow: hidden;
  position: relative;
}

.v-avatar--small {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.v-avatar--medium {
  width: 48px;
  height: 48px;
  font-size: 16px;
}

.v-avatar--large {
  width: 64px;
  height: 64px;
  font-size: 20px;
}

.v-avatar--xl {
  width: 80px;
  height: 80px;
  font-size: 24px;
}

.v-avatar--circle {
  border-radius: 50%;
}

.v-avatar--rounded {
  border-radius: 8px;
}

.v-avatar--square {
  border-radius: 0;
}

.v-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.v-avatar__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
}
</style>
