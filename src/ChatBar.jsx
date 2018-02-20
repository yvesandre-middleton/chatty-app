import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class ChatBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.currentUser.name,
      message: ''
    }
  }

  _usernameChanged = e => {
    this.setState({ username: e.target.value });
  };

  _messageChanged = e => {
    this.setState({ message: e.target.value });
  };

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input  className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} onChange={this._usernameChanged}/>
        <input  className="chatbar-message" placeholder="Type a message and hit ENTER"
          onChange={this._messageChanged}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this._submitQuery();
            }
          }}
        />
      {/*<button onClick = {this.inputText.bind(this)}></button>*/}
      </footer>
    );
  }

  _submitQuery = () => {
    this.props.onSubmit(
      {
        content: this.state.message,
        username: this.state.username
      }
    );
  }
};

export default ChatBar;