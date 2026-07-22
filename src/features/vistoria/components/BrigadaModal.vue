<template>
  <div class="modal fade" id="brigadaModal" tabindex="-1" aria-labelledby="brigadaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header text-white modal-header-info">
          <h5 class="modal-title fw-bold" id="brigadaModalLabel">
            <i class="bi bi-shield-fill-exclamation me-2"></i>Dimensionamento da Brigada de Incêndio
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <!-- Parâmetros de Entrada -->
          <div class="mb-4 p-3 bg-light rounded border shadow-sm">
            <h6 class="fw-bold mb-2 text-muted text-uppercase small tracking-wider">
              <i class="bi bi-sliders me-1"></i>Parâmetros da Edificação
            </h6>
            <div class="row g-3">
              <div class="col-6 col-sm-6">
                <div class="d-flex align-items-center gap-2">
                  <i class="bi bi-people fs-4 text-primary"></i>
                  <div>
                    <div class="small text-muted">População Fixa</div>
                    <div class="fw-bold">{{ populacaoFixa || 'Não informada' }}</div>
                  </div>
                </div>
              </div>
              <div class="col-6 col-sm-6">
                <div class="d-flex align-items-center gap-2">
                  <i class="bi bi-shield-check fs-4 text-warning"></i>
                  <div>
                    <div class="small text-muted">Grau de Risco</div>
                    <div class="fw-bold">{{ translateRisco(grauRisco) || 'Não informado' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem de Alerta se os dados estiverem ausentes -->
          <div v-if="!grauRisco || !populacaoFixa || populacaoFixa <= 0" class="alert alert-warning border-warning-subtle d-flex align-items-center gap-2" role="alert">
            <i class="bi bi-exclamation-triangle-fill fs-5"></i>
            <div>
              Preencha a <strong>População Fixa</strong> e o <strong>Grau de Risco</strong> no formulário para visualizar o dimensionamento exato da brigada.
            </div>
          </div>

          <!-- Quadro de Resultados -->
          <div v-else>
            <h6 class="fw-bold mb-3 text-secondary d-flex align-items-center">
              <i class="bi bi-grid-fill me-2 text-primary"></i>Quantitativo Necessário (por turno)
            </h6>
            <div class="row g-3 mb-4">
              <!-- Supervisor -->
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-3 text-center p-3 card-supervisor">
                  <div class="fs-1 text-primary mb-1"><i class="bi bi-person-badge-fill"></i></div>
                  <div class="small fw-semibold text-muted text-uppercase mb-1">Supervisor</div>
                  <div class="fs-2 fw-bold text-body-emphasis">{{ brigada.supervisor }}</div>
                </div>
              </div>
              <!-- Chefe -->
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-3 text-center p-3 card-chefe">
                  <div class="fs-1 text-warning mb-1"><i class="bi bi-person-check-fill"></i></div>
                  <div class="small fw-semibold text-muted text-uppercase mb-1">Chefe</div>
                  <div class="fs-2 fw-bold text-body-emphasis">{{ brigada.chefe }}</div>
                </div>
              </div>
              <!-- Brigadista Particular -->
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-3 text-center p-3 card-particular">
                  <div class="fs-1 text-danger mb-1"><i class="bi bi-shield-shaded"></i></div>
                  <div class="small fw-semibold text-muted text-uppercase mb-1">Particular</div>
                  <div class="fs-2 fw-bold text-body-emphasis">{{ brigada.particular }}</div>
                </div>
              </div>
              <!-- Brigadista Voluntário -->
              <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-3 text-center p-3 card-voluntario">
                  <div class="fs-1 text-success mb-1"><i class="bi bi-people-fill"></i></div>
                  <div class="small fw-semibold text-muted text-uppercase mb-1">Voluntário</div>
                  <div class="fs-2 fw-bold text-body-emphasis">{{ brigada.voluntario }}</div>
                </div>
              </div>
            </div>

            <!-- Detalhes e Notas das Funções -->
            <div class="card border-0 shadow-xs rounded-3 bg-light p-3 small">
              <h6 class="fw-bold mb-2 text-dark"><i class="bi bi-info-circle me-1 text-primary"></i>Notas Informativas:</h6>
              <ul class="mb-0 text-muted ps-3 d-flex flex-column gap-1">
                <li><strong>Supervisor:</strong> Profissional responsável pela coordenação de todas as brigadas existentes na edificação. Exigido a partir de 3.500 pessoas.</li>
                <li><strong>Chefe da Brigada:</strong> Responsável pela coordenação dos brigadistas do turno em uma determinada edificação ou setor.</li>
                <li><strong>Brigadista Particular (Bombeiro Civil):</strong> Profissional capacitado e credenciado que atua na prevenção e emergência com dedicação exclusiva.</li>
                <li><strong>Brigadista Voluntário:</strong> Funcionário da própria empresa treinado para atuar nas ações de combate e evacuação de emergência.</li>
                <li v-if="populacaoFixa > 5000" class="text-primary fw-medium">
                  <i class="bi bi-info-circle-fill"></i> População superior a 5.000 pessoas: acréscimo proporcional calculado conforme NT 007/2011.
                </li>
              </ul>
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
import { computed } from "vue";
import { calcularBrigada } from "@/features/vistoria/domain/normas/nt02/regras.js";

const props = defineProps({
  populacaoFixa: {
    type: [Number, String],
    default: ""
  },
  grauRisco: {
    type: String,
    default: ""
  }
});

const brigada = computed(() => {
  const pop = parseInt(props.populacaoFixa, 10) || 0;
  return calcularBrigada(props.grauRisco, pop);
});

const translateRisco = (risco) => {
  if (!risco) return "";
  const mapping = {
    'A': 'Baixo (A)',
    'B-1': 'Médio (B-1)',
    'B-2': 'Médio (B-2)',
    'C-1': 'Alto (C-1)',
    'C-2': 'Alto (C-2)'
  };
  return mapping[risco] || risco;
};
</script>

<style scoped>
.tracking-wider {
  letter-spacing: 0.05em;
}
.shadow-xs {
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
</style>
