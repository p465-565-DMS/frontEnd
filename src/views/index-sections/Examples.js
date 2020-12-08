import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components

function Examples() {
  return (
    <>
      <div className="section section-examples" data-background-color="black">
        <div className="space-50"></div>
        <Container>
          <Row>
            <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/img/delivery.gif")}
                  style={{width:"300px",margin:"10px"}}
                ></img>
            
            <div className="col">
                <h3>
                Services
                </h3>
              <p>Hermes is a website for customers to choose a delivery service from a wide variety of services (UPS, USPS, FedEx etc.). This is a one-stop-shop for customers and business owners to get items delivered across the globe and the website helps them with the best possible quote.</p>
            </div>
          </Row>
          <Row>
            <img
                  alt="..."
                  className="img-raised"
                  src={require("../../assets/img/shipping.jpg")}
                  style={{width:"300px", margin:"10px"}}
                ></img>
        
            <div className="col">
               
              <h3>
                  Work With Hermes
                </h3>
                <p>Hermes is a website for customers to choose a delivery service from a wide variety of services (UPS, USPS, FedEx etc.). This is a one-stop-shop for customers and business owners to get items delivered across the globe and the website helps them with the best possible quote.</p>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Examples;
