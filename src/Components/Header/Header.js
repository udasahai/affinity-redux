import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// class Header extends React.Component {

//     render = () => {
//         const { username, loggedIn } = this.props
//         //console.log(username)
//         let greeting = "Welcome, User"
//         if (loggedIn) {
//             greeting = `Welcome, ${username}`
//         }
//         return (
//             <h1> {greeting} </h1>

//         )
//     }
// }

const redirectButton = (name, route, state) => (
	<LinkContainer
    to={{
      pathname: route,
      state: state,
    }}
  >
    <Nav.Link>{name}</Nav.Link>
  </LinkContainer>
);

const buttonBar = (loggedIn, contact) => (
	<Nav className="mr-auto">
    {redirectButton("Home", "/users", {})}
    {loggedIn
      ? redirectButton("My Profile", "/users/" + contact.userID, contact)
      : redirectButton("Create Profile", "/create", {})}
  </Nav>
);

const Header = (props) => {
	const { contact, loggedIn } = props;
	const username = props.contact.firstName;

	let greeting = "Hello User, Plesae Sign In";

	if (loggedIn) {
		greeting = "Welcome, " + username;
	}

	return (
		<Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <LinkContainer to="/">
        <Navbar.Brand>Affinity@UCLA</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {buttonBar(loggedIn, contact)}
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{greeting}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
	);
};

export default Header;
