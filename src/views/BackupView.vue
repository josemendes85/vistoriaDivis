<template>
  <BaseLayout title="Gerenciamento de Dados" backRoute="/">
    <div class="pt-2 px-1">
      <div class="form-section shadow-sm p-4">
        <h4 class="section-title text-center mb-4">
          <i class="bi bi-cloud-arrow-up me-2"></i>Backup & Restauração
        </h4>
        <p class="text-center text-muted mb-4 small">
          Faça o backup de todos os dados salvos localmente ou restaure-os de um arquivo JSON.
        </p>
  
        <!-- Botão de Exportar/Backup -->
        <div class="mb-3">
          <button class="btn btn-success w-100 py-3 fw-bold" @click="exportBackup">
            <i class="bi bi-download me-2"></i>Fazer Backup (Exportar Dados)
          </button>
        </div>
  
        <!-- Botão de Importar/Restaurar -->
        <div class="mb-3">
          <label for="fileInputBackup" class="btn btn-warning w-100 py-3 mb-0 text-dark fw-bold cursor-pointer">
            <i class="bi bi-upload me-2"></i>Restaurar Dados (Importar Backup)
          </label>
          <input type="file" id="fileInputBackup" accept="application/json" class="d-none" @change="importBackup" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '../components/BaseLayout.vue';
import { showToast } from '../utils/utils.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const LOCAL_STORAGE_GROUP_ORDER_KEY = 'vistorias_process_status_group_order';
const LOCAL_STORAGE_ITEM_ORDER_PREFIX = 'vistorias_process_item_order_';
const PROCESS_KEY_PREFIX = 'processo-';
const EVENTUAL_KEY_PREFIX = 'eventual-';

const EQUIPE_KEY = 'equipeVistoria';
const THEME_KEY = 'theme';

const createBackupData = () => {
  const backupData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key.startsWith(PROCESS_KEY_PREFIX) ||
      key.startsWith(EVENTUAL_KEY_PREFIX) ||
      key === LOCAL_STORAGE_GROUP_ORDER_KEY ||
      key.startsWith(LOCAL_STORAGE_ITEM_ORDER_PREFIX) ||
      key === EQUIPE_KEY ||
      key === THEME_KEY
    ) {
      backupData[key] = localStorage.getItem(key);
    }
  }
  return backupData;
};

const exportBackup = () => {
  const data = createBackupData();
  if (Object.keys(data).length === 0) {
    showToast("Não há dados para exportar.", 'danger');
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.download = `backup_vistorias_divis_${new Date().toISOString().slice(0, 10)}.json`;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast("Backup exportado com sucesso!", 'success');
};

const importBackup = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backupData = JSON.parse(e.target.result);
      let importedCount = 0;

      if (!confirm(`Tem certeza que deseja RESTAURAR o backup? Isso substituirá TODOS os dados (${Object.keys(backupData).length} itens) com os dados do arquivo.`)) {
        return;
      }

      // Limpar chaves antigas
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (
          key.startsWith(PROCESS_KEY_PREFIX) ||
          key.startsWith(EVENTUAL_KEY_PREFIX) ||
          key === LOCAL_STORAGE_GROUP_ORDER_KEY ||
          key.startsWith(LOCAL_STORAGE_ITEM_ORDER_PREFIX) ||
          key === EQUIPE_KEY ||
          key === THEME_KEY
        ) {
          localStorage.removeItem(key);
        }
      }

      // Importar novos dados
      for (const key in backupData) {
        localStorage.setItem(key, backupData[key]);
        importedCount++;
      }

      showToast(`Restauração concluída. ${importedCount} itens importados.`, 'success');
      
      setTimeout(() => {
        router.push('/processos');
      }, 1500);

    } catch (error) {
      console.error("Erro ao importar backup:", error);
      showToast("Erro ao processar o arquivo de backup. Verifique se é um JSON válido.", 'danger');
    }
    event.target.value = '';
  };

  reader.onerror = () => {
    showToast("Erro ao ler o arquivo.", 'danger');
    event.target.value = '';
  };

  reader.readAsText(file);
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
