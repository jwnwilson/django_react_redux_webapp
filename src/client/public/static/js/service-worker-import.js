self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        console.log('Clearing old service worker cache...');
        console.log(cacheNames);
        var regexExp = /\-(\d+)\-/;
        var cacheNameTimestampMap = {};
        var latestTimestamp = Number.NEGATIVE_INFINITY;
        
        // parse timestamp from cache name map to name
        cacheNames.forEach(function(cacheName) {
          var match = regexExp.exec(cacheName)
          if (match != null) {
            var parsedData = new Date(match[1]*1000);
            if (parsedData > latestTimestamp) {
              latestTimestamp = parsedData;
            }
            return cacheNameTimestampMap[cacheName] = parsedData;
          }
          return cacheNameTimestampMap[cacheName] = Number.NEGATIVE_INFINITY;
        });

        // Delete all older caches
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            if (cacheNameTimestampMap[cacheName] != latestTimestamp ) {
              return true;
            }
          }).map(function(cacheName) {
            console.log('Deleting cache: ' + cacheName);
            return caches.delete(cacheName);
          })
        ).then(function() {
            console.log('Service worker cache cleared.');
        });
      })
    );
  });