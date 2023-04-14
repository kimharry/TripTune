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
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            // DRIVING, WALKING, BICYCLING은 안되고 TRANSIT만 가능!!!!!
            travelMode: google.maps.TravelMode.TRANSIT,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due"));
}
  
window.initMap = initMap;