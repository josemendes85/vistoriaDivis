import { ref } from 'vue';
import { NT02_TABELA2 } from './nt02_tabela2.js';

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

export function extrairCodigoCnae(cnaeStr) {
  if (!cnaeStr) return "";
  const match = cnaeStr.match(/^(\d{4}-?\d\/?\d{2})/);
  if (match) {
    let raw = match[1].replace(/\D/g, "");
    if (raw.length === 7) {
      return `${raw.substring(0, 4)}-${raw.substring(4, 5)}/${raw.substring(5, 7)}`;
    }
  }
  const digits = cnaeStr.replace(/\D/g, "");
  if (digits.length >= 7) {
    const raw = digits.substring(0, 7);
    return `${raw.substring(0, 4)}-${raw.substring(4, 5)}/${raw.substring(5, 7)}`;
  }
  return "";
}

export function obterRiscoPorCnae(cnaeStr, ocupacao) {
  const code = extrairCodigoCnae(cnaeStr);
  if (!code) return "";
  
  let matchingRisco = "";
  let highestRiscoVal = 0;
  const riscoValues = { "A": 1, "B-1": 2, "B-2": 3, "C-1": 4, "C-2": 5 };

  for (const grupo of NT02_TABELA2) {
    for (const nivel of grupo.niveis) {
      for (const exemplo of nivel.exemplos) {
        if (exemplo.cnaes && exemplo.cnaes.includes(code)) {
          if (ocupacao && exemplo.ocupacao !== ocupacao) {
            continue;
          }
          const currentVal = riscoValues[nivel.risco] || 0;
          if (currentVal > highestRiscoVal) {
            highestRiscoVal = currentVal;
            matchingRisco = nivel.risco;
          }
        }
      }
    }
  }
  return matchingRisco;
}

