import { ref } from 'vue';

export const CONFIG = {
  TOAST_DURATION: 3000,
  GEOLOCATION_TIMEOUT: 10000,
};

// Global reactive state for toasts
export const toasts = ref([]);

export function showToast(message, type = 'info') {
  const id = Date.now() + Math.random().toString(36).substring(2, 9);
  toasts.value.push({ id, message, type });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, CONFIG.TOAST_DURATION);
}

export function parseNumber(val) {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const clean = val.replace(/\./g, '').replace(',', '.');
  return parseFloat(clean) || 0;
}

export function copiaFallback(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("Copiado para a área de transferência!", "success");
  } catch (err) {
    showToast("Erro ao copiar. Copie manualmente.", "danger");
  }
  document.body.removeChild(textArea);
}

export function copiarTexto(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Copiado para a área de transferência!", "success"))
      .catch(() => copiaFallback(text));
  } else {
    copiaFallback(text);
  }
}
