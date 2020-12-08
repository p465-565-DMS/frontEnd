import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./logo40.png"
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";

function PublicNavBar() {
  const { loginWithRedirect } = useAuth0();
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const history = useHistory();
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="fixed-top bg-danger" expand="lg">
              <Container>
                <div className="navbar-translate">
                  <NavbarBrand
                    href="#pablo"
                    onClick={() => history.push(window.location.origin)}
                  >
                    {<img src = {logo}/>} 
                  </NavbarBrand>
                  <button
                    onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setCollapseOpen(!collapseOpen);
                    }}
                    aria-expanded={collapseOpen}
                    className="navbar-toggler"
                    type="button"
                  >
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
                <Collapse isOpen={collapseOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem >
                      <NavLink
                        href="#pablo"
                        
                        onClick={() => loginWithRedirect()}
                      >
                        <i className="now-ui-icons users_single-02"></i>
                        <p>Sign In</p>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
    </>
  );
}

export default PublicNavBar;
