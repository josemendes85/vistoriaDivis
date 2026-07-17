<template>
  <BaseLayout title="Portal de Links Rápidos" backRoute="/">
    <div class="pt-2 px-1">
      
      <!-- Seção de Links -->
      <div class="form-section shadow-sm p-4 mb-4">
        <h4 class="section-title mb-4">
          <i class="bi bi-link-45deg me-2 text-primary"></i>Sistemas e Acessos Rápidos
        </h4>
        <div class="row g-3">
          <div v-for="link in links" :key="link.title" class="col-md-6 col-lg-4">
            <a :href="link.url" target="_blank" class="text-decoration-none">
              <div class="card link-card shadow-sm p-3 h-100 border border-light-subtle">
                <div :class="['icon-box mb-2 text-white', link.statusClass]">
                  <i :class="link.icon"></i>
                </div>
                <h6 class="fw-bold mb-1">{{ link.title }}</h6>
                <p class="text-muted small mb-0 description-text-small">{{ link.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Seção de Assunção de Serviço -->
      <div class="form-section shadow-sm p-4 mb-5">
        <h4 class="section-title mb-3">
          <i class="bi bi-shield-check me-2 text-success"></i>Assunção de Serviço
        </h4>

        <form @submit.prevent="enviarAssuncao">
          <div class="row g-3">
            <div class="col-12">
              <label class="form-label fw-bold small text-muted">Graduação e Nome Completo</label>
              <input
                v-model="assuncao.nome"
                type="text"
                class="form-control"
                placeholder="Ex: Sgt Fulano"
                required
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Matrícula</label>
              <input
                v-model="assuncao.matricula"
                type="text"
                class="form-control"
                placeholder="000.000-0"
                required
              />
            </div>
            <div class="col-md-6">
              <label class="form-label fw-bold small text-muted">Telefone</label>
              <input
                :value="assuncao.telefone"
                type="text"
                class="form-control"
                placeholder="(61) 90000-0000"
                maxlength="15"
                required
                @input="formatarTelefone"
              />
            </div>
            <div class="col-12 mt-4">
              <button type="submit" class="btn w-100 p-3 btn-success fw-bold border-0 shadow-sm d-flex align-items-center justify-content-center">
                <i class="bi bi-whatsapp me-2 fs-5"></i> SELECIONAR CONTATOS E ENVIAR
              </button>
            </div>
          </div>
        </form>

        <div class="mt-3 text-center text-muted small">
          <p class="mb-0">A mensagem será enviada para os números: <br /> 6191346402, 6196210941, 6192019990</p>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import BaseLayout from '../components/BaseLayout.vue';

const links = [
  {
    title: 'SEI - GDF',
    description: 'Acesso ao Sistema Eletrônico de Informações.',
    url: 'https://sip.df.gov.br/sip/login.php?sigla_orgao_sistema=GDF&sigla_sistema=SEI&infra_url=L3NlaS8=',
    icon: 'bi bi-file-earmark-text-fill',
    statusClass: 'status-analise'
  },
  {
    title: 'JUCIS-DF',
    description: 'Portal de Serviços da Junta Comercial.',
    url: 'https://portalservicos.jucis.df.gov.br/auth/realms/srmRealm/protocol/openid-connect/auth?response_type=code&client_id=portal_interno&redirect_uri=http%3A%2F%2Fportalservicos.jucis.df.gov.br%2FPortalInterno%2Fpages%2Finicial.jsf&state=16140e86-fc17-4742-91fc-068822dda4f0&login=true&scope=openid',
    icon: 'bi bi-building-fill',
    statusClass: 'status-vistoria'
  },
  {
    title: 'INOVA CBMDF',
    description: 'Sistema Interno do Corpo de Bombeiros.',
    url: 'https://inova.cbm.df.gov.br/inova/interno/login',
    icon: 'bi bi-fire',
    statusClass: 'status-reprovado'
  },
  {
    title: 'GESINT',
    description: 'Gestão Estratégica e Inteligência.',
    url: 'https://gesint.cbm.df.gov.br/',
    icon: 'bi bi-graph-up-arrow',
    statusClass: 'status-aprovado'
  },
  {
    title: 'Planilha de Controle',
    description: 'Google Sheets de monitoramento.',
    url: 'https://docs.google.com/spreadsheets/d/1UwW4APokPP8Vt8Swirn8c9iQHCfkl6_wR8GMvAei4Vo/edit?gid=1033392854#gid=1033392854',
    icon: 'bi bi-table',
    statusClass: 'status-concluido'
  },
  {
    title: 'SCIP',
    description: 'Sistema de Controle de Informações do Processo.',
    url: 'https://sistemas.cbm.df.gov.br/scipweb/login/',
    icon: 'bi bi-database-fill-gear',
    statusClass: 'status-concluido'
  },
  {
    title: 'Projetos Dieap',
    description: 'Sistema de Projetos da DIEAP.',
    url: 'https://sistemas.cbm.df.gov.br/sistemas/desegweb/public/analise-distribui-homologa/list',
    icon: 'bi bi-diagram-3-fill',
    statusClass: 'status-analise'
  }
];

const assuncao = ref({
  nome: '',
  matricula: '',
  telefone: ''
});

const formatarTelefone = (e) => {
  let v = e.target.value.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
  if (v.length > 10) {
    v = v.replace(/(\d{5})(\d{4})$/, '$1-$2');
  } else {
    v = v.replace(/(\d{4})(\d{0,4})$/, '$1-$2');
  }
  assuncao.value.telefone = v;
};

const enviarAssuncao = () => {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const mensagem = `Bom dia!\nMilitar assumindo o serviço de Agente Fiscalizador de dia\n(${dataAtual}):\n\n${assuncao.value.nome}\nMatr.: ${assuncao.value.matricula}\nTelefone: ${assuncao.value.telefone}\n\nQualquer acionamento pode ser realizado pelo telefone acima.\n\nEstou à disposição.\nBom serviço!\nQue Deus nos abençoe.`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`, '_blank');
};
</script>

<style scoped>
.link-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 12px;
}
.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
}
.icon-box {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.4rem;
}
.card-form {
  border-radius: 12px;
}
</style>
