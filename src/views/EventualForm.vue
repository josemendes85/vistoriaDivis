<template>
  <BaseLayout :title="isEdit ? 'Editar Eventual' : 'Novo Eventual'" backRoute="/eventuais" backText="Voltar ao Painel">
    <div class="pt-2 px-1">
      <form class="needs-validation" novalidate @submit.prevent="salvarRegistro">
        <div class="row">
          <div class="col-12">
            <!-- Identificação do Processo/Evento -->
        <div class="form-section mb-4">
          <h4 class="section-title">
            <i class="bi bi-file-text me-2"></i>Identificação do Processo / Evento
          </h4>
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label fw-bold text-muted small">Número do Processo <span class="text-danger">*</span></label>
              <input
                v-model="form.processo"
                type="text"
                class="form-control"
                placeholder="00000-00000000/0000-00"
                required
              />
            </div>
            <div class="col-md-8">
              <label class="form-label fw-bold text-muted small">Nome do Evento <span class="text-danger">*</span></label>
              <input
                v-model="form.evento"
                type="text"
                class="form-control text-uppercase"
                placeholder="Nome do Evento"
                required
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small">Região Administrativa <span class="text-danger">*</span></label>
              <select v-model="form.ra" class="form-select" required>
                <option value="">Selecione...</option>
                <option v-for="ra in regioesAdministrativas" :key="ra">{{ ra }}</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small">Endereço do Evento</label>
              <input
                v-model="form.endereco"
                type="text"
                class="form-control text-uppercase"
                placeholder="Endereço completo"
              />
            </div>
            <div class="col-md-8">
              <label class="form-label fw-bold text-muted small">Georreferenciamento</label>
              <input
                v-model="form.geo"
                type="text"
                class="form-control"
                placeholder="-00.0000, -00.0000"
              />
            </div>
            <div class="col-md-4 d-grid pt-2">
              <button type="button" class="btn btn-outline-success" @click="obterGps">
                <i class="bi bi-geo-alt-fill me-1"></i>Localização Atual
              </button>
            </div>
          </div>
        </div>

        <!-- Equipe de Vistoria -->
        <div class="form-section mb-4">
          <h4 class="section-title">
            <i class="bi bi-people me-2"></i>Equipe de Vistoria
          </h4>
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Vistoriador 01</label>
              <input v-model="form.vistoriador01" type="text" class="form-control text-uppercase" placeholder="Nome" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Vistoriador 02</label>
              <input v-model="form.vistoriador02" type="text" class="form-control text-uppercase" placeholder="Nome" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Viatura</label>
              <input v-model="form.viatura" type="text" class="form-control text-uppercase" placeholder="Ex: ABC 1234" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Regime de Trabalho</label>
              <select v-model="form.regime" class="form-select">
                <option value="">Selecione...</option>
                <option>GSV</option>
                <option>Plantão 24h</option>
                <option>ALA A (SEG, QUA, SEX)</option>
                <option>ALA B (TER, QUI, SEX)</option>
                <option>Expediente</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Período e Capacidade -->
        <div class="form-section mb-4">
          <h4 class="section-title">
            <i class="bi bi-calendar-event me-2"></i>Período e Capacidade
          </h4>
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Data Início <span class="text-danger">*</span></label>
              <input v-model="form.data_inicio" type="date" class="form-control" required />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Data Final <span class="text-danger">*</span></label>
              <input v-model="form.data_fim" type="date" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small">Observações quanto ao período</label>
              <input v-model="form.obs_periodo" type="text" class="form-control text-uppercase" />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold text-muted small">Público do Evento</label>
              <input v-model="form.publico" type="number" class="form-control" placeholder="0000" />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold text-muted small">Área total (m²)</label>
              <input v-model="form.area" type="number" class="form-control" placeholder="0000" />
            </div>
            <div class="col-md-4">
              <label class="form-label fw-bold text-muted small">Realizou a vistoria?</label>
              <select v-model="form.ev_vistoria_realizada" class="form-select">
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Responsáveis e Brigada -->
        <div class="form-section mb-4">
          <h4 class="section-title">
            <i class="bi bi-person-check me-2"></i>Responsáveis
          </h4>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-bold text-muted small">Nome do Responsável</label>
              <input v-model="form.responsavel" type="text" class="form-control text-uppercase" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">CPF do Responsável</label>
              <input :value="form.responsavel_cpf" type="text" class="form-control" placeholder="000.000.000-00" @input="handleCpfInput" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Telefone do Responsável</label>
              <input :value="form.responsavel_tel" type="tel" class="form-control" placeholder="(61) 90000-0000" @input="handlePhoneInput" />
            </div>
            <div class="col-md-3">
              <label class="form-label fw-bold text-muted small">Terá brigada?</label>
              <select v-model="form.tem_brigada" class="form-select">
                <option value="">Selecione...</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>
            <div class="col-md-9">
              <label class="form-label fw-bold text-muted small">Empresa de brigada</label>
              <input v-model="form.empresa_brigada" type="text" class="form-control text-uppercase" list="lista_empresas_brigada" placeholder="Digite ou selecione a empresa..." />
              <datalist id="lista_empresas_brigada">
                <option v-for="emp in empresasBrigada" :key="emp" :value="emp"></option>
              </datalist>
            </div>
          </div>
        </div>

        <!-- Form Actions Bar -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-4 p-3 bg-white shadow-sm rounded">
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">
              <i class="bi bi-save me-1"></i>Salvar
            </button>
            <button type="button" class="btn btn-secondary" @click="cancelar">
              Cancelar
            </button>
          </div>
          
          <div class="d-flex gap-2">
            <button v-if="isEdit" type="button" class="btn btn-danger" @click="excluirRegistro">
              <i class="bi bi-trash me-1"></i>Excluir
            </button>
          </div>
          </div>
        </div>
        </div>
      </form>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseLayout from '../components/BaseLayout.vue';
