(function() {
if(navigator.onLine) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
          registration.unregister();
      }});
      console.log('Service Worker unregistered');
      navigator.serviceWorker.register('/service-worker.js', {Cache: "max-age=0"}).then(function(registration) {
        // Registration was successful
        console.log('Service Worker registered');
      }, function(err) {
        // registration failed :(
        console.log('Service Worker registration failed: ', err);
      });
    });
  }
}
})();