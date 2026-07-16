<template>
  <div>
    <nav
      class="navbar navbar-dark fixed-top shadow-sm transition-navbar"
      :class="navbarClass"
      :style="!navbarClass ? 'background-color: var(--primary-color) !important; color: #ffffff !important;' : ''"
    >
      <div class="container-fluid d-flex align-items-center justify-content-between">
        <!-- Left Side: Back button and/or Module Navigation -->
        <div class="d-flex align-items-center gap-2">
          <!-- Always show Menu Dropdown for easy global navigation -->
          <div ref="dropdownContainer" class="dropdown">
            <button
              class="btn btn-sm dropdown-toggle fw-medium shadow-sm transition-btn"
              :class="[isLightNavbar ? 'btn-dark' : 'btn-outline-light', { show: isMenuOpen }]"
              type="button"
              id="navDropdown"
              @click="toggleMenu"
              :aria-expanded="isMenuOpen ? 'true' : 'false'"
            >
              <i class="bi bi-list me-1"></i>Menu
            </button>
            <ul class="dropdown-menu shadow-lg border-0" :class="{ show: isMenuOpen }" aria-labelledby="navDropdown">
              <li>
                <router-link to="/processos" class="dropdown-item py-2" @click="closeMenu">
                  <i class="bi bi-folder2-open me-2 text-primary"></i>Processos
                </router-link>
              </li>
              <li>
                <router-link to="/checklist" class="dropdown-item py-2" @click="closeMenu">
                  <i class="bi bi-person-lines-fill me-2 text-info"></i>Checklist
                </router-link>
              </li>
              <li>
                <router-link to="/backup" class="dropdown-item py-2" @click="closeMenu">
                  <i class="bi bi-cloud-arrow-up me-2 text-warning"></i>Backup
                </router-link>
              </li>
              <li>
                <router-link to="/links" class="dropdown-item py-2" @click="closeMenu">
                  <i class="bi bi-link-45deg me-2 text-danger"></i>Links
                </router-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link to="/sobre" class="dropdown-item py-2" @click="closeMenu">
                  <i class="bi bi-info-circle me-2 text-secondary"></i>Sobre
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Back Button next to menu if backRoute is provided -->
          <router-link
            v-if="backRoute"
            :to="backRoute"
            class="btn btn-sm d-flex align-items-center fw-medium shadow-sm transition-btn"
            :class="isLightNavbar ? 'btn-dark' : 'btn-outline-light'"
          >
            <i class="bi bi-arrow-left me-1"></i> <span>{{ backText || "Voltar" }}</span>
          </router-link>
        </div>

        <!-- Center: Title -->
        <span
          class="navbar-brand fw-bold text-uppercase text-center d-none d-sm-block flex-grow-1 mx-2"
          style="color: inherit"
        >
          {{ title || "Vistorias DIVIS" }}
        </span>

        <!-- Right Side: Equipe button (always visible) -->
        <div>
          <button
            class="btn btn-sm fw-medium shadow-sm transition-btn"
            :class="isLightNavbar ? 'btn-outline-dark' : 'btn-outline-light'"
            @click="showEquipeModal = true"
          >
            <i class="bi bi-people-fill me-1"></i>Equipe
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main
      class="container-fluid px-md-5 px-3 mx-auto"
      style="margin-top: 80px; padding-bottom: 50px; max-width: 1600px"
    >
      <slot />
    </main>

    <!-- Equipe de Vistoria Modal (Global Config) -->
    <EquipeModal v-model:show="showEquipeModal" :enforceMandatory="!backRoute" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import EquipeModal from "./EquipeModal.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Vistorias DIVIS",
  },
  backRoute: {
    type: String,
    default: "",
  },
  backText: {
    type: String,
    default: "Voltar",
  },
  navbarClass: {
    type: String,
    default: "",
  },
});

const showEquipeModal = ref(false);

const isLightNavbar = computed(() => props.navbarClass === "status-pendente");

const isMenuOpen = ref(false);
const dropdownContainer = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const clickOutsideHandler = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", clickOutsideHandler);
});

onUnmounted(() => {
  document.removeEventListener("click", clickOutsideHandler);
});
</script>

<style scoped>
.navbar-brand {
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  max-width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.transition-navbar {
  transition:
    background-color 0.4s ease,
    color 0.4s ease,
    border-color 0.4s ease;
}
.transition-btn {
  transition: all 0.25s ease;
}
</style>
