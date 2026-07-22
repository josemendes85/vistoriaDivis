import { createRouter, createWebHashHistory } from 'vue-router';
import ProcessosDashboard from '@/features/vistoria/views/ProcessosDashboard.vue';
import ProcessoForm from '@/features/vistoria/views/ProcessoForm.vue';
import ChecklistView from '@/features/checklist/views/ChecklistView.vue';
import SobreView from '@/features/sobre/views/SobreView.vue';
import LinksView from '@/features/links/views/LinksView.vue';
import BackupView from '@/features/backup/views/BackupView.vue';

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
