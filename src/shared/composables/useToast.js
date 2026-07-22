import { ref } from 'vue';
import { CONFIG } from '../constants/config.js';

// Global reactive state for toasts
export const toasts = ref([]);

export function showToast(message, type = 'info') {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, CONFIG.TOAST_DURATION);
}

export function useToast() {
  return {
    toasts,
    showToast
  };
}
