import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentUser: {name: "Bob"},
        messages: [] // messages coming from the server will be stored here as they arrive
      };
  }

  // inputText = (message) => {
  //   this.setState({
  //     messages: this.state.messages.concat([{
  //       username: message.username,
  //       content: message.content
  //     }])
  //   })
  // }

inputText = (message) => {
    var msg = {
      username: message.username,
      content: message.content
    };
    console.log(msg);
    this.webSocket.send(JSON.stringify(msg));

}


  componentDidMount() {

   this.webSocket = new WebSocket("ws://localhost:3001");

    this.webSocket.onmessage = (event) => {
    console.log("imcoming message:", event);
    var msg = JSON.parse(event.data);
    console.log("incoming message also:", msg);
  // code to handle incoming message
      this.setState({
      messages: this.state.messages.concat([msg])
      })
    }
    window.mySocket = this.webSocket;
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} messages={this.state.messages} onSubmit={this.inputText}/>
      </div>
    );
  }
}
export default App;



// import React, {Component} from 'react';
// import ChatBar from './ChatBar.jsx';

// class App extends Component {
//   render() {
//     return (
//       <main>
//         <ChatBar></ChatBar>
//       </main>
//     );
//   }
// }
// export default App;
