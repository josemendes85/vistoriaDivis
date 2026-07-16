<template>
  <div class="modal fade" id="anotacaoModal" tabindex="-1" aria-labelledby="anotacaoModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="anotacaoModalLabel">Anotação da Exigência</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p class="text-muted small mb-1"><strong>Código:</strong> {{ item?.code }}</p>
          <p class="text-dark mb-3">{{ item?.text }}</p>
          <div class="mb-3">
            <textarea
              v-model="tempAnotacao"
              class="form-control"
              rows="6"
              placeholder="Insira suas observações, pendências, ou qualquer nota relevante sobre esta exigência."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="save">Salvar Anotação</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save']);

const tempAnotacao = ref('');

watch(() => props.item, (newVal) => {
  tempAnotacao.value = newVal?.anotacao || '';
}, { immediate: true });

const save = () => {
  emit('save', tempAnotacao.value);
};
</script>
