import React, {Component} from 'react';


class NavBar extends Component {
  render() {
    // console.log(this.props);
    console.log("Rendering <NavBar/>");
    return (
       <nav className="navbar">
          <a href="/" className="navbar-brand"> - CHATTY - </a>
          <p className="user-counter">{this.props.name} user(s) online</p>
        </nav>
    );
  }
}

export default NavBar;