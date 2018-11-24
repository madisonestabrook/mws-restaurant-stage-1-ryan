// Creates array of files for later use
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];
let v1;
// Listens for the installation event
self.addEventListener('install', function(e) {
    e.waitUntil( // Uses the waitUntil method to postpone action until after the installation
      caches.open('v1').then(function(cache){ // Uses the caches array and the open method to either create or open a new cache
        return cache.addAll(cacheFiles)
      })
      )
    );
});

// Listens for the fetch event
self.addEventListener('fetch', function(e) {
    e.respondWith(
    // Prevents a default fetch event; instead, the provided promise is used
      caches.match(e.request).then(function(response) {
        // Uses the match method to see if the event request URL already exists and uses the ten method to receive a promise
        if(response) { // Success case: prints a message and returns the response variable
            console.log('Found ', e.request, ' in cache');
            return response;
        }
        else { // Failure case: fetches the request
          console.log('Could not find ', e.request, ' in request, FETCHING');
          return fetch(e.request)
          // Adds the response to the cache for later use
          .then(function(response){
            const clonedResponse = response.clone();
            caches.open('v1').then(function(cache) {
              cache.add(e.request, response);
            });
            return clonedResponse;
          })
          .catch(function(err) {
            console.log(err);
          });
}
      })
    )});
