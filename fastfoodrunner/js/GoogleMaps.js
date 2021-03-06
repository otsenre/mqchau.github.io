// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.

var map;

function initialize() {
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
    getPlaces(pos);
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}
function currentLocation(position) {
    $wait.fadeIn(), $locationBar.fadeOut();
    var latitude = position.coords.latitude, longitude = position.coords.longitude;
    currentlatlng = new google.maps.LatLng(latitude, longitude), console.log("current position is: " + currentlatlng), getPlaces(currentlatlng)
}
function getPlaces(currentlatlng) {
    userLoc = currentlatlng, homeMarker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: currentlatlng,
        icon: homeIcon
    });
    var requestBar = {
        location: currentlatlng,
        radius: 1e3,
        keyword: "taco bell"
    };
    service.search(requestBar, storeRequestBar)
}
function storeRequestBar(request) {
    barResultsStore = request;
    var requestPub = {
        location: currentlatlng,
        radius: 1e3,
        keyword: "restaurant"
    };
    service.search(requestPub, storeRequestPub)
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);