<template>
  <div class="photo-upload" :class="uploadClasses" data-bind="photo-upload">
    <!-- Upload Area -->
    <div
      class="upload-area custom-upload-area"
      :class="areaClasses"
      data-bind="upload-area"
      @click="triggerFileInput"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      @keydown="handleKeydown"
      tabindex="0"
      role="button"
      :aria-label="ariaLabel"
    >
      <!-- Preview Image -->
      <div
        v-if="previewUrl"
        class="preview-container"
        data-bind="preview-container"
      >
        <img
          :src="previewUrl"
          :alt="altText"
          class="preview-image"
          data-bind="preview-image"
        />
        <div class="preview-overlay" data-bind="preview-overlay">
          <button
            type="button"
            class="change-button"
            data-bind="change-button"
            @click.stop="triggerFileInput"
            aria-label="Changer la photo"
          >
            <EditIcon />
          </button>
          <button
            type="button"
            class="remove-button"
            data-bind="remove-button"
            @click.stop="removePhoto"
            aria-label="Supprimer la photo"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <!-- Upload Placeholder -->
      <div v-else class="upload-placeholder custom-upload-placeholder" data-bind="upload-placeholder">
        <button type="button" class="custom-upload-plus" aria-label="Ajouter une photo" @click.stop="triggerFileInput">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#31920b"/>
            <path d="M12 7v10M7 12h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-overlay" data-bind="loading-overlay">
        <div class="loading-spinner" data-bind="loading-spinner"></div>
      </div>
    </div>

    <!-- File Input -->
    <input
      ref="fileInput"
      type="file"
      :accept="acceptedTypes"
      class="file-input"
      data-bind="file-input"
      @change="handleFileSelect"
      aria-hidden="true"
    />

    <!-- Error Message -->
    <div
      v-if="error"
      class="error-message"
      data-bind="error-message"
      role="alert"
    >
      {{ error }}
    </div>

    <!-- File Info -->
    <div v-if="fileInfo && previewUrl" class="file-info" data-bind="file-info">
      <span class="file-name">{{ fileInfo.name }}</span>
      <span class="file-size">{{ formatFileSize(fileInfo.size) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import UploadIcon from "../atoms/icons/UploadIcon.vue";
import EditIcon from "../atoms/icons/EditIcon.vue";
import TrashIcon from "../atoms/icons/TrashIcon.vue";

const props = defineProps({
  modelValue: {
    type: [File, String, null],
    default: null,
  },
  label: {
    type: String,
    default: "Photo de profil",
  },
  hint: {
    type: String,
    default: "Cliquez ou glissez une image ici",
  },
  altText: {
    type: String,
    default: "Photo de profil",
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024, // 5MB
  },
  acceptedTypes: {
    type: String,
    default: "image/*",
  },
  acceptedFormats: {
    type: Array,
    default: () => ["jpg", "jpeg", "png", "gif", "webp"],
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  shape: {
    type: String,
    default: "circle",
    validator: (value) => ["circle", "square", "rounded"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "upload", "remove", "error"]);

// === STATE MANAGEMENT ===
const fileInput = ref(null);
const previewUrl = ref(null);
const isDragging = ref(false);
const isLoading = ref(false);
const error = ref(null);
const fileInfo = ref(null);

// === COMPUTED VALUES ===
const uploadClasses = computed(() => [
  "photo-upload--base",
  `photo-upload--${props.size}`,
  `photo-upload--${props.shape}`,
  {
    "photo-upload--disabled": props.disabled,
    "photo-upload--dragging": isDragging.value,
    "photo-upload--loading": isLoading.value,
    "photo-upload--error": error.value,
    "photo-upload--has-image": previewUrl.value,
  },
]);

const areaClasses = computed(() => [
  "upload-area--base",
  {
    "upload-area--dragging": isDragging.value,
    "upload-area--disabled": props.disabled,
  },
]);

const ariaLabel = computed(() => {
  if (previewUrl.value) {
    return `${props.altText} téléchargée. Cliquez pour changer`;
  }
  return `Télécharger ${props.label.toLowerCase()}`;
});

// === METHODS ===
const triggerFileInput = () => {
  if (props.disabled || isLoading.value) return;
  fileInput.value?.click();
};

const validateFile = (file) => {
  // Reset error
  error.value = null;

  // Check file size
  if (file.size > props.maxSize) {
    error.value = `La taille du fichier ne peut pas dépasser ${formatFileSize(props.maxSize)}`;
    return false;
  }

  // Check file type
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (!props.acceptedFormats.includes(fileExtension)) {
    error.value = `Format non supporté. Utilisez: ${props.acceptedFormats.join(", ")}`;
    return false;
  }

  return true;
};

const processFile = async (file) => {
  if (!validateFile(file)) {
    emit("error", error.value);
    return;
  }

  isLoading.value = true;

  try {
    // Create preview URL
    previewUrl.value = URL.createObjectURL(file);

    // Store file info
    fileInfo.value = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    };

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Emit events
    emit("update:modelValue", file);
    emit("upload", file);

    // Show success state briefly
    const uploadArea = document.querySelector('[data-bind="upload-area"]');
    uploadArea?.setAttribute("data-success", "true");
    setTimeout(() => uploadArea?.removeAttribute("data-success"), 2000);
  } catch (err) {
    error.value = "Erreur lors du téléchargement";
    emit("error", error.value);

    // Clean up on error
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = null;
    }
    fileInfo.value = null;
  } finally {
    isLoading.value = false;
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    processFile(file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;

  if (props.disabled || isLoading.value) return;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    processFile(files[0]);
  }
};

const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDragEnter = (event) => {
  event.preventDefault();
  if (!props.disabled && !isLoading.value) {
    isDragging.value = true;
  }
};

const handleDragLeave = (event) => {
  event.preventDefault();
  if (!event.currentTarget.contains(event.relatedTarget)) {
    isDragging.value = false;
  }
};

const handleKeydown = (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    triggerFileInput();
  }
};

const removePhoto = () => {
  if (props.disabled) return;

  // Clean up preview URL
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }

  // Reset state
  fileInfo.value = null;
  error.value = null;

  // Reset file input
  if (fileInput.value) {
    fileInput.value.value = "";
  }

  // Emit events
  emit("update:modelValue", null);
  emit("remove");
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

// === WATCHERS ===
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue === null && previewUrl.value) {
      removePhoto();
    } else if (typeof newValue === "string" && newValue !== previewUrl.value) {
      // Handle external URL
      previewUrl.value = newValue;
      fileInfo.value = null;
    }
  },
);

