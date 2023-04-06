function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: 35.016885, lng: 126.803689 }
    });
  
    directionsRenderer.setMap(map);
  
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
  
    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
  }
  
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // const {Place} = await google.map.importLibrary("places");

    directionsService
      .route({
        origin: {
            // query: document.getElementById("start").value,
            // query: new google.maps.LatLng(35.016885, 126.803689),
            // query: google.maps.places.Place(placeId="ChIJVQ0vecIlcjURRcGMdyMmXR4"),
            // query: { 'placeId': "ChIJVQ0vecIlcjURRcGMdyMmXR4" }
            query: "대한민국 전라남도 나주시 혁신로 200"
        },
        destination: {
            // query: document.getElementById("end").value,
            // query: new google.maps.LatLng(35.022072, 126.784115),
            // query: google.maps.places.Place(placeId="ChIJCZX0VhE7cDUR8qbnrkUSmJY"),
            // query: { 'placeId': "ChIJCZX0VhE7cDUR8qbnrkUSmJY" }
            query: "대한민국 전라북도 전주시 완산구 호암로 41"
        },
        // DRIVING은 안되고 TRANSIT만 가능!!!!!
        travelMode: google.maps.TravelMode.TRANSIT,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }
  
  window.initMap = initMap;