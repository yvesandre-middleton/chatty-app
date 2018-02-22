import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message';
import MessageList from './MessageList.jsx';

class MessageList extends Component {
  render() {
    // console.log(this.props);
    console.log("Rendering <NavBar/>");
    return (
      <div className="messages">
        {
          this.props.messages.map( (message) => {
            console.log("id", message.id);
            return <Message message={message} key={message.id} type={ message.type } />
          })
        }
      </div>
    );
  }
}