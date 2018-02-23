import React, {Component} from 'react'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'


// Sets original state before server sends data to change and update it
class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        currentUser: '',
        messages: [], // messages coming from the server will be stored here as they arrive
        colour: ''
      }
  }

// Functions helps build object that is sent when state changes with data from server
inputText = (message) => {
    var msg = {
      username: message.username,
      content: message.content,
      type: message.type,
      colour: this.state.colour
    }
    this.webSocket.send(JSON.stringify(msg))

}

// Switch changes state set on types and data received from server
componentDidMount() {


 this.webSocket = new WebSocket("ws://localhost:3001")

  this.webSocket.onmessage = (event) => {


  var msg = JSON.parse(event.data)

  switch(msg.type) {
    case "userTotal":
      // handle incoming message
      this.setState({
        name: msg.amount
      })
      break
    case "postMessage":
      this.setState({
      messages: this.state.messages.concat([msg])
      })
      console.log("current state:", this.state)
      // handle incoming notification
      break
      case "postNotification":
        this.setState({
        messages: this.state.messages.concat([msg])
        })
        break
      case "randomColour":
        this.setState ({
        colour: msg.colour
        })
        break
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + msg.type)
  }
  }
  window.mySocket = this.webSocket
}

  // This renders on the page the changed state using the other components as a guide
  render() {
    return (
      <div>
        <NavBar name={this.state.name}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} messages={this.state.messages} onSubmit={this.inputText}/>
      </div>
    )
  }
}
export default App
