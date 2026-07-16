import { createRouter, createWebHashHistory } from 'vue-router';
import SobreView from '../views/SobreView.vue';
import LinksView from '../views/LinksView.vue';
import BackupView from '../views/BackupView.vue';
import ChecklistView from '../views/ChecklistView.vue';
import ProcessosDashboard from '../views/ProcessosDashboard.vue';
import ProcessoForm from '../views/ProcessoForm.vue';

const routes = [
  { path: '/', name: 'Home', component: ProcessosDashboard },
  { path: '/sobre', name: 'Sobre', component: SobreView },
  { path: '/links', name: 'Links', component: LinksView },
  { path: '/backup', name: 'Backup', component: BackupView },
  { path: '/checklist', name: 'Checklist', component: ChecklistView },
  { path: '/processos', redirect: '/' },
  { path: '/processo/:id?', name: 'ProcessoForm', component: ProcessoForm }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
