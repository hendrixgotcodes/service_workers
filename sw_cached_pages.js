const cacheName = 'v1'

const cacheAssets = [
    'index.html',
    'about.html',
    '/css/style.css',
    '/js/main.js'
]

self.addEventListener("install", (evt)=>{

    console.log("service worker installed");

    evt.waitUntil(
        caches.open(cacheName)
        .then((cache)=>{
            console.log("caching files...");
            cache.addAll(cacheAssets)
        })
        .then(()=>self.skipWaiting())
    )

})


self.addEventListener("activate", (evt)=>{

    console.log("service worker activated");

    evt.waitUntil(
        caches.keys()
        .then((cacheNames)=>{

            return Promise.all(
                cacheNames.map(cache => {

                    if(cache !== cacheName){
                        console.log("service worket: clearing old cache");
                    }
                    return caches.delete(cache)
                })
            )

        })
    )

})

self.addEventListener("fetch", (evt)=>{

    console.log("fetching....");

    evt.respondWith(
        fetch(evt.request)
            .catch(()=>{
                caches.match(evt.request)
            })
    )

})