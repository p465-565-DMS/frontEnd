/*eslint-disable*/
import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
            <Link to='/index' > Hermes Delivery Hub </Link> 
            </li>
            <li>
            <Link to='/about' > About Us </Link>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          {new Date().getFullYear()}, Team 06,
            Hermes Delivery Hub.
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
