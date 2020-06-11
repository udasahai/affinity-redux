import React from "react";
import { Navbar, Nav, Form, Button, FormControl, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from 'react-router-dom'
import './Header.css'


const redirectButton = (name, route, state) => (
	// <LinkContainer
  //   to={{
  //     pathname: route,
  //     state: state,
  //   }}
  // >
  //   <Nav.Link>{name}</Nav.Link>
  // </LinkContainer>
  <NavItem>
    <NavLink 
    className="navLink"
    activeClassName="selected"
    exact to={{
        pathname: route,
        state: state,
      }}
   userInfo={state}> {name} </NavLink>
  </NavItem>
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
	const { contact, loggedIn, givenName } = props;
	const username = props.contact.firstName;
	let greeting = `Hello ${givenName}, Plesae Create or Claim a profile.`;

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
