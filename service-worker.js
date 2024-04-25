var cacheName = 'SafeZone'

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                'index.html',
                'form.html',
                
                './assets/css/main.css',
                '/assets/js/map.js',

                './images/icon_lista.png',
                './images/icon_pindrop.png',
                './images/iconpin.png',

                'safezone.json'
                

    

            ]))
    );
});


self.addEventListener('message', function(event){
    if(event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', function (event){
    event.repondWith(async function(){
        try {
            return await fetch(event.request);
        } catch (err){
            return caches.match(event.request);
        }   
    }());

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if(response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});





