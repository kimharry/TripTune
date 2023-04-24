// import { getCookie } from "./js/cookie.js"
import Cookies from 'js-cookie'

const getPermutations = function (arr, selectNumber=2) {
    const tempOrigin = arr.shift();
    const tempDestination = arr.pop();

    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]); 
    // n개중에서 1개 선택할 때(nP1), 바로 모든 배열의 원소 return. 1개선택이므로 순서가 의미없음.

    arr.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index+1)] 
      // 해당하는 fixed를 제외한 나머지 배열 
      const permutations = getPermutations(rest, selectNumber - 1); 
      // 나머지에 대해서 순열을 구한다.
      const attached = permutations.map((el) => [fixed, ...el]); 
      //  돌아온 순열에 떼 놓은(fixed) 값 붙이기
      results.push(...attached); 
      // 배열 spread syntax 로 모두다 push
    });

    results.push(tempDestination);
    results.unshift(tempOrigin);

    return results; // 결과 담긴 results return
}

// function initMap() {
//     // const directionsService = new google.maps.DirectionsService();
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 15,
//         center: { lat: 35.016885, lng: 126.803689 }
//     });
  
//     directionsRenderer.setMap(map);

//     calculateAndDisplayRoute();
// }

function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 35.016885, lng: 126.803689 }
    });
    directionsRenderer.setMap(map);
    console.log(Cookies.get("placesAddressArray"));
}

function calculateAndDisplayRoute(
    directionsService=new google.maps.DirectionsService(), 
    directionsRenderer=new google.maps.DirectionsRenderer(), 
    placesAddressArray=getCookie("placesAddressArray")) {
    // routeRequest = {
    //     origin: "대한민국 전라남도 나주시 혁신로 200",
    //     destination: "대한민국 전라북도 전주시 완산구 호암로 41",
    //     // DRIVING, WALKING, BICYCLING은 안되고 TRANSIT만 가능!!!!!
    //     travelMode: google.maps.TravelMode.TRANSIT,
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
// main();