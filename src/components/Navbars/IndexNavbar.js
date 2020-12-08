import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavBar from "./PrivateNavbar";
import PublicNavBar from "./PublicNavbar";
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

export default function IndexNavbar() {
  const { isAuthenticated } = useAuth0();
  useEffect(() => {
    console.log(isAuthenticated)
  });
  return (
    <div>
      {isAuthenticated ? <PrivateNavBar /> : <PublicNavBar />}
    </div>
  );
};

// function IndexNavbar() {
//   const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
//   const [collapseOpen, setCollapseOpen] = React.useState(false);
//   React.useEffect(() => {
//     const updateNavbarColor = () => {
//       if (
//         document.documentElement.scrollTop > 399 ||
//         document.body.scrollTop > 399
//       ) {
//         setNavbarColor("");
//       } else if (
//         document.documentElement.scrollTop < 400 ||
//         document.body.scrollTop < 400
//       ) {
//         setNavbarColor("navbar-transparent");
//       }
//     };
//     window.addEventListener("scroll", updateNavbarColor);
//     return function cleanup() {
//       window.removeEventListener("scroll", updateNavbarColor);
//     };
//   });
//   return (
//     <>
//       {collapseOpen ? (
//         <div
//           id="bodyClick"
//           onClick={() => {
//             document.documentElement.classList.toggle("nav-open");
//             setCollapseOpen(false);
//           }}
//         />
//       ) : null}
//       <Navbar className="fixed-top bg-primary" expand="lg">
//               <Container>
//                 <div className="navbar-translate">
//                   <NavbarBrand
//                     href="#pablo"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     Primary color
//                   </NavbarBrand>
//                   <button
//                     onClick={() => {
//                       document.documentElement.classList.toggle("nav-open");
//                       setCollapseOpen(!collapseOpen);
//                     }}
//                     aria-expanded={collapseOpen}
//                     className="navbar-toggler"
//                     type="button"
//                   >
//                     <span className="navbar-toggler-bar bar1"></span>
//                     <span className="navbar-toggler-bar bar2"></span>
//                     <span className="navbar-toggler-bar bar3"></span>
//                   </button>
//                 </div>
//                 <Collapse isOpen={collapseOpen} navbar>
//                   <Nav className="ml-auto" navbar>
//                     <NavItem className="active">
//                       <NavLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="now-ui-icons objects_globe"></i>
//                         <p>Discover</p>
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="now-ui-icons users_circle-08"></i>
//                         <p>Profile</p>
//                       </NavLink>
//                     </NavItem>
//                     <NavItem>
//                       <NavLink
//                         href="#pablo"
//                         onClick={(e) => e.preventDefault()}
//                       >
//                         <i className="now-ui-icons ui-1_settings-gear-63"></i>
//                         <p>Settings</p>
//                       </NavLink>
//                     </NavItem>
//                   </Nav>
//                 </Collapse>
//               </Container>
//             </Navbar>
//     </>
//   );
// }

// export default IndexNavbar;
