<template>
  <div class="v-divider">
    <div class="v-divider__line"></div>
    <span v-if="text" class="v-divider__text">{{ text }}</span>
    <div class="v-divider__line"></div>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.v-divider {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 9px;
}

.v-divider__line {
  flex: 1;
  height: 1px;
  background: rgba(245, 245, 245, 0.4);
}

.v-divider__text {
  color: rgba(255, 255, 255, 0.64);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.14px;
}
</style>
