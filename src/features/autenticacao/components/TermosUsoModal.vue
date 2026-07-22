<template>
  <div
    v-if="show"
    class="modal show fade d-block modal-overlay-custom"
    tabindex="-1"
    role="dialog"
    @keydown.esc="preventClose"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0 shadow-lg">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title fw-bold d-flex align-items-center gap-2">
            <i class="bi bi-file-earmark-medical-fill fs-4"></i>
            <span>Termos de Uso do Aplicativo</span>
          </h5>
          <!-- Hide close button when mandatory -->
          <button v-if="!isMandatory" type="button" class="btn-close btn-close-white" @click="closeModal"></button>
        </div>
        
        <div class="modal-body p-4">
          <div v-if="isMandatory" class="alert alert-warning py-2 mb-3 small d-flex align-items-center gap-2">
            <i class="bi bi-exclamation-triangle-fill fs-5"></i>
            <span>Para utilizar o aplicativo, é obrigatório ler, compreender e declarar aceitação dos Termos de Uso abaixo.</span>
          </div>

          <div class="termos-body-scroll p-3 bg-light rounded border mb-3">
            <p class="lead fs-6 text-muted mb-4">
              Ao utilizar este aplicativo, o usuário declara estar ciente e concorda com os seguintes termos:
            </p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-database-lock me-1"></i> 1. Armazenamento de Dados</h6>
            <p class="small text-secondary mb-1">1.1. Todos os dados inseridos no aplicativo são armazenados exclusivamente no dispositivo do usuário, não sendo enviados ou armazenados em servidores do desenvolvedor.</p>
            <p class="small text-secondary mb-3">1.2. O usuário é o único responsável pela integridade, confidencialidade e gerenciamento dos dados armazenados em seu dispositivo.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-shield-lock me-1"></i> 2. Uso das Informações</h6>
            <p class="small text-secondary mb-1">2.1. As informações registradas no aplicativo destinam-se exclusivamente ao apoio das atividades de vistoria.</p>
            <p class="small text-secondary mb-1">2.2. É expressamente proibido:</p>
            <ul class="small text-secondary ps-4 mb-3">
              <li>Compartilhar informações com pessoas não autorizadas;</li>
              <li>Utilizar os dados para finalidades diversas da atividade funcional;</li>
              <li>Utilizar o aplicativo ou seus dados para fins ilícitos, fraudulentos ou maliciosos;</li>
              <li>Alterar, manipular ou utilizar informações de forma que comprometa sua autenticidade.</li>
            </ul>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-person-check me-1"></i> 3. Responsabilidade do Usuário</h6>
            <p class="small text-secondary mb-1">3.1. O usuário é integralmente responsável pela veracidade, exatidão e atualização das informações inseridas no aplicativo.</p>
            <p class="small text-secondary mb-1">3.2. Os recursos de preenchimento automático, sugestões de texto e demais funcionalidades inteligentes têm caráter meramente auxiliar e não substituem a análise técnica do usuário.</p>
            <p class="small text-secondary mb-3">3.3. Cabe exclusivamente ao usuário conferir todas as informações antes da emissão de qualquer documento, parecer ou laudo.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-clipboard-check me-1"></i> 4. Procedimentos de Vistoria</h6>
            <p class="small text-secondary mb-1">4.1. O aplicativo constitui apenas uma ferramenta de apoio às atividades de vistoria.</p>
            <p class="small text-secondary mb-1">4.2. O usuário deverá executar as vistorias em conformidade com a legislação, normas técnicas, instruções normativas e demais regulamentos vigentes do Corpo de Bombeiros Militar do Distrito Federal (CBMDF).</p>
            <p class="small text-secondary mb-3">4.3. Em caso de divergência entre as sugestões fornecidas pelo aplicativo e a legislação vigente, prevalecerão sempre as normas legais e regulamentares aplicáveis.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-cloud-arrow-up me-1"></i> 5. Backup e Preservação dos Dados</h6>
            <p class="small text-secondary mb-1">5.1. O usuário é responsável por realizar cópias de segurança (backup) dos dados armazenados no aplicativo.</p>
            <p class="small text-secondary mb-3">5.2. O desenvolvedor não garante a recuperação de dados perdidos em decorrência de falhas do dispositivo, reinstalação do aplicativo, exclusão acidental, danos ao equipamento ou qualquer outra causa.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-exclamation-octagon me-1"></i> 6. Limitação de Responsabilidade</h6>
            <p class="small text-secondary mb-1">6.1. O desenvolvedor não se responsabiliza por:</p>
            <ul class="small text-secondary ps-4 mb-1">
              <li>perda ou corrupção de dados;</li>
              <li>indisponibilidade do aplicativo;</li>
              <li>decisões técnicas tomadas pelo usuário;</li>
              <li>danos diretos ou indiretos decorrentes da utilização ou da impossibilidade de utilização do aplicativo.</li>
            </ul>
            <p class="small text-secondary mb-3">6.2. A utilização do aplicativo ocorre por conta e risco do usuário.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-building me-1"></i> 7. Uso Institucional</h6>
            <p class="small text-secondary mb-1">7.1. Este aplicativo destina-se ao apoio das atividades de vistoria realizadas por integrantes do Corpo de Bombeiros Militar do Distrito Federal (CBMDF).</p>
            <p class="small text-secondary mb-1 fw-bold text-dark bg-warning-subtle p-2 rounded">
              7.2. Este aplicativo não é um sistema corporativo, oficial ou institucional do CBMDF. Trata-se de uma ferramenta independente desenvolvida para auxiliar o trabalho do usuário durante a realização das vistorias.
            </p>
            <p class="small text-secondary mb-1">7.3. O aplicativo não substitui os sistemas oficiais do CBMDF, nem representa posicionamento institucional da Corporação.</p>
            <p class="small text-secondary mb-1">7.4. As informações geradas pelo aplicativo possuem caráter exclusivamente auxiliar, cabendo ao usuário validar seu conteúdo e, quando necessário, registrá-lo nos sistemas oficiais adotados pelo CBMDF.</p>
            <p class="small text-secondary mb-1">7.5. O uso do aplicativo é facultativo e de inteira responsabilidade do usuário, que deverá observar integralmente a legislação vigente, as normas técnicas e os procedimentos internos do CBMDF.</p>
            <p class="small text-secondary mb-3">7.6. O desenvolvedor não possui vínculo institucional com o CBMDF para fins de homologação, certificação ou representação oficial deste aplicativo.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-arrow-repeat me-1"></i> 8. Atualizações</h6>
            <p class="small text-secondary mb-1">8.1. O usuário é responsável por manter o aplicativo atualizado, utilizando sempre a versão mais recente disponibilizada.</p>
            <p class="small text-secondary mb-3">8.2. Atualizações poderão incluir correções, melhorias de segurança, adequações à legislação e novas funcionalidades.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-journal-text me-1"></i> 9. Alterações dos Termos</h6>
            <p class="small text-secondary mb-1">9.1. Estes Termos de Uso poderão ser alterados a qualquer momento para adequação legal, técnica ou operacional.</p>
            <p class="small text-secondary mb-3">9.2. A continuidade da utilização do aplicativo após a publicação de novas versões destes termos implica concordância com as alterações realizadas.</p>

            <h6 class="fw-bold text-primary mt-3"><i class="bi bi-check2-circle me-1"></i> 10. Aceitação</h6>
            <p class="small text-secondary mb-0">
              Ao utilizar este aplicativo, o usuário declara que leu, compreendeu e concorda integralmente com estes Termos de Uso, comprometendo-se a utilizá-lo de forma ética, responsável e em conformidade com a legislação e os regulamentos internos do Corpo de Bombeiros Militar do Distrito Federal.
            </p>
          </div>

          <!-- Declaration Checkbox -->
          <div class="form-check p-3 bg-white rounded border shadow-xs d-flex align-items-center gap-2">
            <input
              id="checkDeclaracaoTermos"
              v-model="declaracaoLida"
              class="form-check-input flex-shrink-0 cursor-pointer fs-5 mt-0"
              type="checkbox"
            />
            <label class="form-check-label small fw-bold text-dark cursor-pointer user-select-none" for="checkDeclaracaoTermos">
              Declaro que li e compreendi integralmente os Termos de Uso acima e concordo com todas as suas condições.
            </label>
          </div>
        </div>

        <div class="modal-footer bg-light border-top-0 d-flex justify-content-between">
          <button v-if="!isMandatory" type="button" class="btn btn-secondary px-4" @click="closeModal">
            Fechar
          </button>
          <button
            type="button"
            class="btn btn-success fw-bold px-4 ms-auto shadow-sm d-flex align-items-center gap-2"
            :disabled="!declaracaoLida"
            @click="aceitarTermos"
          >
            <i class="bi bi-check-circle-fill"></i>
            <span>Concordar e Continuar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { showToast } from '@/shared/composables/useToast.js';

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

