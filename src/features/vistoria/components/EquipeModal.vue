<template>
  <div
    v-if="show"
    class="modal show fade d-block modal-overlay-custom"
    tabindex="-1"
    role="dialog"
    @keydown.esc="preventClose"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header">
          <h5 class="modal-title fw-bold">
            <i class="bi bi-people-fill me-2 text-primary"></i>Equipe de Vistoria
          </h5>
          <!-- Hide close button when mandatory -->
          <button v-if="!isMandatory" type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <div v-if="isMandatory" class="alert alert-warning py-2 mb-3 small d-flex align-items-center gap-2">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span>Por favor, cadastre a equipe de vistorias antes de prosseguir no sistema.</span>
          </div>
          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label fw-bold small text-muted">Vistoriador 01 <span class="text-danger">*</span></label>
              <input
                v-model="equipe.vistoriador01"
                type="text"
                class="form-control text-uppercase"
                placeholder="Nome do vistoriador principal"
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold small text-muted">Patente</label>
              <select v-model="equipe.patente" class="form-select">
                <option value="" disabled>Selecione...</option>
                <option v-for="p in patentes" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Matrícula</label>
              <input
                v-model="equipe.matricula"
                type="text"
                class="form-control"
                placeholder="Apenas números"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Viatura</label>
              <input
                :value="equipe.viatura"
                type="text"
                class="form-control text-uppercase"
                placeholder="Ex: ABC 1234"
                @input="handleViaturaInput"
              />
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold small text-muted">Regime de Trabalho</label>
              <select v-model="equipe.regime" class="form-select">
                <option value="" disabled>Selecione...</option>
                <option v-for="r in regimes" :key="r" :value="r">{{ r }}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label class="form-label fw-bold small text-muted">E-mail Google</label>
              <input
                v-model="equipe.email"
                type="email"
                class="form-control"
                placeholder="divis.fiscXX@gmail.com"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <!-- Hide cancel button when mandatory -->
          <button v-if="!isMandatory" type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          <button type="button" class="btn btn-primary w-100" @click="salvarEquipe">Salvar Alterações</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { showToast } from '@/shared/composables/useToast.js';
import { verificarAcesso } from '@/features/autenticacao/domain/validators/acessoValidator.js';

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  enforceMandatory: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:show']);

const isMandatory = ref(false);

const equipe = ref({
  vistoriador01: '',
  patente: '',
  matricula: '',
  viatura: '',
  regime: '',
  email: ''
});

const patentes = ['SD', 'CB', '3ºSGT', '2ºSGT', '1°SGT', 'ST', '2ºTEN', '1ºTEN', 'CAP', 'MAJ', 'TC', 'CEL'];
const regimes = ['GSV', 'Plantão 24h', 'ALA A (SEG, QUA, SEX)', 'ALA B (TER, QUI, SEX)', 'Expediente'];

const handleViaturaInput = (e) => {
  let clean = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (clean.length > 7) clean = clean.substring(0, 7);
  let firstDigitIdx = clean.search(/\d/);
  if (firstDigitIdx !== -1) {
    equipe.value.viatura = clean.slice(0, firstDigitIdx) + ' ' + clean.slice(firstDigitIdx);
  } else {
    equipe.value.viatura = clean;
  }
};

// Load data when modal is shown
watch(() => props.show, (newVal) => {
  if (newVal) {
    const saved = localStorage.getItem('equipeVistoria');
    if (saved) {
      try {
        equipe.value = { ...equipe.value, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
  }
});

const closeModal = () => {
  if (isMandatory.value) {
    showToast("O preenchimento da equipe é obrigatório.", "warning");
    return;
  }
  emit('update:show', false);
};

const preventClose = (e) => {
  if (isMandatory.value) {
    e.preventDefault();
  }
};

const salvarEquipe = () => {
  if (!equipe.value.vistoriador01) {
    showToast("Vistoriador 01 é obrigatório.", "warning");
    return;
  }
  if (!equipe.value.matricula) {
    showToast("Matrícula é obrigatória.", "warning");
    return;
  }
  if (!equipe.value.email) {
    showToast("E-mail é obrigatório.", "warning");
    return;
  }
  
  const autorizado = verificarAcesso(equipe.value.vistoriador01, equipe.value.matricula, equipe.value.email);
  if (!autorizado) {
    showToast("Acesso Negado: Vistoriador não cadastrado ou dados incorretos.", "danger");
    return;
  }

  localStorage.setItem('equipeVistoria', JSON.stringify(equipe.value));
  showToast("Equipe de vistoria autorizada e salva!", "success");
  isMandatory.value = false;
  emit('update:show', false);
};

onMounted(() => {
  if (props.enforceMandatory) {
    const saved = localStorage.getItem('equipeVistoria');
    if (saved) {
      try {
        const team = JSON.parse(saved);
        const autorizado = verificarAcesso(team.vistoriador01, team.matricula, team.email);
        if (!autorizado) {
          localStorage.removeItem('equipeVistoria');
          isMandatory.value = true;
          emit('update:show', true);
          showToast("Sua sessão expirou ou os dados cadastrados não são válidos. Faça login novamente.", "warning");
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem('equipeVistoria');
        isMandatory.value = true;
        emit('update:show', true);
      }
    } else {
      isMandatory.value = true;
      emit('update:show', true);
    }
  }
});
</script>
