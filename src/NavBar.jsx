import React, {Component} from 'react'

// NavBar component that renders the NavBar at top of page
// Finds amount of users online and renders that in the NavBar
class NavBar extends Component {
  render() {
    return (
       <nav className="navbar">
          <a href="/" className="navbar-brand"> - CHATTY - </a>
          <p className="user-counter">{this.props.name} user(s) online</p>
        </nav>
    )
  }
}

export default NavBar