// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require("uuid/v4");
const htmlColors = require('html-colors');
const queryString = require('querystring');
const fetch = require('node-fetch');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let colour;

// Broadcast to all.
wss.broadcast = function broadcast(user) {
  wss.clients.forEach(function each(client) {
    console.log('hello yves')
    client.send(JSON.stringify(user))
  });
};
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let userCount = 0
let userTotal = {
    type: 'userTotal',
}


function dealWithMesage(message) {
    let aMessage = JSON.parse(message)
        aMessage.id = uuid();
        aMessage.colour = colour;
    if (matches = aMessage.content.match(/^\/giphy (.+)$/)) {
      let QS = queryString.stringify({
        api_key: 'YtDlrOOrKumF3z17hpzPHm1eQkamOAUX',
        tag: matches[1]
      })

      fetch (`https://api.giphy.com/v1/gifs/random?${QS}`)
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          aMessage.content = `<img style="width:40%;height:50%;" src="${json.data.image_url}" alt=""/>`
          wss.broadcast(aMessage)
        })
    } else if (matches = aMessage.content.match(/\.jpg$|\.gif$|\.png$/)) {
      aMessage.content = `<img style="width:40%;height:50%;" src="${aMessage.content}" alt=""/>`
      wss.broadcast(aMessage)
    } else {
      wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(aMessage));
      });
    }
}

wss.on('connection', (ws) => {
  colour = htmlColors.random()
  userCount++
  userTotal.amount = userCount
  console.log('userTotal', userTotal.amount)
  wss.broadcast(userTotal)
  console.log('Client connected');


  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', 'User', JSON.parse(message).username, 'said', JSON.parse(message).content);

  //   // Broadcast to everyone else
  //   wss.clients.forEach(function each(client) {
  //     if (client.readyState === ws.OPEN) {
  //       var aMessage = JSON.parse(message)
  //       aMessage.id = uuid();
  //       aMessage.colour = colour;
  //       client.send(JSON.stringify(aMessage));
  //     }
  //   });
  // })

ws.on('message', dealWithMesage)
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      userCount--
      userTotal.amount = userCount
      console.log("userTotal-:", userTotal.amount)
      wss.broadcast(userTotal)

    // console.log('Client disconnected'));
});
})
