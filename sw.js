const CACHE_NAME = 'vistorias-divis-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/processo.html',
    '/relatorio.html',
    '/manifest.json',
    '/sw.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://code.jquery.com/jquery-3.7.1.min.js', // Certifique-se de que estes URLs correspondem aos seus arquivos
    'https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js', // Certifique-se de que estes URLs correspondem aos seus arquivos
    // Adicione aqui os URLs dos seus arquivos CSS e JS personalizados
    // Ex: '/css/style.css', '/js/main.js'
    // Adicione aqui os URLs de todos os ícones que você listou no manifest.json
    '/icons/icon_72x72.png',
    '/icons/icon_96x96.png',
    '/icons/icon_128x128.png',
    '/icons/icon_144x144.png',
    '/icons/icon_152x152.png',
    '/icons/icon_192x192.png',
    '/icons/icon_384x384.png',
    '/icons/icon_512x512.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de ativação do Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deletando cache antigo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de fetch (intercepta requisições de rede)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retorna o recurso do cache se encontrado
                if (response) {
                    return response;
                }
                // Caso contrário, busca na rede
                return fetch(event.request).then(
                    (response) => {
                        // Verifica se recebemos uma resposta válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clona a resposta. Uma resposta é um stream e só pode ser consumida uma vez.
                        // Precisamos clonar para que o navegador consuma uma cópia e o cache consuma a outra.
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});