import { showToast } from '../utils/utils.js';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);
const formId = ref(route.params.id || `eventual-${Date.now()}`);

const form = ref({
  processo: '',
  evento: '',
  ra: '',
  endereco: '',
  geo: '',
  vistoriador01: '',
  vistoriador02: '',
  viatura: '',
  regime: '',
  data_inicio: '',
  data_fim: '',
  obs_periodo: '',
  publico: '',
  area: '',
  vistoria_realizada: 'Sim',
  responsavel: '',
  responsavel_cpf: '',
  responsavel_tel: '',
  tem_brigada: '',
  empresa_brigada: '',
  status: 'A Fazer'
});

const handleCpfInput = (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  form.value.responsavel_cpf = v;
};

const handlePhoneInput = (e) => {
  let v = e.target.value.replace(/\D/g, '');
  if (v.length > 11) v = v.substring(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
  if (v.length > 10) {
    v = v.replace(/(\d{5})(\d{4})$/, '$1-$2');
  } else {
    v = v.replace(/(\d{4})(\d{0,4})$/, '$1-$2');
  }
  form.value.responsavel_tel = v;
};

const obterGps = () => {
  if (!navigator.geolocation) {
    showToast("Seu navegador não suporta geolocalização.", "danger");
    return;
  }
  showToast("Obtendo localização...", "info");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      form.value.geo = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
      showToast("Localização obtida com sucesso!", "success");
    },
    (err) => {
      console.error(err);
      showToast("Falha ao obter localização.", "danger");
    },
    { timeout: 10000 }
  );
};

const salvarRegistro = () => {
  const key = `eventual-${formId.value}`;
  const payload = {
    id: formId.value,
    ...form.value
  };

  localStorage.setItem(key, JSON.stringify(payload));
  showToast("Registro eventual salvo com sucesso!", "success");
};

const cancelar = () => {
  router.push('/eventuais');
};

const excluirRegistro = () => {
  if (confirm(`Deseja realmente excluir este evento?`)) {
    localStorage.removeItem(`eventual-${formId.value}`);
    showToast("Evento excluído!", "success");
    router.push('/eventuais');
  }
};

