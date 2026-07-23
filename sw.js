/* Service worker de Franja.
   Estrategia: la app es un archivo estático, así que se sirve de caché al instante y se
   refresca por detrás (stale-while-revalidate). Lo que va al proxy NO se cachea nunca:
   son precios, y un precio viejo servido desde caché es mentira. */

const VERSION = 'franja-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;        // proxy y terceros: siempre a la red

  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(res => {
        if (res && res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit);                            // sin red: lo que hubiera en caché
      return hit || red;
    })
  );
});
