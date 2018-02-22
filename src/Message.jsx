import React, {Component} from 'react';



class Message extends Component {
  render() {
    console.log("Rendering <Message/>");

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
      };
       return (
      <div className="message">
        <span className="message-username" style={spanStyle} >{ message.username }</span>
        <span className="message-content" dangerouslySetInnerHTML={{ __html: message.content }}></span>
      </div>
      )
    }
  }
}
export default Message;