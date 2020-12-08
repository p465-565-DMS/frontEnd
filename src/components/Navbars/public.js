import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout-button";
import LoginButton from "./login-button";

import navCss from "../../css/nav-bar.css"
import hermesLogo from "../../img/logo.png"

const MainNav = () => (
    <Nav className="mainnav">
      <Nav.Link className="navItem"
        as={RouterNavLink}
        to="/"
        exact
        activeClassName="router-link-exact-active"
      >
        <h6>Home</h6>
      </Nav.Link>
      <Nav.Link className="navItem"
        as={RouterNavLink}
        to="/maps"
        exact
        activeClassName="router-link-exact-active"
      >
        <h6>Map</h6>
      </Nav.Link>
    </Nav>
  );
  
  const PublicNavBar = () => {
    return (
      <Navbar expand="md" className='navbar'>
        <Container>
          <img className="app-logo" src={hermesLogo} alt="React logo" width="50"/>
          <Navbar.Brand as={RouterNavLink} className="logo" to="/"/>
          <MainNav/>
          <LoginButton/>
        </Container>
      </Navbar>
    );
  };
  
  export default PublicNavBar;