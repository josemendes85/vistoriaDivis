<template>
  <div class="modal fade" id="cnaesModal" tabindex="-1" aria-labelledby="cnaesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header text-white modal-header-info">
          <h5 class="modal-title fw-bold" id="cnaesModalLabel">
            <i class="bi bi-info-circle-fill me-2"></i>Atividades da Edificação (CNAE)
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Grau de Risco e Ocupação Determinados -->
          <div v-if="motivoRisco" class="mb-4 p-3 rounded border shadow-sm cnae-motivo-box">
            <h6 class="fw-bold mb-2 d-flex align-items-center text-theme-info">
              <i class="bi bi-shield-check-fill me-2 fs-5"></i>Grau de Risco Determinado
            </h6>
            <div class="small">
              O grau de risco <strong>{{ motivoRisco.risco }}</strong> foi determinado com base no termo 
              <span class="badge text-white px-2 py-1 text-uppercase badge-info-custom">{{ motivoRisco.termo }}</span> 
              do grupo <strong>{{ motivoRisco.grupo }}</strong> (Tabela 2 da NT 02/2016-CBMDF), correspondente à atividade:
              <div class="mt-2 p-2 bg-white rounded border small text-muted text-uppercase fw-semibold shadow-xs">
                {{ motivoRisco.cnae }}
              </div>
              <!-- Area adjustment notice -->
              <div v-if="motivoRisco.ajustadoArea" class="mt-2 text-primary fw-medium small d-flex align-items-center gap-1">
                <i class="bi bi-info-circle-fill"></i>
                Risco recalculado de {{ motivoRisco.originalRisco }} para {{ motivoRisco.risco }} pela área de {{ motivoRisco.areaVal }} m².
              </div>
            </div>
          </div>
          <div v-else-if="cnaePrincipal" class="mb-4 p-3 rounded border border-warning shadow-sm cnae-warning-box">
            <h6 class="fw-bold mb-2 d-flex align-items-center text-warning">
              <i class="bi bi-exclamation-triangle-fill"></i> Grau de Risco Não Mapeado
            </h6>
            <div class="small text-muted">
              As atividades (CNAEs) consultadas não possuem correspondência direta na Tabela 2 da NT 02/2016-CBMDF. 
              Selecione o Grau de Risco e Ocupação manualmente na ficha da edificação.
            </div>
          </div>

          <!-- Atividade Principal -->
          <div class="mb-4">
            <h6 class="fw-bold mb-2 d-flex align-items-center text-theme-info">
              <i class="bi bi-briefcase-fill me-2 fs-5"></i>Atividade Principal
            </h6>
            <div v-if="cnaePrincipal" class="p-3 bg-light rounded small border text-uppercase fw-semibold shadow-sm d-flex justify-content-between align-items-center gap-3">
              <div>
                <span>{{ cnaePrincipal }}</span>
                <span v-if="getOcupacaoInfo(cnaePrincipal)" class="d-block text-muted fw-normal mt-1 font-small-normal">
                  <i class="bi bi-tag-fill me-1 text-secondary"></i>Ocupação: {{ getOcupacaoInfo(cnaePrincipal) }}
                </span>
              </div>
              <span :class="['badge rounded-pill px-3 py-2 text-uppercase flex-shrink-0', getRiscoBadgeInfo(cnaePrincipal).class, 'badge-cnae-risco']">
                {{ getRiscoBadgeInfo(cnaePrincipal).text }}
              </span>
            </div>
            <div v-else class="p-3 bg-light rounded text-muted small border text-uppercase italic text-center">
              <i class="bi bi-exclamation-circle me-1"></i>Nenhuma atividade principal registrada
            </div>
          </div>
          
          <!-- Atividades Secundárias -->
          <div>
            <h6 class="fw-bold text-secondary mb-2 d-flex align-items-center">
              <i class="bi bi-list-task me-2 fs-5"></i>Atividades Secundárias
            </h6>
            <div v-if="cnaeSecundarios && cnaeSecundarios.length > 0" class="d-flex flex-column gap-2">
              <div 
                v-for="sec in cnaeSecundarios" 
                :key="sec" 
                class="p-2 bg-light rounded small border text-uppercase shadow-sm d-flex justify-content-between align-items-center gap-3"
              >
                <div>
                  <span>{{ sec }}</span>
                  <span v-if="getOcupacaoInfo(sec)" class="d-block text-muted fw-normal mt-1 font-small-normal">
                    <i class="bi bi-tag-fill me-1 text-secondary"></i>Ocupação: {{ getOcupacaoInfo(sec) }}
                  </span>
                </div>
                <span :class="['badge rounded-pill px-3 py-2 text-uppercase flex-shrink-0', getRiscoBadgeInfo(sec).class, 'badge-cnae-risco']">
                  {{ getRiscoBadgeInfo(sec).text }}
                </span>
              </div>
            </div>
            <div v-else class="p-3 bg-light rounded text-muted small border text-uppercase italic text-center">
              <i class="bi bi-exclamation-circle me-1"></i>Nenhuma atividade secundária registrada
            </div>
          </div>
        </div>
        <div class="modal-footer bg-light border-top-0">
          <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { obterRiscoPorCnae, obterOcupacaoPorCnae } from "../utils/utils.js";

