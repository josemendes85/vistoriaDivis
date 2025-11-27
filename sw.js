// 1. ATUALIZE A VERSÃO DO CACHE A CADA ALTERAÇÃO DE ARQUIVO
// Mude esta string a cada vez que você fizer uma alteração nos arquivos cacheados.
const CACHE_NAME = 'v8';

// Lista completa de arquivos para pré-cache, incluindo suas dependências
const urlsToCache = [
  './',
  './index.html',
  './processo.html',
  './cl_index.html',           // Novo link do menu
  './coordenada_index.html',   // Novo link do menu
  './manifest.json',
  './sw.js',
  './style.css',               // Arquivo CSS local (se existir)
  './icons/icon_192x192.png',
  './icons/icon_512x512.png',
  // Adicionando as dependências externas para garantir o funcionamento offline
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

self.addEventListener('install', function(event) {
  // O 'skipWaiting()' força o novo Service Worker a ativar imediatamente
  // sem precisar fechar todas as abas. Isso é ótimo para desenvolvimento.
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache ' + CACHE_NAME + ' aberto e pré-cache iniciado.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME]; 

  event.waitUntil(
    // 2. Lógica para DELETAR todos os caches antigos que não estão na lista branca
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deletando cache antigo: ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // O 'clients.claim()' garante que o novo Service Worker controle imediatamente 
  // as páginas que o registraram.
  return self.clients.claim(); 
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Estratégia Cache-First: retorna a resposta do cache se existir
        return response || fetch(event.request);
      })
  );
});