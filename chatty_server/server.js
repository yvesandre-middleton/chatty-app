// server.js

const express = require('express')
const WebSocket = require('ws')
const SocketServer = require('ws').Server
const uuid = require("uuid/v4")
const htmlColors = require('html-colors')
const queryString = require('querystring')
const fetch = require('node-fetch')

// Set the port to 3001
const PORT = 3001

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`))

// Create the WebSockets server
const wss = new SocketServer({ server })

// Set empty variable to hold colour globally
let colour

// Broadcast to all.
wss.broadcast = function broadcast(user) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(user))
  })
}

// Set global variables to hold user count total
let userCount = 0
let userTotal = {
    type: 'userTotal',
}

// Fetches images and gifs and broadcasts message
function dealWithMesage(message) {
    let aMessage = JSON.parse(message)
        aMessage.id = uuid()
        // aMessage.colour = colour
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
        aMessage.content = `<img style="width:40%height:50%" src="${json.data.image_url}" alt=""/>`
        wss.broadcast(aMessage)
      })
    } else if (matches = aMessage.content.match(/\.jpg$|\.gif$|\.png$/)) {
      aMessage.content = `<img style="width:40%height:50%" src="${aMessage.content}" alt=""/>`
      wss.broadcast(aMessage)
    } else {
        wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(aMessage))
        })
    }
}

// Broadcasts user total amount to NavBar
wss.on('connection', (ws) => {
  colour = htmlColors.random()
  ws.send(JSON.stringify({
    colour: colour,
    type: "randomColour"
  }))
  userCount++
  userTotal.amount = userCount
  wss.broadcast(userTotal)

ws.on('message', dealWithMesage)
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      userCount--
      userTotal.amount = userCount
      wss.broadcast(userTotal)
  })
})
