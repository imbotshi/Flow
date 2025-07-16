<template>
  <div class="vania-logo" :class="logoClasses">
    <svg
      :width="logoSize.width"
      :height="logoSize.height"
      viewBox="0 0 161 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11.2582" cy="13.7867" r="3.14295" :fill="iconColor" />
      <path
        d="M18.0544 21.5138C18.0948 21.4345 18.135 21.355 18.1751 21.2751L17.9691 21.7414L11.2663 36.9071L4.45703 21.2751L4.57743 21.5138C7.60138 27.4249 11.2668 31.8037 11.2668 31.8037C11.2668 31.8037 15.0122 27.4878 18.0544 21.5138Z"
        :fill="iconColor"
      />
      <path
        d="M18.1757 21.3946C15.1129 27.4919 11.2673 31.9231 11.2673 31.9231C11.2673 31.9231 2.06966 20.9352 0.793945 10.2744L4.96831 10.2744C4.96207 10.3894 4.95892 10.5052 4.95892 10.6217C4.95892 17.3553 11.2673 24.8916 11.2673 24.8916C11.2673 24.8916 17.5758 17.6224 17.5758 10.6217C17.5758 10.5052 17.5726 10.3894 17.5664 10.2744H21.75C21.4775 12.6926 20.818 15.0939 19.9549 17.369L18.1757 21.3946Z"
        :fill="leafColor"
      />
      <text
        :fill="vaniaColor"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Tobias TRIAL"
        :font-size="fontSize"
        font-weight="500"
        letter-spacing="0em"
      >
        <tspan x="28.9043" y="34.647">Vania</tspan>
      </text>
      <text
        :fill="flowColor"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Pacifico"
        :font-size="fontSize"
        letter-spacing="0em"
      >
        <tspan x="103.696" y="34.647">Flow</tspan>
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  theme: {
    type: String,
    default: "default",
    validator: (value) => ["default", "light", "success"].includes(value),
  },
});

const logoClasses = computed(() => [
  "vania-logo--base",
  `vania-logo--${props.size}`,
  `vania-logo--${props.theme}`,
]);

const logoSize = computed(() => {
  const sizes = {
    small: { width: 120, height: 35 },
    medium: { width: 161, height: 47 },
    large: { width: 200, height: 58 },
  };
  return sizes[props.size];
});

const fontSize = computed(() => {
  const sizes = {
    small: "19",
    medium: "26",
    large: "32",
  };
  return sizes[props.size];
});

const iconColor = computed(() => {
  if (props.theme === "light") return "#E1F524";
  if (props.theme === "success") return "#153D1C";
  return "#153D1C";
});

const leafColor = computed(() => {
  if (props.theme === "light") return "#E1F524";
  if (props.theme === "success") return "#153D1C";
  return "#31920B";
});

const vaniaColor = computed(() => {
  if (props.theme === "light") return "white";
  if (props.theme === "success") return "#0A200E";
  return "#153D1C";
});

const flowColor = computed(() => {
  if (props.theme === "light") return "#E1F524";
  if (props.theme === "success") return "#0A200E";
  return "#31920B";
});
</script>

<style scoped>
.vania-logo--base {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vania-logo--small svg {
  max-width: 120px;
}

.vania-logo--medium svg {
  max-width: 161px;
}

.vania-logo--large svg {
  max-width: 200px;
}
</style>