const regioesAdministrativas = [
  'RA 1 - Plano Piloto', 'RA 2 - Gama', 'RA 3 - Taguatinga', 'RA 4 - Brazlândia',
  'RA 5 - Sobradinho', 'RA 6 - Planaltina', 'RA 7 - Paranoá', 'RA 8 - Núcleo Bandeirante',
  'RA 9 - Ceilândia', 'RA 10 - Guará', 'RA 11 - Cruzeiro', 'RA 12 - Samambaia',
  'RA 13 - Santa Maria', 'RA 14 - São Sebastião', 'RA 15 - Recanto das Emas',
  'RA 16 - Lago Sul', 'RA 17 - Riacho Fundo', 'RA 18 - Lago Norte', 'RA 19 - Candangolândia',
  'RA 20 - Águas Claras', 'RA 21 - Riacho Fundo II', 'RA 22 - Sudoeste/Octogonal',
  'RA 23 - Varjão', 'RA 24 - Park Way', 'RA 25 - SCIA', 'RA 26 - Sobradinho II',
  'RA 27 - Jardim Botânico', 'RA 28 - Itapoã', 'RA 29 - SIA', 'RA 30 - Vicente Pires',
  'RA 31 - Fercal', 'RA 32 - Sol Nascente/Pôr do Sol', 'RA 33 - Arniqueira',
  'RA 34 - Arapoanga', 'RA 35 - Água Quente'
];

const empresasBrigada = [
  '5 ESTRELAS SISTEMA DE SEGURANÇA LTDA - EMP-B/072-07',
  'ADFORT SERVIÇOS GERAIS LTDA - EMP-B/503-23',
  'ÁGIL EMPRESA DE VIGILÂNCIA LTDA - EMP-B/768-18',
  'AGIL SERVIÇOS ESPECIAIS LTDA - EMP-B/195-06',
  'AMPLOS PROTEÇÃO CONTRA INCÊNDIO LTDA - EMP-B/636-15',
  'ATIVA BRIGADISTA LTDA - EMP-B/403-09',
  'BRASFORT ADMINISTRAÇÃO E SERVIÇOS LTDA - EMP-B/430-06',
  'BRASFORT EMPRESA DE SEGURANÇA LTDA - EMP-B/648-16',
  'BRASTEC - SERVIÇOS E TREINAMENTOS LTDA - EMP-B/647-16'
];

onMounted(() => {
  const id = route.params.id;
  if (id) {
    const raw = localStorage.getItem(`eventual-${id}`);
    if (raw) {
      try {
        const data = JSON.parse(raw);
        form.value = { ...form.value, ...data };
        
        // Translate legacy prefix ev_ to non-prefixed properties
        const translationMap = {
          ev_evento: 'evento',
          ev_ra: 'ra',
          ev_endereco: 'endereco',
          ev_geo: 'geo',
          ev_data_inicio: 'data_inicio',
          ev_data_fim: 'data_fim',
          ev_obs_periodo: 'obs_periodo',
          ev_publico: 'publico',
          ev_area: 'area',
          ev_vistoria_realizada: 'vistoria_realizada',
          ev_responsavel: 'responsavel',
          ev_cpf: 'responsavel_cpf',
          ev_telefone: 'responsavel_tel',
          ev_tem_brigada: 'tem_brigada',
          ev_empresa_brigada: 'empresa_brigada'
        };
        for (const [legacyKey, newKey] of Object.entries(translationMap)) {
          if (data[legacyKey] !== undefined) {
            form.value[newKey] = data[legacyKey];
          }
        }
        if (data.processoBusca && !form.value.processo) {
          form.value.processo = data.processoBusca;
        }

        showToast("Registro eventual carregado!", "success");
      } catch (e) {
        console.error(e);
      }
    }
  } else {
    // Fill default team if saved
    const savedTeam = localStorage.getItem('equipeVistoria');
    if (savedTeam) {
      try {
        const team = JSON.parse(savedTeam);
        form.value.vistoriador01 = team.vistoriador01 || '';
        form.value.viatura = team.viatura || '';
        form.value.regime = team.regime || '';
      } catch (e) {
        console.error(e);
      }
    }
  }
});
</script>

<style scoped>
</style>
