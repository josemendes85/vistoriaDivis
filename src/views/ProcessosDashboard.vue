<template>
  <BaseLayout title="Painel de Processos (Vistorias Padrão)">
    <div class="pt-2 px-1">
      <!-- Filtering Options and Actions -->
      <div class="form-section mb-4 bg-transparent p-0">
        <h4 class="section-title">
          <i class="bi bi-funnel me-2 text-primary"></i>Opções de Filtragem e Ações
        </h4>
        <div class="row g-3 align-items-end">
          <div class="col-md-3">
            <label class="form-label fw-bold small text-muted">Filtrar por Status:</label>
            <select v-model="filterStatus" class="form-select">
              <option value="">Todos os Status</option>
              <option v-for="st in statusOptions" :key="st" :value="st">
                {{ st === 'Análise' ? 'Em Análise' : st === 'Vistoria' ? 'Em Vistoria' : st }}
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label fw-bold small text-muted">Pesquisar (Processo/Instituição/CNPJ):</label>
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Buscar número, instituição ou CNPJ..."
            />
          </div>
          <div class="col-md-3 pb-2 d-flex align-items-center justify-content-center">
            <div class="form-check form-switch mb-0">
              <input v-model="exibirConcluidos" class="form-check-input" type="checkbox" id="exibirConcluidos" />
              <label class="form-check-label fw-bold text-muted small" for="exibirConcluidos">
                Exibir concluídos
              </label>
            </div>
          </div>
          <div class="col-md-3 d-flex">
            <button class="btn btn-primary w-100 py-2 fw-bold" @click="novoProcesso">
              <i class="bi bi-plus-circle me-1"></i>Novo Processo
            </button>
          </div>
        </div>
      </div>

      <!-- No Processes Message -->
      <div v-if="filteredProcessos.length === 0" class="text-center text-muted py-5">
        <i class="bi bi-folder-x display-4 mb-3"></i>
        <h3>Nenhum processo cadastrado.</h3>
        <p class="small text-muted">Clique em "Novo Processo" para adicionar um novo registro.</p>
      </div>

      <!-- Drag and Drop Process Cards Grouped by Status -->
      <div v-else class="row">
        <div
          v-for="status in visibleStatuses"
          :key="status"
          class="col-12 mb-4"
        >
          <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
            <div :class="['card-header', 'text-white', 'py-2', 'px-3', 'd-flex', 'justify-content-between', 'align-items-center', getStatusHeaderClass(status)]">
              <h5 class="mb-0 fw-bold">
                {{ status === 'Análise' ? 'Em Análise' : status === 'Vistoria' ? 'Em Vistoria' : status }}
                ({{ getProcessesByStatus(status).length }} {{ getProcessesByStatus(status).length === 1 ? 'processo' : 'processos' }})
              </h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped table-hover m-0">
                  <thead class="table-light">
                    <tr>
                      <th style="width: 50px;"></th>
                      <th>Processo</th>
                      <th>Instituição</th>
                      <th>Data de Início</th>
                      <th>Tipo</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody
                    :id="'sortable-list-' + formatarClasseStatus(status)"
                    :data-status="status"
                    class="sortable-tbody"
                  >
                    <tr
                      v-for="p in getPaginatedProcesses(status)"
                      :key="p.id"
                      :data-id="p.id"
                      class="drag-process cursor-pointer"
                      @click="editarProcesso(p.id, $event)"
                    >
                      <td class="drag-handle-cell text-center" @click.stop>
                        <i class="bi bi-grip-vertical text-muted fs-5 cursor-grab"></i>
                      </td>
                      <td class="fw-bold text-primary">
                        {{ p.processo }}
                        <span v-if="p.checkConcluido" class="badge bg-success ms-2 small" style="font-weight: normal; font-size: 0.75rem;">
                          <i class="bi bi-check-circle-fill me-1"></i>Concluído
                        </span>
                      </td>
                      <td>{{ p.instituicao || '-' }}</td>
                      <td>{{ formatDataStr(p.inicio) }}</td>
                      <td>{{ p.tipo || '-' }}</td>
                      <td>
                        <span :class="['badge', getStatusBadgeClass(p.status)]">
                          {{ p.status === 'Análise' ? 'Em Análise' : p.status === 'Vistoria' ? 'Em Vistoria' : p.status }}
                        </span>
                      </td>
                    </tr>
                    <tr v-if="getProcessesByStatus(status).length === 0">
                      <td colspan="6" class="text-center text-muted py-3 small">
                        Nenhum processo neste status. Arraste processos aqui para mudar.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Pagination -->
              <div v-if="getTotalPages(status) > 1" class="d-flex justify-content-between align-items-center p-3 border-top bg-light flex-wrap gap-2">
                <span class="small text-muted">
                  Exibindo {{ getPaginatedStart(status) }}-{{ getPaginatedEnd(status) }} de {{ getProcessesByStatus(status).length }} processos
                </span>
                <nav aria-label="Navegação de processos">
                  <ul class="pagination pagination-sm mb-0">
                    <li class="page-item" :class="{ disabled: getCurrentPage(status) === 1 }">
                      <a class="page-link" href="#" @click.prevent="setPage(status, getCurrentPage(status) - 1)">
                        <i class="bi bi-chevron-left"></i>
                      </a>
                    </li>
                    <li 
                      v-for="pg in getTotalPages(status)" 
                      :key="pg" 
                      class="page-item" 
                      :class="{ active: getCurrentPage(status) === pg }"
                    >
                      <a class="page-link" href="#" @click.prevent="setPage(status, pg)">{{ pg }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: getCurrentPage(status) === getTotalPages(status) }">
                      <a class="page-link" href="#" @click.prevent="setPage(status, getCurrentPage(status) + 1)">
                        <i class="bi bi-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '../components/BaseLayout.vue';
