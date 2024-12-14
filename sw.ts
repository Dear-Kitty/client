/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

const CACHE_NAME = 'cache-v1';

const FILES_TO_CACHE = ['/offline.html', '/icons/favicon.ico'];

console.log('Service worker is running');
declare const self: ServiceWorkerGlobalScope;
self.__WB_DISABLE_DEV_LOGS = true;

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

self.addEventListener('install', async (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE).catch((error) => {
        console.error('Failed to cache files during install:', error);
      });
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (CACHE_NAME !== cache) return caches.delete(cache);
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event:', event.request.url, event.request.mode);
  if ('navigate' !== event.request.mode) return;
  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match('/offline.html');
      return cachedResponse || new Response('Offline page not available', { status: 503 });
    }),
  );
});

self.skipWaiting();
clientsClaim();