export function calcularBrigada(risco, popFixa) {
  if (!risco || !popFixa || popFixa <= 0) {
    return { supervisor: 0, chefe: 0, particular: 0, voluntario: 0 };
  }

  // Define data matrix
  const tabela = {
    'A': [
      { max: 10, s: 0, c: 0, p: 0, v: 0 },
      { max: 50, s: 0, c: 0, p: 0, v: 0 },
      { max: 100, s: 0, c: 0, p: 0, v: 0 },
      { max: 250, s: 0, c: 0, p: 0, v: 0.10 },
      { max: 500, s: 0, c: 0, p: 2, v: 0.10 },
      { max: 1000, s: 0, c: 0, p: 4, v: 0.10 },
      { max: 2000, s: 0, c: 1, p: 4, v: 0.10 },
      { max: 3500, s: 0, c: 1, p: 4, v: 0.10 },
      { max: 5000, s: 1, c: 1, p: 6, v: 0.10 },
      { excedente: { s: 1, c: 1, p: 2, v: 0.10 } }
    ],
    'B-1': [
      { max: 10, s: 0, c: 0, p: 0, v: 0 },
      { max: 50, s: 0, c: 0, p: 0, v: 0 },
      { max: 100, s: 0, c: 0, p: 0, v: 0.10 },
      { max: 250, s: 0, c: 0, p: 2, v: 0.10 },
      { max: 500, s: 0, c: 0, p: 4, v: 0.10 },
      { max: 1000, s: 0, c: 1, p: 4, v: 0.10 },
      { max: 2000, s: 0, c: 1, p: 4, v: 0.10 },
      { max: 3500, s: 1, c: 1, p: 4, v: 0.10 },
      { max: 5000, s: 1, c: 1, p: 6, v: 0.10 },
      { excedente: { s: 1, c: 1, p: 2, v: 0.10 } }
    ],
    'B-2': [
      { max: 10, s: 0, c: 0, p: 0, v: 0 },
      { max: 50, s: 0, c: 0, p: 0, v: 0.20 },
      { max: 100, s: 0, c: 0, p: 2, v: 0.20 },
      { max: 250, s: 0, c: 0, p: 4, v: 0.20 },
      { max: 500, s: 0, c: 1, p: 4, v: 0.15 },
      { max: 1000, s: 0, c: 1, p: 4, v: 0.10 },
      { max: 2000, s: 1, c: 1, p: 4, v: 0.10 },
      { max: 3500, s: 1, c: 1, p: 4, v: 0.10 },
      { max: 5000, s: 1, c: 2, p: 6, v: 0.10 },
      { excedente: { s: 1, c: 2, p: 4, v: 0.10 } }
    ],
    'C-1': [
      { max: 10, s: 0, c: 0, p: 0, v: 0.30 },
      { max: 50, s: 0, c: 0, p: 0, v: 0.30 },
      { max: 100, s: 0, c: 0, p: 0, v: 0.30 },
      { max: 250, s: 0, c: 0, p: 2, v: 0.20 },
      { max: 500, s: 0, c: 0, p: 4, v: 0.15 },
      { max: 1000, s: 0, c: 1, p: 4, v: 0.15 },
      { max: 2000, s: 1, c: 1, p: 4, v: 0.15 },
      { max: 3500, s: 1, c: 1, p: 4, v: 0.15 },
      { max: 5000, s: 1, c: 1, p: 6, v: 0.15 },
      { excedente: { s: 1, c: 2, p: 4, v: 0.15 } }
    ],
    'C-2': [
      { max: 10, s: 0, c: 0, p: 0, v: 0.50 },
      { max: 50, s: 0, c: 0, p: 0, v: 0.50 },
      { max: 100, s: 0, c: 0, p: 2, v: 0.30 },
      { max: 250, s: 0, c: 0, p: 4, v: 0.20 },
      { max: 500, s: 0, c: 1, p: 4, v: 0.15 },
      { max: 1000, s: 1, c: 1, p: 4, v: 0.20 },
      { max: 2000, s: 1, c: 1, p: 6, v: 0.20 },
      { max: 3500, s: 1, c: 2, p: 8, v: 0.20 },
      { max: 5000, s: 2, c: 4, p: 10, v: 0.20 },
      { excedente: { s: 1, c: 2, p: 4, v: 0.20 } }
    ]
  };

  const regras = tabela[risco];
  if (!regras) return { supervisor: 0, chefe: 0, particular: 0, voluntario: 0 };

  if (popFixa <= 5000) {
    const faixa = regras.slice(0, 9).find(f => popFixa <= f.max);
    if (faixa) {
      return {
        supervisor: faixa.s,
        chefe: faixa.c,
        particular: faixa.p,
        voluntario: Math.ceil(popFixa * faixa.v)
      };
    }
  }

  // População acima de 5000
  const base = regras[8]; // 5000
  const exc = regras[9].excedente;
  const adicionais = Math.ceil((popFixa - 7000) / 4000);
  const qtyAdic = adicionais > 0 ? adicionais : 0;

  return {
    supervisor: base.s + qtyAdic * exc.s,
    chefe: base.c + qtyAdic * exc.c,
    particular: base.p + qtyAdic * exc.p,
    voluntario: Math.ceil(popFixa * base.v)
  };
}

export function obterOcupacaoPorCnae(cnaeStr) {
  const code = extrairCodigoCnae(cnaeStr);
  if (!code) return "";
  
  if (code.startsWith("84")) {
    return "09";
  }
  if (code.startsWith("851")) {
    return "16";
  }
  if (code.startsWith("85")) {
    return "13";
  }
  if (code.startsWith("87")) {
    return "17";
  }
  if (code.startsWith("01") || code.startsWith("02") || code.startsWith("03")) {
    return "43";
  }
  
  let matchingOcupacao = "";
  let highestRiscoVal = 0;
  const riscoValues = { "A": 1, "B-1": 2, "B-2": 3, "C-1": 4, "C-2": 5 };

  for (const grupo of NT02_TABELA2) {
    for (const nivel of grupo.niveis) {
      for (const exemplo of nivel.exemplos) {
        if (exemplo.cnaes && exemplo.cnaes.includes(code)) {
          const currentVal = riscoValues[nivel.risco] || 0;
          if (currentVal >= highestRiscoVal) {
            highestRiscoVal = currentVal;
            matchingOcupacao = exemplo.ocupacao;
          }
        }
      }
    }
  }
  return matchingOcupacao;
}
