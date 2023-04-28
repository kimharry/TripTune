// import * as Cookies from "/node_modules/js-cookie/js-cookie.js"

const form = document.querySelector('form');
const userInput = document.querySelector('#userInput');
const botResponse = document.querySelector('#botResponse');
const apiKey = "AIzaSyDiZ7FXkWXovxE5sPupQjRxLjVVMkk8XEo";

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Get the user's input
  const inputText = userInput.value;
  // Send the user's input to the server to be processed by the chat-bot
  fetch('/processInput', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputText })
  })
  .then(response => response.json())
  .then(data => {
    // Display the chat-bot's response
    botResponse.innerHTML = data.botResponse;
    const loc = data.botResponse.split("#");
    let locations = new Array;
    // console.log(loc);
    const home = Promise.all(loc.map(async(location) => {
       location = location.replace(/ /g,"_");
       console.log(location);
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyCvJXzXweghDtRqsrsi63K0RU17ozkSel4';
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length === 0) {
          throw new Error('Could not find place ID for "${loc}"');
      }
      console.log(data.results[0].place_id);
      // locations.push(data.results[0].geometry.location);
      // console.log(locations);
      return data.results[0];
    }));
    console.log(home);
    return home;
  })
  .then(locs => {
    console.log(locs);
    locs[0] = locs[0].geometry.location.lat + "/" + locs[0].geometry.location.lng;
    locs[1] = locs[1].place_id;
    locs[2] = locs[2].place_id;
    locs[3] = locs[3].place_id;
    Cookies.set("placeIdArray", locs.join("#"), "1");
  })
  .catch(error => console.error(error));
});