import { showToast } from '../utils/utils.js';
import Sortable from 'sortablejs';

const router = useRouter();

const statusOptions = ['Pendente', 'Análise', 'Vistoria', 'Aprovado', 'Reprovado', 'Cancelado', 'Não Realizada', 'Sem Status', 'Concluído'];

const filterStatus = ref('');
const searchTerm = ref('');
const exibirConcluidos = ref(false);
const processos = ref([]);
const currentPages = ref({});

// Load processes from LocalStorage
const carregarProcessos = () => {
  const loaded = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('processo-')) {
      try {
        const item = JSON.parse(localStorage.getItem(key));
        if (item) {
          loaded.push({
            id: item.id || key.substring(9),
            processo: item.processoBusca || 'Sem número',
            instituicao: item.instituicao || '',
            cnpj: item.cnpj || '',
            inicio: item.inicio || '',
            tipo: item.tipo || '',
            status: item.status || 'Sem Status',
            checkConcluido: item.checkConcluido || false
          });
        }
      } catch (e) {
        console.error("Erro ao ler item de localStorage:", e);
      }
    }
  }
  processos.value = loaded;
};

// Filtered processes based on query and selected status filter
const filteredProcessos = computed(() => {
  const query = searchTerm.value.toLowerCase();
  const cleanQuery = query.replace(/\D/g, '');
  const statusFilter = filterStatus.value;

  return processos.value.filter(p => {
    // Hide completed processes unless the toggle switch is checked
    if (!exibirConcluidos.value && p.checkConcluido) {
      return false;
    }

    const matchesStatus = !statusFilter || p.status === statusFilter;
    const cleanCnpj = p.cnpj.replace(/\D/g, '');
    const matchesSearch = !query ||
      p.processo.toLowerCase().includes(query) ||
      p.instituicao.toLowerCase().includes(query) ||
      p.cnpj.toLowerCase().includes(query) ||
      (cleanQuery !== '' && cleanCnpj.includes(cleanQuery));

    return matchesStatus && matchesSearch;
  });
});

// Groups which are visible (has processes or filters)
const visibleStatuses = computed(() => {
  if (filterStatus.value) {
    return [filterStatus.value];
  }
  return statusOptions.filter(status => {
    return getProcessesByStatus(status).length > 0;
  });
});

// Pagination Helpers
const getCurrentPage = (status) => {
  return currentPages.value[status] || 1;
};

const getTotalPages = (status) => {
  const len = getProcessesByStatus(status).length;
  return Math.ceil(len / 15) || 1;
};

const getPaginatedProcesses = (status) => {
  const list = getProcessesByStatus(status);
  const page = getCurrentPage(status);
  const start = (page - 1) * 15;
  return list.slice(start, start + 15);
};

const getPaginatedStart = (status) => {
  const page = getCurrentPage(status);
  return (page - 1) * 15 + 1;
};

