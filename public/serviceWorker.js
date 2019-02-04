self.addEventListener('install', (event) => {
    console.log('service worker installed');
    event.waitUntil(
        // pre-cache static assets
        caches.open('static')
        .then((cache) => {
            cache.addAll([
                '/',
                '/index.html',
                '/src/js/app.js',
                '/src/js/bootstrap.bundle.min.js',
                '/src/js/jquery-3.3.1.min.js',
                '/src/css/style.css',
                '/src/css/font-awesome.css',
                '/src/css/bootstrap.min.css',
                'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700,900'
            ]);
        })
        .catch(err => {
            console.log(err);
        })
    );
});

self.addEventListener('activate', () => {
    console.log('service worker activated');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((res) => {
            if (res) {
                return res;
            } else {
                return fetch(event.request);
            }
        })
    );
});