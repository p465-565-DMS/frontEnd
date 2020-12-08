import React from "react";
import { Link, Redirect, useHistory  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./logo40.png"
import { NavLink as RouterNavLink } from "react-router-dom";
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

function PrivateNavBar() {
  const { user, logout } = useAuth0();
  const history = useHistory();
  // const routeUserProfile = () => {
  //   history.push(`/admin/user-page`);
  // };

  const routeUserProfile = () => {
    let role = localStorage.getItem("role");
    console.log(role)
    if (role === "dadmin"){
      let path = `/admin/user-page`;
      history.push(path);
    } else if (role === "driver"){
      let path = `/driver/user-page`;
      history.push(path);
    }
    else if (role === "user"){
      let path = `/user/user-page`;
      history.push(path)
    }  
  };

  const routeIndex = () => {
    history.push(`/index`);
  };
  
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
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
                    <UncontrolledDropdown nav>
                        <DropdownToggle
                          caret
                          color="default"
                          href="#pablo"
                          nav
                          onClick={(e) => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="now-ui-icons ui-1_settings-gear-63"
                          ></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem
                            onClick={routeUserProfile}
                          >
                            Profile
                          </DropdownItem>
                          {/* <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Settings
                          </DropdownItem> */}
                          <DropdownItem
                            href="#pablo"
                            onClick={() =>
                              logout({
                                returnTo: window.location.origin,
                              })
                            }
                          >
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
    </>
  );
}

export default PrivateNavBar;
