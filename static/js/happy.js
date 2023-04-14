const form = document.querySelector('form');
const userInput = document.querySelector('#userInput');
const botResponse = document.querySelector('#botResponse');

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
  })
  .catch(error => console.error(error));
});
