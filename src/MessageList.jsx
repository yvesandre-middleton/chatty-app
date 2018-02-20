import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props);
    console.log("Rendering <MessageList/>");
    return (
      <div className="messages">
        {
          this.props.messages.map( (message) => {
            console.log("id", message.id);
            return <Message message={message} key={message.id}/>
          })
        }
      </div>
    );
  }
}
export default MessageList;