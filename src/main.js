import { createApp } from 'vue';
import App from './App.vue';
import router from '@/app/router';

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/styles/style.css';

// Bootstrap JavaScript Bundle
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App).use(router).mount('#app');
