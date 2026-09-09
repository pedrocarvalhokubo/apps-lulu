const CACHE_NAME = "lulu-studies-v4";
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const appUrl = (path) => `${BASE}/${path.replace(/^\//, "")}`;
const APP_SHELL = [
  appUrl(""),
  appUrl("manifest.webmanifest"),
  appUrl("icons/app-icon.svg"),
  appUrl("icons/icon-192.png"),
  appUrl("icons/icon-512.png"),
  appUrl("icons/apple-touch-icon.png")
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(appUrl(""), copy));
      return response;
    }).catch(() => caches.match(appUrl(""))));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
