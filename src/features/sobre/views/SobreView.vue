<template>
  <BaseLayout title="Sobre o Sistema" backRoute="/">
    <div class="pt-2 px-1">
      
      <div class="form-section shadow-sm p-4 mb-4">
        <h4 class="section-title"><i class="bi bi-info-circle me-2"></i>Informações do Sistema</h4>
        <p class="mt-3"><strong>Nome do Sistema:</strong> Vistorias DIVIS</p>
        <p><strong>Versão:</strong> v2.0.0 (Migrado para Vue 3)</p>
        <p class="text-muted small mb-3">Última atualização: Julho de 2026</p>
        
        <button class="btn btn-outline-secondary btn-sm" @click="showTermosModal = true">
          <i class="bi bi-file-earmark-medical me-2 text-primary"></i>Visualizar Termos de Uso
        </button>
      </div>

      <div class="form-section shadow-sm p-4 mb-4">
        <h4 class="section-title"><i class="bi bi-person me-2"></i>Direitos Autorais e Contato</h4>
        <p class="mt-3 text-muted">
          &copy; 2026. Todos os direitos reservados.
        </p>
        <p>Desenvolvido por: <strong>2ºSGT José Mendes</strong>.</p>

        <a href="https://www.linkedin.com/in/josemendes85/" target="_blank" class="btn btn-outline-primary btn-sm mt-2">
          <i class="bi bi-linkedin me-2"></i>Ver Perfil no LinkedIn
        </a>
      </div>

      <TermosUsoModal v-model:show="showTermosModal" :enforceMandatory="false" />
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue';
import BaseLayout from '@/app/layouts/BaseLayout.vue';
import TermosUsoModal from '@/features/autenticacao/components/TermosUsoModal.vue';

const showTermosModal = ref(false);
</script>
