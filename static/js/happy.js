// import { setCookie } from "./cookie.js";
import Cookies from 'js-cookie'

const form = document.querySelector('form');
const userInput = document.querySelector('#userInput');
const botResponse = document.querySelector('#botResponse');

var placesAddressArray = new Array;

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
      console.log(data.results[0].formatted_address);
      // locations.push(data.results[0].geometry.location);
      // console.log(locations);
      return data.results[0].formatted_address;
    }));
    console.log(home);
    return home;
  })
  .then(locs => {
    // console.log(locs);
    placesAddressArray = locs;
    console.log(placesAddressArray);
    // setCookie("placesAddressArray", "test cookie", 10);
    Cookies.set("placesAddressArray", "test cookie");
  })
  .catch(error => console.error(error));
});
async function wait(sec) {
  let start = Date.now(), now = start;
  while (now - start < sec) {
      now = Date.now();
  }
}