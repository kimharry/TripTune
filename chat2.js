const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const path = require('path');
const app = express();
const fs = require('fs')
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
app.use(express.static('static'));
require('dotenv').config()

const maxAge = 1000*60*5;

const sessionObj = {
  secret: 'helpme',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({checkPeoriod: maxAge}),
  cookie:{
    maxAge,
  },
};
app.use(session(sessionObj));
// Set up the OpenAI API client
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});
const openaiClient = new OpenAIApi(configuration);
// Use middleware to parse incoming JSON data
app.use(bodyParser.json());

// Route to handle the user's input
app.post('/processInput', (req, res) => {
  // Get the user's input from the request body
  const inputText = req.body.inputText + '. Please extract the places and\
   change the name to official place names so that Google Map API can understand. Seperate each location with #, Just name of a place';
  console.log(inputText)
  // Send the user's input to OpenAI's API for processing
  openaiClient.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: inputText}]
  })
  .then(response => {
    // Extract the chat-bot's response from the OpenAI API response
    const botResponse = response.data.choices[0].message.content;
    console.log(response.data.choices[0].message.content)
    sendans = response.data.choices[0].message.content.split('#');
    console.log(typeof(sendans));
    req.session.location = sendans;
    console.log(req.session)
    req.session.save(()=>{
      console.log("saved");
    });
    res.json({ botResponse });
  })
  .catch(error => {
    console.error(error);
    res.status(500).send('Error processing input');
  });
});

// Start the server
const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));

app.get('/', function(request, response) {
    fs.readFile('./static/main.html', function(err, data){
        if(err) {
            response.send('error')
        } else {
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})