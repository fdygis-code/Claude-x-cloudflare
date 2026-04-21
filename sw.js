self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

importScripts('/scramjet/scramjet.bundle.js');

let sw;

if (typeof ScramjetServiceWorker !== 'undefined') {
    sw = new ScramjetServiceWorker();
} else if (typeof __scramjet$bundle !== 'undefined') {
    sw = new __scramjet$bundle.ScramjetServiceWorker();
} else {
    const key = Object.keys(self).find(k => k.includes('scramjet'));
    if (key) sw = new self[key].ScramjetServiceWorker();
}

self.addEventListener('fetch', event => {
    if (sw && sw.route(event)) {
        event.respondWith(sw.fetch(event));
    }
});