// === CLEANUP ===
const cleanup = () => {
  if (previewUrl.value && previewUrl.value.startsWith("blob:")) {
    URL.revokeObjectURL(previewUrl.value);
  }
};

// Cleanup on unmount
import { onUnmounted } from "vue";
onUnmounted(cleanup);
</script>

<style scoped>
/* === PHOTO UPLOAD BASE - FIGMA DESIGN === */
.photo-upload--base {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
}

/* === UPLOAD AREA - INTERACTIVE ZONE === */
.upload-area--base {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(21, 61, 28, 0.3);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all var(--transition-normal);
  overflow: hidden;
}

.upload-area--base:hover:not(.upload-area--disabled) {
  border-color: rgba(21, 61, 28, 0.5);
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.upload-area--base:focus-visible {
  outline: 2px solid var(--accent-green);
  outline-offset: 2px;
}

.upload-area--dragging {
  border-color: var(--accent-green);
  background: rgba(5, 156, 31, 0.1);
  transform: scale(1.02);
}

.upload-area--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* === SIZE VARIANTS === */
.photo-upload--small .upload-area--base {
  width: 80px;
  height: 80px;
}

.photo-upload--medium .upload-area--base {
  width: 120px;
  height: 120px;
}

.photo-upload--large .upload-area--base {
  width: 160px;
  height: 160px;
}

/* === SHAPE VARIANTS === */
.photo-upload--circle .upload-area--base {
  border-radius: 50%;
}

.photo-upload--square .upload-area--base {
  border-radius: 0;
}

.photo-upload--rounded .upload-area--base {
  border-radius: var(--radius-lg);
}

/* === PREVIEW CONTAINER === */
.preview-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.preview-container:hover .preview-overlay {
  opacity: 1;
}

.change-button,
.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  color: white;
}

