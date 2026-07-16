<template>
  <div class="modal fade" id="cnaesModal" tabindex="-1" aria-labelledby="cnaesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header text-white" style="background-color: var(--info-color);">
          <h5 class="modal-title fw-bold" id="cnaesModalLabel">
            <i class="bi bi-info-circle-fill me-2"></i>Atividades da Edificação (CNAE)
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Grau de Risco e Ocupação Determinados -->
          <div v-if="motivoRisco" class="mb-4 p-3 rounded border shadow-sm" style="background-color: rgba(76, 162, 173, 0.05); border-color: rgba(76, 162, 173, 0.2) !important;">
            <h6 class="fw-bold mb-2 d-flex align-items-center" style="color: var(--info-color);">
              <i class="bi bi-shield-check-fill me-2 fs-5"></i>Grau de Risco Determinado
            </h6>
            <div class="small text-dark">
              O grau de risco <strong>{{ motivoRisco.risco }}</strong> foi determinado com base no termo 
              <span class="badge text-white px-2 py-1 text-uppercase" style="background-color: var(--info-color); font-weight: normal; font-size: 0.75rem;">{{ motivoRisco.termo }}</span> 
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
          <div v-else-if="cnaePrincipal" class="mb-4 p-3 rounded border border-warning shadow-sm" style="background-color: rgba(255, 193, 7, 0.05); border-color: rgba(255, 193, 7, 0.2) !important;">
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
            <h6 class="fw-bold mb-2 d-flex align-items-center" style="color: var(--info-color);">
              <i class="bi bi-briefcase-fill me-2 fs-5"></i>Atividade Principal
            </h6>
            <div v-if="cnaePrincipal" class="p-3 bg-light rounded text-dark small border text-uppercase fw-semibold shadow-sm">
              {{ cnaePrincipal }}
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
                class="p-2 bg-light rounded text-dark small border text-uppercase shadow-sm"
              >
                {{ sec }}
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
</script>
