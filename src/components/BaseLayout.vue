<template>
  <div>
    <nav class="navbar navbar-dark fixed-top shadow-sm transition-navbar" :class="navbarClass" :style="!navbarClass ? 'background-color: #000000 !important; color: #ffffff !important;' : ''">
      <div class="container-fluid d-flex align-items-center justify-content-between">
        
        <!-- Left Side: Back button OR Module Navigation -->
        <div class="d-flex align-items-center">
          <router-link
            v-if="backRoute"
            :to="backRoute"
            class="btn btn-sm d-flex align-items-center fw-medium shadow-sm transition-btn"
            :class="isLightNavbar ? 'btn-dark' : 'btn-outline-light'"
          >
            <i class="bi bi-arrow-left me-1"></i> <span>{{ backText || 'Voltar' }}</span>
          </router-link>

          <!-- Navigation options when on home (Processes) page (Dropdown for all screen sizes) -->
          <div v-else class="dropdown">
            <button class="btn btn-sm dropdown-toggle fw-medium shadow-sm transition-btn" :class="isLightNavbar ? 'btn-dark' : 'btn-outline-light'" type="button" id="navDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-list me-1"></i>Menu
            </button>
            <ul class="dropdown-menu shadow-lg border-0" aria-labelledby="navDropdown">
              <li>
                <router-link to="/eventuais" class="dropdown-item py-2">
                  <i class="bi bi-ticket-perforated me-2 text-success"></i>Eventuais
                </router-link>
              </li>
              <li>
                <router-link to="/checklist" class="dropdown-item py-2">
                  <i class="bi bi-person-lines-fill me-2 text-info"></i>Checklist
                </router-link>
              </li>
              <li>
                <router-link to="/backup" class="dropdown-item py-2">
                  <i class="bi bi-cloud-arrow-up me-2 text-warning"></i>Backup
                </router-link>
              </li>
              <li>
                <router-link to="/links" class="dropdown-item py-2">
                  <i class="bi bi-link-45deg me-2 text-danger"></i>Links
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link to="/sobre" class="dropdown-item py-2">
                  <i class="bi bi-info-circle me-2 text-secondary"></i>Sobre
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Center: Title -->
        <span class="navbar-brand fw-bold text-uppercase text-center d-none d-sm-block flex-grow-1 mx-2" style="color: inherit;">
          {{ title || 'Vistorias DIVIS' }}
        </span>

        <!-- Right Side: Equipe button (only on home screen) -->
        <div>
          <button v-if="!backRoute" class="btn btn-sm fw-medium shadow-sm transition-btn" :class="isLightNavbar ? 'btn-outline-dark' : 'btn-outline-light'" @click="toggleEquipeModal(true)">
            <i class="bi bi-people-fill me-1"></i>Equipe
          </button>
          <div v-else style="width: 80px;"></div>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="container-fluid" style="margin-top: 80px; padding-bottom: 50px;">
      <slot />
    </main>

    <!-- Equipe de Vistoria Modal (Global Config) -->
    <div
      v-if="showEquipeModal"
      class="modal show fade d-block"
      style="background-color: rgba(0, 0, 0, 0.5); z-index: 1060;"
      tabindex="-1"
      role="dialog"
      @keydown.esc="preventClose"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-0 shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title fw-bold text-dark">
              <i class="bi bi-people-fill me-2 text-primary"></i>Equipe de Vistoria
            </h5>
            <!-- Hide close button when mandatory -->
            <button v-if="!isMandatory" type="button" class="btn-close" @click="toggleEquipeModal(false)"></button>
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
                  v-model="equipe.viatura"
                  type="text"
                  class="form-control text-uppercase"
                  placeholder="Ex: ABC 1234"
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
            <button v-if="!isMandatory" type="button" class="btn btn-secondary" @click="toggleEquipeModal(false)">Cancelar</button>
            <button type="button" class="btn btn-primary w-100" @click="salvarEquipe">Salvar Alterações</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { showToast } from '../utils/utils.js';
import { verificarAcesso } from '../utils/usuariosPermitidos.js';

const props = defineProps({
  title: {
    type: String,
    default: 'Vistorias DIVIS'
  },
  backRoute: {
    type: String,
    default: ''
  },
  backText: {
    type: String,
    default: 'Voltar'
  },
  navbarClass: {
    type: String,
    default: ''
  }
});

const showEquipeModal = ref(false);
const isMandatory = ref(false);

const isLightNavbar = computed(() => props.navbarClass === 'status-pendente');

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

const toggleEquipeModal = (val) => {
  if (isMandatory.value && !val) {
    showToast("O preenchimento da equipe é obrigatório.", "warning");
    return;
  }
  showEquipeModal.value = val;
  if (val) {
    const saved = localStorage.getItem('equipeVistoria');
    if (saved) {
      try {
        equipe.value = { ...equipe.value, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
  }
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
  showEquipeModal.value = false;
};

onMounted(() => {
  // Only enforce mandatory verification on the Home (Processes) page
  if (!props.backRoute) {
    const saved = localStorage.getItem('equipeVistoria');
    if (saved) {
      try {
        const team = JSON.parse(saved);
        const autorizado = verificarAcesso(team.vistoriador01, team.matricula, team.email);
        if (!autorizado) {
          localStorage.removeItem('equipeVistoria');
          isMandatory.value = true;
          showEquipeModal.value = true;
          showToast("Sua sessão expirou ou os dados cadastrados não são válidos. Faça login novamente.", "warning");
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem('equipeVistoria');
        isMandatory.value = true;
        showEquipeModal.value = true;
      }
    } else {
      isMandatory.value = true;
      showEquipeModal.value = true;
    }
  }
});
</script>

<style scoped>
.navbar-brand {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.transition-navbar {
  transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease;
}
.transition-btn {
  transition: all 0.25s ease;
}
</style>
