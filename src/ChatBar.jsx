import React, {Component} from 'react';
import MessageList from './MessageList.jsx';

class ChatBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.currentUser,
      message: ''
    }
  }

  _usernameChanged = e => {
    console.log("state from username", this.state)
    let oldUsername = this.state.username
    this.setState(
      { newUsername: e.target.value,
        username: oldUsername
     });
  };

  _messageChanged = e => {
    console.log("state from message", this.state)
    let username = this.state.newUsername
    this.setState({ message: e.target.value, username: username });
  };

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer className="chatbar">
        <input  className="chatbar-username"
                placeholder="Your Name (Optional)"
                defaultValue={this.props.currentUser.name}
                onChange={this._usernameChanged}
                onKeyPress={e => {
                 if (e.key === 'Enter') {
                    this._changeUsername(e.target.value);
                  }
                }}/>
        <input  className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this._messageChanged}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this._submitQuery();
              this._clearInput(e);
            }
          }}
        />
      {/*<button onClick = {this.inputText.bind(this)}></button>*/}
      </footer>
    );
  }

  _changeUsername= (user) => {
    let oldUsername = this.state.username
    this.setState({ username: user })
    this.props.onSubmit(
      {
        type: 'postNotification',
        content: `${oldUsername} changed their name to ${user}`
      }
    );
  }


  _submitQuery = () => {
    this.props.onSubmit(
      {
        type: 'postMessage',
        content: this.state.message,
        username: this.state.username
      }
    );
  }

  _clearInput = (e) => {
    this.setState({ message: '' });
    e.target.value = ''
  }

};

export default ChatBar;