const emit = defineEmits(['update:show', 'accepted']);

const isMandatory = ref(false);
const declaracaoLida = ref(false);

watch(() => props.show, (newVal) => {
  if (newVal) {
    const aceito = localStorage.getItem('termosAceitos') === 'true';
    declaracaoLida.value = aceito;
    isMandatory.value = props.enforceMandatory && !aceito;
  }
});

const closeModal = () => {
  if (isMandatory.value) {
    showToast("Você deve declarar que leu e concorda com os Termos de Uso para continuar.", "warning");
    return;
  }
  emit('update:show', false);
};

const preventClose = (e) => {
  if (isMandatory.value) {
    e.preventDefault();
  }
};

const aceitarTermos = () => {
  if (!declaracaoLida.value) {
    showToast("Por favor, marque a opção declarando que leu e compreendeu os termos.", "warning");
    return;
  }

  localStorage.setItem('termosAceitos', 'true');
  showToast("Termos de Uso declarados e aceitos com sucesso!", "success");
  isMandatory.value = false;
  emit('accepted');
  emit('update:show', false);
};

onMounted(() => {
  const aceito = localStorage.getItem('termosAceitos') === 'true';
  declaracaoLida.value = aceito;
  if (props.enforceMandatory && !aceito) {
    isMandatory.value = true;
    emit('update:show', true);
  }
});
</script>

<style scoped>
.termos-body-scroll {
  max-height: 380px;
  overflow-y: auto;
  border-left: 4px solid var(--primary-color) !important;
}
.cursor-pointer {
  cursor: pointer;
}
.shadow-xs {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