const getPaginatedEnd = (status) => {
  const start = getPaginatedStart(status);
  const len = getProcessesByStatus(status).length;
  const end = start + 14;
  return end > len ? len : end;
};

const setPage = (status, page) => {
  const max = getTotalPages(status);
  let target = page;
  if (target < 1) target = 1;
  if (target > max) target = max;
  currentPages.value[status] = target;
};

const getProcessesByStatus = (status) => {
  const group = filteredProcessos.value.filter(p => p.status === status);
  
  // Sort items based on saved order if any
  const savedOrderRaw = localStorage.getItem(`vistorias_process_item_order_${status}`);
  if (savedOrderRaw) {
    try {
      const order = JSON.parse(savedOrderRaw);
      const map = new Map(group.map(p => [p.id, p]));
      const sorted = [];
      order.forEach(id => {
        if (map.has(id)) {
          sorted.push(map.get(id));
          map.delete(id);
        }
      });
      sorted.push(...Array.from(map.values()));
      return sorted;
    } catch (e) {
      console.error(e);
    }
  }
  return group;
};

const formatarClasseStatus = (status) => {
  return status.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
};

const getStatusHeaderClass = (status) => {
  const s = (status || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  return `status-${s}`;
};

const getStatusBadgeClass = (status) => {
  const s = (status || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  return `status-${s}`;
};

const formatDataStr = (dateStr) => {
  if (!dateStr) return '-';
  if (dateStr.includes('T')) {
    const [datePart, timePart] = dateStr.split('T');
    const parts = datePart.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]} ${timePart}`;
    }
  }
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};

// Route navigation
const novoProcesso = () => {
  router.push('/processo');
};

const editarProcesso = (id, event) => {
  if (event.target.closest('.drag-handle-cell')) return;
  router.push(`/processo/${id}`);
};

// Drag and drop setup with SortableJS
const initSortables = () => {
  nextTick(() => {
    statusOptions.forEach(status => {
      const el = document.getElementById('sortable-list-' + formatarClasseStatus(status));
      if (el) {
        // Destroy existing Sortable if any
        if (el.__sortable) {
          el.__sortable.destroy();
        }
        
        el.__sortable = new Sortable(el, {
          group: 'processos',
          animation: 150,
          handle: '.drag-handle-cell',
          onEnd: (evt) => {
            const fromStatus = evt.from.getAttribute('data-status');
            const toStatus = evt.to.getAttribute('data-status');
            const processId = evt.item.getAttribute('data-id');

            // Update status in localStorage
            const key = `processo-${processId}`;
            const raw = localStorage.getItem(key);
            if (raw) {
              try {
                const data = JSON.parse(raw);
                data.status = toStatus;
                if (toStatus === 'Concluído') {
                  data.checkConcluido = true;
                } else {
                  data.checkConcluido = false;
                }
                localStorage.setItem(key, JSON.stringify(data));
              } catch (e) {
                console.error(e);
              }
            }

            // Save new positions
            const fromOrder = Array.from(evt.from.children)
              .map(c => c.getAttribute('data-id'))
              .filter(id => id !== null);
            const toOrder = Array.from(evt.to.children)
              .map(c => c.getAttribute('data-id'))
              .filter(id => id !== null);

            localStorage.setItem(`vistorias_process_item_order_${fromStatus}`, JSON.stringify(fromOrder));
            localStorage.setItem(`vistorias_process_item_order_${toStatus}`, JSON.stringify(toOrder));

            showToast(`Processo movido para "${toStatus === 'Análise' ? 'Em Análise' : toStatus === 'Vistoria' ? 'Em Vistoria' : toStatus}"!`, 'success');
            
            carregarProcessos();
          }
        });
      }
    });
  });
};

onMounted(() => {
  carregarProcessos();
});

// Watch visible statuses and current pages to initialize SortableJS on container updates
watch([visibleStatuses, currentPages], () => {
  initSortables();
}, { deep: true, immediate: true });

// Reset pages when query filters change
watch([filterStatus, searchTerm, exibirConcluidos], () => {
  currentPages.value = {};
});
</script>

<style scoped>
.drag-process {
  cursor: pointer;
}
.drag-process:hover {
  background-color: #f1f1f1;
}
.drag-handle-cell {
  width: 40px;
  cursor: grab;
}
.cursor-grab {
  cursor: grab;
}
</style>
