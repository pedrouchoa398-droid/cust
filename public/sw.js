self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cust-static-v1').then(function(cache) {
      return cache.addAll(['/', '/index.html', '/src/index.css'])
    })
  )
})

self.addEventListener('fetch', function(event) {
  // network-first for API calls, cache-first for assets
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api') || url.pathname.includes('open-meteo')) {
    event.respondWith(fetch(event.request).catch(()=>caches.match(event.request)))
  } else {
    event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)))
  }
})
