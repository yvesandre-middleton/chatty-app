import React, {Component} from 'react'

// Receives messages and username from server and passes on to MessageList component
// Also helps display images/gifs and change colour of username
class Message extends Component {
  render() {

    const { message } = this.props

    if (message.type === 'postNotification') {
      return (
        <div className="message system">
        { message.content }
        </div>
        )
    } else {
      let spanStyle = {
        color: this.props.colour
      }
       return (
      <div className="message">
        <span className="message-username" style={spanStyle} >{ message.username }</span>
        <span className="message-content" dangerouslySetInnerHTML={{ __html: message.content }}></span>
      </div>
      )
    }
  }
}
export default Message