defineProps({
  motivoRisco: {
    type: Object,
    default: null
  },
  cnaePrincipal: {
    type: String,
    default: ""
  },
  cnaeSecundarios: {
    type: Array,
    default: () => []
  }
});

const getRiscoBadgeInfo = (cnaeStr) => {
  const risco = obterRiscoPorCnae(cnaeStr);
  switch (risco) {
    case 'A':
      return { class: 'bg-success-subtle text-success border border-success-subtle', text: 'Baixo (A)' };
    case 'B-1':
      return { class: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle', text: 'Médio (B-1)' };
    case 'B-2':
      return { class: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle', text: 'Médio (B-2)' };
    case 'C-1':
      return { class: 'bg-danger-subtle text-danger border border-danger-subtle', text: 'Alto (C-1)' };
    case 'C-2':
      return { class: 'bg-danger-subtle text-danger border border-danger-subtle', text: 'Alto (C-2)' };
    default:
      return { class: 'bg-light text-muted border', text: 'Não Mapeado' };
  }
};

const MAPA_OCUPACOES = {
  "01": "Residenciais unifamiliares",
  "02": "Residenciais multifamiliares",
  "03": "Habitações coletivas",
  "04": "Hotéis",
  "05": "Hotéis residenciais",
  "06": "Comércio de pequeno porte",
  "07": "Comércio de médio porte",
  "08": "Comércio de grande porte",
  "09": "Escritórios",
  "10": "Agências bancárias",
  "11": "Laboratórios e estúdios",
  "12": "Serviços de reparação",
  "13": "Escolas em geral",
  "14": "Escolas especiais",
  "15": "Locais para cultura física",
  "16": "Pré-escolas",
  "17": "Escolas para portadores de deficiências",
  "18": "Museus e bibliotecas",
  "19": "Templos religiosos",
  "20": "Centros esportivos e de exibição",
  "21": "Terminais de passageiros",
  "22": "Artes cênicas e auditórios",
  "23": "Clubes sociais",
  "24": "Construções provisórias",
  "25": "Restaurantes",
  "26": "Garagens em geral",
  "27": "Oficinas",
  "28": "Hangares",
  "29": "Hospitais veterinários",
  "30": "Hospitais em geral",
  "31": "Locais para pessoas com limitações físicas ou mentais",
  "32": "Clínicas",
  "33": "Indústrias ≤ 300 MJ/m²",
  "34": "Indústrias > 300 MJ/m² e < 1200 MJ/m²",
  "35": "Indústrias ≥ 1200 MJ/m²",
  "36": "Depósitos de material incombustível",
  "37": "Depósitos ≤ 300 MJ/m²",
  "38": "Depósitos > 300 MJ/m² e < 1200 MJ/m²",
  "39": "Depósitos ≥ 1200 MJ/m²",
  "40": "Líquidos ou gases inflamáveis e combustíveis",
  "41": "Explosivos",
  "42": "Produtos perigosos",
  "43": "Vegetações",
  "44": "Canteiros de obras",
  "45": "Centros esportivos (> 2500 pessoas)",
  "46": "Parques de diversões",
  "47": "Centrais de comunicação e energia",
  "48": "Túneis",
  "49": "Silos",
  "50": "Locais com restrição de liberdade",
  "51": "Destinações variáveis"
};

const getOcupacaoInfo = (cnaeStr) => {
  const code = obterOcupacaoPorCnae(cnaeStr);
  if (!code) return "";
  return `${code} - ${MAPA_OCUPACOES[code] || "Não Identificada"}`;
};
</script>
