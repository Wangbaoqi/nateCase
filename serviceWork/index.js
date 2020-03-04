console.log(self);

var VERSION = 'V1'


// 缓存
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((cache) => {
      return cache.addAll([
        './index.html',
        '../static/1.jpg'
      ])
    })
  )
})

// 缓存更新

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cn) => {
          if(cn != VERSION) {
            return caches.delete(cn)
          }
        })
      )
    })
  )
})

// 捕获请求并返回缓存数据

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open(VERSION).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('../static/1.jpg');
  }));
})