<template>
  <div class="v-input-field-editable">
    <div class="v-input-field-editable__header">
      <div class="v-input-field-editable__label">
        <component
          v-if="icon"
          :is="icon"
          class="v-input-field-editable__icon"
        />
        <span>{{ label }}</span>
      </div>
      <div class="v-input-field-editable__value" v-if="!isEditing">
        <span :class="{ 'v-input-field-editable__placeholder': !modelValue }">
          {{ displayValue }}
        </span>
        <button
          v-if="editable"
          class="v-input-field-editable__edit-btn"
          @click="startEditing"
          type="button"
        >
          ✏️
        </button>
      </div>
      <div class="v-input-field-editable__input" v-else>
        <input
          ref="inputRef"
          v-model="localValue"
          :type="type"
          :placeholder="placeholder"
          @blur="saveValue"
          @keyup.enter="saveValue"
          @keyup.escape="cancelEdit"
          class="v-input-field-editable__input-element"
        />
        <button
          class="v-input-field-editable__save-btn"
          @click="saveValue"
          type="button"
        >
          ✓
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";

interface Props {
  label: string;
  modelValue: string;
  icon?: any;
  placeholder?: string;
  type?: string;
  editable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Vide",
  type: "text",
  editable: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const isEditing = ref(false);
const localValue = ref("");
const inputRef = ref<HTMLInputElement>();

const displayValue = computed(() => {
  return props.modelValue || props.placeholder;
});

const startEditing = async () => {
  if (!props.editable) return;

  isEditing.value = true;
  localValue.value = props.modelValue;

  await nextTick();
  inputRef.value?.focus();
  inputRef.value?.select();
};

const saveValue = () => {
  emit("update:modelValue", localValue.value);
  isEditing.value = false;
};

const cancelEdit = () => {
  localValue.value = props.modelValue;
  isEditing.value = false;
};
</script>

<style scoped>
.v-input-field-editable {
  width: 100%;
}

.v-input-field-editable__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.v-input-field-editable__label {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.v-input-field-editable__icon {
  width: 22px;
  height: 22px;
  color: #153d1c;
}

.v-input-field-editable__label span {
  color: #153d1c;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}

.v-input-field-editable__value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.v-input-field-editable__value span {
  color: rgba(21, 61, 28, 0.54);
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 142%;
  letter-spacing: -0.16px;
}

.v-input-field-editable__placeholder {
  color: rgba(21, 61, 28, 0.54) !important;
}

.v-input-field-editable__edit-btn,
.v-input-field-editable__save-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.v-input-field-editable__edit-btn:hover,
.v-input-field-editable__save-btn:hover {
  opacity: 1;
}

.v-input-field-editable__input {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.v-input-field-editable__input-element {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid rgba(21, 61, 28, 0.24);
  border-radius: 8px;
  font-family:
    Figtree,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  color: #153d1c;
  background: #fff;
  outline: none;
}

.v-input-field-editable__input-element:focus {
  border-color: #31920b;
  box-shadow: 0 0 0 2px rgba(49, 146, 11, 0.1);
}
</style>
