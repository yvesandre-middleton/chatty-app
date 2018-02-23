import React, {Component} from 'react'
import MessageList from './MessageList.jsx'

// Constructor sets state in this component to help store username and message
class ChatBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: this.props.currentUser,
      message: ''
    }
  }

  _usernameChanged = e => {
    let oldUsername = this.state.username
    this.setState(
      { newUsername: e.target.value,
        username: oldUsername
     })
  }

  _messageChanged = e => {
    let username = this.state.newUsername
    this.setState({ message: e.target.value, username: username })
  }
  // Renders message and notification that user changed when enter clicked in each input
  render() {
    return (
      <footer className="chatbar">
        <input  className="chatbar-username"
                placeholder="Your Name (Optional)"
                defaultValue={this.props.currentUser.name}
                onChange={this._usernameChanged}
                onKeyPress={e => {
                 if (e.key === 'Enter') {
                    this._changeUsername(e.target.value)
                  }
                }}/>
        <input  className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this._messageChanged}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              if (!this.state.message) {
                e.preventDefault()
              } else {
                this._submitQuery()
                this._clearInput(e)
              }
            }
          }}
        />
      </footer>
    )
  }

  // Function to help submit and show notification that old username switched to new one
  _changeUsername= (user) => {
    let oldUsername = this.state.username
    this.setState({ username: user })
    this.props.onSubmit(
      {
        type: 'postNotification',
        content: `${oldUsername} changed their name to ${user}`
      }
    )
  }

  // Function submits message
  _submitQuery = () => {
    this.props.onSubmit(
      {
        type: 'postMessage',
        content: this.state.message,
        username: this.state.username
      }
    )
  }

  // Functions clears input after message is submitted
  _clearInput = (e) => {
    this.setState({ message: '' })
    e.target.value = ''
  }

}

export default ChatBar