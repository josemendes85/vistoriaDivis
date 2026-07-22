import { showToast } from '../composables/useToast.js';

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
