(function() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        // Registration was successful
        console.log('Service Worker registered');
      }, function(err) {
        // registration failed :(
        console.log('Service Worker registration failed: ', err);
      });
    });
  }
})();