import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavBar from "./private";
import PublicNavBar from "./public";
//import navCss from "../css/nav-bar.css"
//import hermesLogo from "../img/logo.png"

 const AuthNav = () => {
    const { isAuthenticated } = useAuth0();
  
    return (
      <div>
        {isAuthenticated ? <PrivateNavBar /> : <PublicNavBar />}
      </div>
    );
  };
  
  const NavBar = () => {
    return (
    //   <Navbar expand="md" className='navbar'>
    //     <Container>
    //       <img className="app-logo" src={hermesLogo} alt="React logo" width="50"/>
    //       <Navbar.Brand as={RouterNavLink} className="logo" to="/"/>
    //       <MainNav/>
    //       <AuthNav />
    //     </Container>
    //   </Navbar>
    <AuthNav/>
    );
  };
  
  export default NavBar;