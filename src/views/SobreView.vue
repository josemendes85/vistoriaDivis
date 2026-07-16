<template>
  <BaseLayout title="Sobre o Sistema" backRoute="/">
    <div class="pt-2 px-1">
      
      <div class="form-section shadow-sm bg-white p-4 mb-4">
        <h4 class="section-title"><i class="bi bi-info-circle me-2"></i>Informações do Sistema</h4>
        <p class="mt-3"><strong>Nome do Sistema:</strong> Vistorias DIVIS</p>
        <p><strong>Versão:</strong> v2.0.0 (Migrado para Vue 3)</p>
        <p class="text-muted small mb-0">Última atualização: Julho de 2026</p>
      </div>

      <div class="form-section shadow-sm bg-white p-4 mb-4">
        <h4 class="section-title"><i class="bi bi-person me-2"></i>Direitos Autorais e Contato</h4>
        <p class="mt-3 text-muted">
          &copy; 2026. Todos os direitos reservados.
        </p>
        <p>Desenvolvido por: <strong>2ºSGT José Mendes</strong>.</p>

        <a href="https://www.linkedin.com/in/josemendes85/" target="_blank" class="btn btn-outline-primary btn-sm mt-2">
          <i class="bi bi-linkedin me-2"></i>Ver Perfil no LinkedIn
        </a>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';
</script>
