self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

importScripts('/scramjet/scramjet.bundle.js');

// Log everything scramjet exposes in SW context
const keys = Object.keys(self).filter(k => k.toLowerCase().includes('scramjet'));
console.log('Scramjet keys in SW:', keys);
keys.forEach(k => console.log(k, typeof self[k]));

self.addEventListener('fetch', event => {});
