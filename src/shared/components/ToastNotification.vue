<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3 toast-container-custom">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast show align-items-center text-white border-0 mb-2 shadow-lg"
      :class="getBgClass(toast.type)"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <i :class="['bi', getIconClass(toast.type), 'me-2', 'fs-5']"></i>
          <div>{{ toast.message }}</div>
        </div>
        <button
          type="button"
          class="btn-close btn-close-white m-auto me-2"
          aria-label="Close"
          @click="removeToast(toast.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toasts } from '@/shared/composables/useToast.js';

const removeToast = (id) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
};

const getBgClass = (type) => {
  const classes = {
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning text-dark',
    info: 'bg-primary',
  };
  return classes[type] || 'bg-primary';
};

const getIconClass = (type) => {
  const icons = {
    success: 'bi-check-circle',
    danger: 'bi-exclamation-triangle',
    warning: 'bi-exclamation-triangle',
    info: 'bi-info-circle',
  };
  return icons[type] || 'bi-info-circle';
};
</script>
