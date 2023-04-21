function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 35.016885, lng: 126.803689 }
    });
  
    directionsRenderer.setMap(map);
  
    // const onChangeHandler = function () {
    //     calculateAndDisplayRoute(directionsService, directionsRenderer);
    // };
  
    // document.getElementById("start").addEventListener("change", onChangeHandler);
    // document.getElementById("end").addEventListener("change", onChangeHandler);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
}
  
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    // const {Place} = await google.map.importLibrary("places");

    routeRequest = {
        origin: "대한민국 전라남도 나주시 혁신로 200",
        
        destination: "대한민국 전라북도 전주시 완산구 호암로 41",
        // DRIVING, WALKING, BICYCLING은 안되고 TRANSIT만 가능!!!!!
        travelMode: google.maps.TravelMode.TRANSIT,
    };

    // const response = directionsService.route(routeRequest);
    directionsService.route(routeRequest)
        .then((response) => {
            // directionsRenderer.setDirections(response);
            console.log(response.routes[0].legs[0].duration.value);
            // console.log(response);
        })
        .catch((e) => console.log("failed to find time info"));

    // console.log(response);
}

window.initMap = initMap;