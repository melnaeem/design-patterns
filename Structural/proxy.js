/* 
  The GeoCoder object simulates the Google Maps Geocoding service.
  In geocoding a location provided and it will return its latitude/longitude,
  but it's relatively slow. 
*/
function GeoCoder() {
  this.getLatLng = function (address) {
    switch (address) {
      case "Amsterdam":
        return "52.3700° N, 4.8900° E";
      case "London":
        return "51.5171° N, 0.1062° W";
      case "Paris":
        return "48.8742° N, 2.3470° E";
      case "Berlin":
        return "52.5233° N, 13.4127° E";
      default:
        return "";
    }
  };
}


/* 
  It is known that many repeated requests (for the same location) are coming in. To speed things up
  GeoProxy caches frequently requested locations.
  If a location is not already cached it goes out to the real GeoCoder service and stores the results in cache.
*/
function GeoProxy() {
  var geocoder = new GeoCoder();
  var geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      log.add(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      var count = 0;
      for (var code in geocache) { count++; }
      return count;
    }
  };
};

// The log function is a helper which collects and displays results. 
// could be replaced by ES6 class
var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();

function run() {
  var geo = new GeoProxy();

  // geolocation requests
  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");

  log.add("\nCache size: " + geo.getCount());
  log.show();
}

run();