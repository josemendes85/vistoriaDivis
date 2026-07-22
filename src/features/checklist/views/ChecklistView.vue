<template>
  <BaseLayout title="Checklist de Incêndio" backRoute="/">
    <div class="pt-2 px-1">
      <!-- Fixed Controls Bar -->
      <div class="controls-bar shadow-sm py-3 px-3 mb-4 rounded-3 controls-bar-sticky">
        <div class="row g-3 align-items-center">
          <!-- Search Input -->
          <div class="col-md-4">
            <input
              v-model="searchTerm"
              type="text"
              class="form-control"
              placeholder="Digite para filtrar os itens..."
            />
          </div>
  
          <!-- Filter Category Select -->
          <div class="col-md-3">
            <select v-model="selectedCategory" class="form-select">
              <option value="">Todas as Categorias</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
  
          <!-- Action Buttons -->
          <div class="col-md-5 d-flex gap-2 justify-content-md-end flex-wrap">
            <button
              class="btn btn-success flex-grow-1"
              :disabled="selectedIds.size === 0"
              @click="copySelectedItems"
            >
              <i class="bi bi-file-earmark-check me-1"></i>
              Copiar Notificação ({{ selectedIds.size }})
            </button>
            <button
              class="btn btn-primary flex-grow-1"
              :disabled="selectedIds.size === 0"
              @click="copyTableFormat"
            >
              <i class="bi bi-file-earmark-spreadsheet me-1"></i>
              Copiar Retorno ({{ selectedIds.size }})
            </button>
            <button
              class="btn btn-orange text-white"
              :disabled="selectedIds.size === 0"
              @click="clearSelection"
            >
              <i class="bi bi-x-circle me-1"></i>
              Limpar
            </button>
          </div>
        </div>
      </div>
  
      <!-- Checklist Content -->
      <div class="px-0">
        <div v-if="filteredGroups.length === 0" class="text-center text-muted py-5">
          <i class="bi bi-info-circle display-4 mb-3"></i>
          <h3>Nenhum registro encontrado.</h3>
        </div>
  
        <div v-else class="row">
          <div
            v-for="group in filteredGroups"
            :key="group.title"
            class="col-12 mb-4"
          >
            <div class="card item-group shadow-sm border-0">
              <div class="card-header bg-danger text-white p-3 fw-bold fs-5">
                {{ group.title }}
              </div>
              <div class="list-group list-group-flush">
                <div
                  v-for="item in group.items"
                  :key="item.id"
                  :class="['list-group-item', 'checklist-item', { 'selected': selectedIds.has(item.id) }]"
                  @click="toggleItem(item.id)"
                >
                  <div class="d-flex align-items-start">
                    <span class="item-id text-danger fw-bold me-2">{{ item.id }}</span>
                    <div class="flex-grow-1 text-content">{{ item.text }}</div>
                    <div class="form-check ms-3">
                      <input
                        type="checkbox"
                        class="form-check-input check-indicator"
                        :checked="selectedIds.has(item.id)"
                        @click.stop="toggleItem(item.id)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseLayout from '@/app/layouts/BaseLayout.vue';
import { checklistData } from '../data/checklistData.js';
import { copiarTexto } from '@/shared/services/clipboardService.js';
import { showToast } from '@/shared/composables/useToast.js';

const searchTerm = ref('');
const selectedCategory = ref('');
const selectedIds = ref(new Set());

// Dynamic categories extraction
const categories = computed(() => {
  return Array.from(new Set(checklistData.map(item => item.title))).sort();
});

// Toggle selection
const toggleItem = (id) => {
  if (selectedIds.value.has(id)) {
    selectedIds.value.delete(id);
  } else {
    selectedIds.value.add(id);
  }
  // Trigger Vue reactivity
  selectedIds.value = new Set(selectedIds.value);
};

const clearSelection = () => {
  selectedIds.value = new Set();
};

// Filter and group items
const filteredGroups = computed(() => {
  const query = searchTerm.value.toLowerCase();
  
  // Filter items
  const filtered = checklistData.filter(item => {
    const matchesSearch = !query || 
      item.id.includes(query) || 
      item.text.toLowerCase().includes(query) || 
      item.title.toLowerCase().includes(query);
      
    const matchesCategory = !selectedCategory.value || 
      item.title === selectedCategory.value;
      
    return matchesSearch && matchesCategory;
  });

  // Group items by category (title)
  const groups = {};
  filtered.forEach(item => {
    if (!groups[item.title]) {
      groups[item.title] = [];
    }
    groups[item.title].push(item);
  });

  // Convert to array format
  return Object.keys(groups).map(title => ({
    title,
    items: groups[title]
  })).sort((a, b) => a.title.localeCompare(b.title));
});

// Clipboard functions
const getSelectedItems = () => {
  return checklistData.filter(item => selectedIds.value.has(item.id));
};

const copySelectedItems = () => {
  const selected = getSelectedItems();
  if (selected.length === 0) return;

  const text = selected.map(item => `${item.id} - ${item.text}`).join('\n');
  copiarTexto(text);
  showToast(`Copiado ${selected.length} itens para Notificação!`, 'success');
};

const copyTableFormat = () => {
  const selected = getSelectedItems();
  if (selected.length === 0) return;

  const text = selected.map(item => `${item.id}\tITEM\t${item.text}`).join('\n');
  copiarTexto(text);
  showToast(`Copiado ${selected.length} itens no formato de Tabela!`, 'success');
};
</script>

<style scoped>
.controls-bar {
  position: sticky;
  top: 80px;
  z-index: 99;
  background-color: var(--form-section-bg);
  border: 1px solid var(--border-color);
}
.btn-orange {
  background-color: var(--orange-color) !important;
  border-color: var(--orange-color) !important;
  color: var(--white) !important;
}
.btn-orange:hover {
  filter: brightness(0.9);
}
.item-group {
  border-radius: 10px;
  overflow: hidden;
}
.checklist-item {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 1rem 1.25rem;
}
.checklist-item:hover {
  background-color: rgba(205, 106, 106, 0.1);
  border-left: 5px solid var(--danger-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
.checklist-item.selected {
  background-color: rgba(112, 162, 136, 0.1) !important;
  border-left: 5px solid var(--success-color);
}
.checklist-item.selected .item-id {
  color: var(--success-color) !important;
}
.check-indicator {
  cursor: pointer;
}
.text-content {
  font-size: 0.95rem;
  line-height: 1.4;
}
</style>