.change-button {
  background: rgba(5, 156, 31, 0.8);
}

.change-button:hover {
  background: var(--accent-green);
  transform: scale(1.1);
}

.remove-button {
  background: rgba(235, 0, 45, 0.8);
}

.remove-button:hover {
  background: var(--error-color);
  transform: scale(1.1);
}

/* === UPLOAD PLACEHOLDER === */
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  text-align: center;
  width: 100%;
  height: 100%;
}

.upload-icon {
  width: 32px;
  height: 32px;
  color: rgba(21, 61, 28, 0.5);
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.upload-label {
  color: var(--primary-green);
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
}

.upload-hint {
  color: rgba(21, 61, 28, 0.64);
  font-family: var(--font-primary);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
}

/* === LOADING OVERLAY === */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(21, 61, 28, 0.2);
  border-radius: 50%;
  border-top-color: var(--accent-green);
  animation: spin 1s linear infinite;
}

/* === FILE INPUT (HIDDEN) === */
.file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

/* === ERROR MESSAGE === */
.error-message {
  color: var(--error-color);
  font-family: var(--font-primary);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  text-align: center;
  padding: var(--space-xs);
  background: rgba(235, 0, 45, 0.1);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(235, 0, 45, 0.3);
}

/* === FILE INFO === */
.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  background: rgba(21, 61, 28, 0.05);
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.file-name {
  color: var(--primary-green);
  font-weight: 500;
}

.file-size {
  color: rgba(21, 61, 28, 0.64);
  font-weight: 400;
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 360px) {
  .photo-upload--small .upload-area--base {
    width: 64px;
    height: 64px;
  }

  .photo-upload--medium .upload-area--base {
    width: 96px;
    height: 96px;
  }

  .photo-upload--large .upload-area--base {
    width: 128px;
    height: 128px;
  }

  .upload-icon {
    width: 24px;
    height: 24px;
  }

  .upload-label {
    font-size: 12px;
  }

  .upload-hint {
    font-size: 10px;
  }
}

@media (min-width: 768px) {
  .photo-upload--small .upload-area--base {
    width: 100px;
    height: 100px;
  }

  .photo-upload--medium .upload-area--base {
    width: 140px;
    height: 140px;
  }

  .photo-upload--large .upload-area--base {
    width: 180px;
    height: 180px;
  }

  .upload-icon {
    width: 40px;
    height: 40px;
  }

  .upload-label {
    font-size: 16px;
  }

  .upload-hint {
    font-size: 14px;
  }
}

/* === ANIMATIONS === */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* === ACCESSIBILITY === */
@media (prefers-reduced-motion: reduce) {
  .upload-area--base {
    transition: none;
  }

  .loading-spinner {
    animation: none;
  }

  .upload-area--dragging {
    transform: none;
  }
}

/* === HIGH CONTRAST MODE === */
@media (prefers-contrast: high) {
  .upload-area--base {
    border-width: 3px;
  }

  .preview-overlay {
    background: rgba(0, 0, 0, 0.8);
  }
}

/* === DYNAMIC STATES FOR DATA-BIND === */
.upload-area--base[data-success="true"] {
  border-color: var(--secondary-green);
  background: rgba(49, 146, 11, 0.1);
  animation: success-pulse 0.6s ease-out;
}

@keyframes success-pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* === ERROR STATES === */
.photo-upload--error .upload-area--base {
  border-color: var(--error-color);
  background: rgba(235, 0, 45, 0.05);
}

/* === TOUCH OPTIMIZATION === */
@media (max-width: 767px) {
  .change-button,
  .remove-button {
    width: 40px;
    height: 40px;
  }

  .upload-area--base {
    min-height: 44px;
    min-width: 44px;
  }
}

.custom-upload-area {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: #f5ff3b;
  border: 2px dashed #153d1c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.custom-upload-area:focus,
.custom-upload-area:focus-visible {
  outline: none;
  border-color: #153d1c;
}
.custom-upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
}
.custom-upload-plus {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.custom-upload-plus svg {
  display: block;
}
</style>
