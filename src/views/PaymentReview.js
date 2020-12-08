import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchLocationInput from '../components/googleAutocomplete/SearchLocationInput';
import { usePaymentInputs } from 'react-payment-inputs';
import { Redirect, useHistory } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    CardText,
    FormGroup,
    CardBody,
    Alert,
    Container,
    Input,
    Row,
    Col,
    Button,
    Collapse,
    Label,
    Modal,
   ModalBody,
  } from "reactstrap";
// reactstrap components
import Divider from '@material-ui/core/Divider';

// core components

export default function PaymentReview() {
  const history = useHistory();
  const { user } = useAuth0();
  const [modal1, setModal1] = React.useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { getAccessTokenSilently } = useAuth0();
  const { email, nickname } = user;
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const deadline = localStorage.getItem("deliveryDate");
  const orderInfo = localStorage.getItem("orderInfo");
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
  let order = JSON.parse(orderInfo);
  let pageHeader = React.createRef();
  const crypto = require("crypto");
  let trackingid = crypto.randomBytes(16).toString("hex");

  console.log(deadline);
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      setUserid(res[0].userid);
    } catch{}
  })();
},[user]);

  const callSecureApi = async (orderDetails)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/api/placeOrder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: orderDetails,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      console.log("SUCCESSS");
    }
  });
};

  const placeOrder = () => {
    let streetAddress = localStorage.getItem("streetAddress");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    let googleMapLink = localStorage.getItem("googleMapLink");
    let lat = localStorage.getItem("lat");
    let lng = localStorage.getItem("lng");
    let source = order.source;
    let date = deadline;
    let adminid = order.adminid;
    let price = order.price;
    
    let orderDetails = JSON.stringify({
      adminid,
      userid,
      price,
      trackingid,
      packagesource: source,
      packagedestination: streetAddress,
      packagelocation: googleMapLink,
      packagespeed: order.pspeed,
      packagetype: order.ptype,
      packagesize: order.psize,
      packageweight: order.pweight,
      deadline: date,
      long: lng,
      lat
    });
    callSecureApi(orderDetails);
    };

    const handelSubmit = () => {
      placeOrder();
      history.push(window.location.origin);
      setModal1(true);
    }
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../assets/img/pay.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand" style={{top: "200%"}}>
            <img
              alt="..."
              className="n-logo"
              src={require("../img/logo.png")}
            ></img>
            <h1 className="h1-seo">Review And Pay</h1>
            {/* <h3>We deliver for your need</h3> */}
          </div>
        </Container>
      </div>
      
      <Container className="content mt-5 pt-5">
        <Row>
            <Col xs="8">
                <Container className="d-flex flex-column">
                    <Card style = {{fontSize : "12px", marginRight: "20px"}}>
                        <div style = {{backgroundColor:"#ef8157"}}>
                        <CardTitle style={{marginLeft: "32%"}} tag="h3">Shipping Details</CardTitle>  
                        <CardBody style={{backgroundColor: "whitesmoke"}}>
                            <CardText>
                            <div className="content text-left">
                            <form>
                                <Row>
                                    <Col className="pr-1" md="4">
                                        <FormGroup>
                                        <label><i class="now-ui-icons users_circle-08"></i> Name</label>
                                        <Input
                                            required
                                            placeholder="Full Name"
                                            type="text"
                                            onChange={e => setName(e.target.value)}
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-1" md="8">
                                        <FormGroup>
                                        <label><i class="now-ui-icons shopping_shop"></i> Shipping Address</label>
                                        <SearchLocationInput required 
                                        />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <p><i class="now-ui-icons ui-2_time-alarm"></i><label> Estimate Delivery By:</label> {deadline}</p>
                                <p><i class="now-ui-icons shopping_delivery-fast"></i><label> Selected Delivery Method:</label> {order.pspeed}</p>
                                <p><i class="now-ui-icons shopping_tag-content"></i><label> Package Content: </label> {order.ptype}</p>
                                <p><i class="now-ui-icons shopping_basket"></i><label> Package Weight: </label> {order.pweight}</p>
                                <p><i class="now-ui-icons design-2_ruler-pencil"></i><label> Package Size: </label> {order.psize}</p>
                            </form>
                            </div>
                            </CardText>
                        </CardBody>
                        </div>
                    </Card>
                    <Divider variant="middle"/>
                </Container>
                <Container className="d-flex flex-column">
                    <Card style = {{fontSize : "12px", marginRight: "20px"}}>
                        <div style = {{backgroundColor:"#ef8157"}}>
                        <CardTitle style={{marginLeft: "32%"}} tag="h3">Payment Method</CardTitle>  
                        <CardBody style={{backgroundColor: "whitesmoke"}}>
                            <CardText>
                            <div className="content text-left">
                             <div>
                                <Row>
                                    <Col className="pr-1" md="8">
                                        <FormGroup>
                                        <label>Card Number</label>
                                        <div>
                                            <input style={{width: "80%"}} {...getCardNumberProps()} />
                                        </div>
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-1" md="4">
                                        <FormGroup>
                                        <label>Card Expiry</label>
                                        <div>
                                            <input style={{width: "80%"}} {...getExpiryDateProps()} />
                                        </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pr-1" md="3">
                                        <FormGroup>
                                        <label>Security Code</label>
                                        <div>
                                            <input style={{width: "80%"}} {...getCVCProps()} />
                                        </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                             </div>
                            </div>
                            </CardText>
                        </CardBody>
                        </div>
                    </Card>
                    <Divider variant="middle"/>
                </Container>
            </Col>
            <Col xs="4">
                <Container className="d-flex flex-column" style={{alignItems:"flex-end"}}>
                    <Card style = {{fontSize : "11px", width:"80%"}}>
                        <div style = {{backgroundColor:"#ef8157"}}>
                        <CardTitle style={{marginLeft: "12%"}} tag="h5">Order Summary</CardTitle>  
                        <CardBody style={{backgroundColor: "whitesmoke"}}>
                            <CardText>
                            <div className="content text-left">
                                <p><i class="now-ui-icons users_circle-08"></i> Name: {name}</p>
                                <p><i class="now-ui-icons shopping_shop"></i> Address: {order.source}</p>
                                <p><i class="now-ui-icons business_money-coins"></i> Order Total: {order.price}</p>
                            </div>
                            </CardText>
                            <Button color="success" size="lg" onClick={() => handelSubmit()}>
                                    Confirm and Pay
                            </Button>
                            <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                              {/* <div className="modal-header justify-content-center">
                              </div> */}
                              <ModalBody>
                                <p>
                                  Order Placed Successfully!
                                </p>
                                <p>Tracking Id: {trackingid}</p>
                              </ModalBody>
                              <div className="modal-footer">
                                <Button
                                  color="danger"
                                  type="button"
                                  onClick={() => setModal1(false)}
                                >
                                  Close
                                </Button>
                              </div>
                            </Modal>
                        </CardBody>
                        </div>
                    </Card>
                    <Divider variant="middle"/>
                </Container>
            </Col>
        </Row>
    </Container>
    </>
  );
}