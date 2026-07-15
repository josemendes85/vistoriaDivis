<template>
  <BaseLayout title="Painel de Eventuais" backRoute="/">
    <div class="pt-2 px-1">
      <!-- Filtering Options and Actions -->
      <div class="form-section mb-4 bg-transparent p-0">
        <h4 class="section-title">
          <i class="bi bi-funnel me-2 text-success"></i>Opções de Filtragem e Ações
        </h4>
        <div class="row g-3 align-items-end">
          <div class="col-md-4">
            <label class="form-label fw-bold small text-muted">Status:</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">Todos</option>
              <option value="A Fazer">A Fazer</option>
              <option value="Enviado">Enviado</option>
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-bold small text-muted">Pesquisar (Evento/Responsável):</label>
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Buscar..."
            />
          </div>
          <div class="col-md-4 d-flex justify-content-end">
            <button class="btn btn-success w-100 py-2 fw-bold" @click="novoEventual">
              <i class="bi bi-plus-circle me-2"></i>Novo Eventual
            </button>
          </div>
        </div>
      </div>

      <!-- No Records Message -->
      <div v-if="filteredEventuais.length === 0" class="text-center text-muted py-5">
        <i class="bi bi-calendar-x display-4 mb-3"></i>
        <h3>Nenhum registro encontrado.</h3>
        <p class="small text-muted">Clique em "Novo Eventual" para cadastrar.</p>
      </div>

      <!-- Grouped Lists -->
      <div v-else class="row">
        <div v-for="status in visibleStatuses" :key="status" class="col-12 mb-4">
          <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
            <div :class="['card-header', 'text-white', 'py-2', 'px-3', getStatusHeaderClass(status)]">
              <h5 class="mb-0 fw-bold">
                {{ status }} ({{ getEventualsByStatus(status).length }} {{ getEventualsByStatus(status).length === 1 ? 'evento' : 'eventos' }})
              </h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover m-0">
                  <thead class="table-light">
                    <tr>
                      <th style="width: 50px;"></th>
                      <th>Processo</th>
                      <th>Evento</th>
                      <th>Responsável</th>
                      <th>Data</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in getEventualsByStatus(status)"
                      :key="item.id"
                      class="cursor-pointer"
                      @click="editarEventual(item.id)"
                    >
                      <td class="text-center"><i class="bi bi-grip-vertical text-muted"></i></td>
                      <td class="fw-bold text-primary">{{ item.processo || '---' }}</td>
                      <td>{{ item.evento || '---' }}</td>
                      <td>{{ item.responsavel || '---' }}</td>
                      <td>{{ formatDataStr(item.data) }}</td>
                      <td>
                        <span :class="['badge', getStatusBadgeClass(item.status)]">
                          {{ item.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '../components/BaseLayout.vue';
import { showToast } from '../utils/utils.js';

const router = useRouter();

const filterStatus = ref('');
const searchTerm = ref('');
const eventuais = ref([]);

const statusOptions = ['A Fazer', 'Enviado'];

const carregarDados = () => {
  const loaded = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('eventual-')) {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item) {
          // Normalize status representation
          if (!item.status || item.status === 'Pendente') item.status = 'A Fazer';
          if (item.status === 'Concluído') item.status = 'Enviado';
          
          loaded.push({
            id: item.id || key.substring(9),
            processo: item.processo || '---',
            evento: item.evento || '---',
            responsavel: item.responsavel || '---',
            data: item.data || item.data_inicio || '---',
            status: item.status
          });
        }
      } catch (e) {
        console.error("Erro ao ler eventual do localStorage:", e);
      }
    }
  }
  eventuais.value = loaded;
};

const filteredEventuais = computed(() => {
  const query = searchTerm.value.toLowerCase();
  const statusFilter = filterStatus.value;

  return eventuais.value.filter(d => {
    const matchBusca = !query ||
      (d.evento || "").toLowerCase().includes(query) ||
      (d.responsavel || "").toLowerCase().includes(query) ||
      (d.processo || "").toLowerCase().includes(query);
    const matchStatus = !statusFilter || d.status === statusFilter;
    return matchBusca && matchStatus;
  });
});

const visibleStatuses = computed(() => {
  if (filterStatus.value) {
    return [filterStatus.value];
  }
  return statusOptions.filter(status => {
    return getEventualsByStatus(status).length > 0;
  });
});

const getEventualsByStatus = (status) => {
  return filteredEventuais.value.filter(d => d.status === status);
};

const formatDataStr = (dateStr) => {
  if (!dateStr || dateStr === '---') return '---';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

const novoEventual = () => {
  router.push('/eventual');
};

const editarEventual = (id) => {
  router.push(`/eventual/${id}`);
};

const getStatusHeaderClass = (status) => {
  if (status === 'Enviado') return 'status-aprovado';
  return 'status-sem-status';
};

const getStatusBadgeClass = (status) => {
  if (status === 'Enviado') return 'status-aprovado';
  return 'status-pendente';
};

onMounted(() => {
  carregarDados();
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
