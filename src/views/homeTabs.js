import SearchLocationInput1 from '../components/googleAutocomplete/rateAndShipAddress1';
import SearchLocationInput2 from '../components/googleAutocomplete/rateAndShipAddress2';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../components";
import Datetime from "react-datetime";
import StoresNearby from "./StoresNearby.js";
import HomeTracking from "./HomeTracking.js";
// reactstrap components
import {
  Card,
  CardHeader,
  FormGroup,
  CardBody,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  Nav,
  TabContent,
  TabPane,
  Container,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";

function qWrap(liberty, freedom){
  return " AND " + liberty + " = " + "'" + freedom + "'";
}

// core components
function Tabs() {
  const history = useHistory();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [iconPills, setIconPills] = React.useState("1");
  const [date, setDate] = useState("");
  const [deliveryBox, setSpeed] = useState("");
  const [trackId, setTrackId] = useState("");
  const [pills, setPills] = React.useState("1");
  const [modal1, setModal1] = useState(false);
  const [queryValue, setQuery] = React.useState("");
  const ref1 = React.createRef();
  const ref2 = React.createRef();
  const [isLoadingTrue, setLoading] = useState(false);

  const callSecureApi1 = async (payload) => {
    fetch(`${apiUrl}/api/trackPackage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        response.json().then(function(data) {
          localStorage.setItem("trackInfo", data); 
          localStorage.setItem("homeTrackMap", data[0].packagelocation);
          //console.log(data[0].packagelocation);
        });
        setLoading(false);
          //console.log(localStorage.getItem("trackInfo"))
      }
    });
  };

  const sendData = () => {
    let tid = trackId;
    let payload = JSON.stringify({
      trackingid: tid
    });
    console.log(payload)
    callSecureApi1(payload);
    setLoading(true);
  };
  
const callSecureApi = async (query) => {
  fetch(`${apiUrl}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      response.text().then(function(data) {
        localStorage.setItem("result", data); });
        console.log(localStorage.result)
      history.push("/search-result");
    }
  });
};

const hanndleSubmit1 = () => {
  sendData();
  setModal1(true);
}

const handleSubmit = (queryValue) => {
  setLoading("True");

  let query = JSON.stringify({
    queryValue,
  });
  callSecureApi(query);
};

if (isLoadingTrue) {
  return <Loading />;
}

  const CheckButton = () => (
    <Route render={() => (
      <Button
        type='button'
        onClick={() => {
          // history.push('/search-result');
          
          // let dateBox = document.getElementById("dateBox");
          // if(dateBox.value != ''){
            // customQuery += qWrap(dateBox.value);
          // }
          let customQuery = 'SELECT u.address, da.companyname, sd.adminid, sd.pspeed, sd.ptype, sd.psize, sd.pweight, sd.price FROM users u, servicedetails sd, deliveryadmin da WHERE 1=1 AND da.adminid = sd.adminid AND u.userid = da.userid';
          let deliveryBox = document.getElementById("deliverySpeedBox");
          console.log(deliveryBox.value);
          customQuery += qWrap("sd.pspeed", deliveryBox.value);

          let typeBox = document.getElementById("packageTypeBox");
          console.log(typeBox.value);
          customQuery += qWrap("sd.ptype", typeBox.value);

          let sizeBox = document.getElementById("packageSizeBox");
          console.log(sizeBox.value);
          customQuery += qWrap("sd.psize", sizeBox.value);

          let weightBox = document.getElementById("packageWeightBox");
          console.log(weightBox.value)
          customQuery += qWrap("sd.pweight", weightBox.value);
          
          let deadline = date;
          localStorage.setItem("deliveryDate", deadline);

          customQuery += ";";
          handleSubmit(customQuery);

         }}
        aria-label="Check"
        className="mt-5 btn-round"
        size="lg"
      >
        Check
      </Button>
    )} />
  )
  return (
    <>
      <div className="section section-tabs">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="5" xl="7">
              <Card>
                <CardHeader>
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        <i className="now-ui-icons shopping_delivery-fast"></i>
                        Rate & Ship
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("2");
                        }}
                      >
                        <i className="now-ui-icons ui-1_zoom-bold"></i>
                        Track
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={iconPills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setIconPills("3");
                        }}
                      >
                        <i className="now-ui-icons location_pin"></i>
                        Location
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      <p>
                      Find the cheapest way to mail a package.
                      Get prices from multiple carriers:
                      UPS, USPS, FedEx, and DHL.
                      </p>
                      <Row>
                        <Col className="px-5 mt-3" sm="12">
                            <h6 style={{textAlign:"left"}}>From</h6>
                            <SearchLocationInput1 />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-5 mt-3" sm="12">
                          <h6 style={{textAlign:"left"}}>To</h6>
                            <SearchLocationInput2 />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-5 mt-3" sm="6">
                          <h6 style={{textAlign:"left"}}>Date</h6>
                          <Datetime
                            timeFormat={false}
                            inputProps={{ placeholder: "Delivery Date" }}
                            onChange={e => {setDate(e.format("MM/DD/YYYY").toString())}}
                            />
                        </Col>
                        <Col className="px-5 mt-3" sm="6">
                          <h6 style={{textAlign:"left"}}>Delivery Speed</h6>
                          <Input type="select" name="select" id="deliverySpeedBox">
                            <option value="Regular">Regular(~7 Business Days)</option>
                            <option value="Express">Express(~3 Business Days)</option>
                          </Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package type</h6>
                          <Input type="select" name="select" id="packageTypeBox">
                            <option>General</option>
                            <option>Electronics</option>
                            <option>Food</option>
                            <option>Documents</option>
                            <option>Others</option>
                          </Input>
                        </Col>
                        <Col className="px-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package size</h6>
                          <Input type="select" name="select" id="packageSizeBox">
                            <option value="Small">Small(~8"x8"x8")</option>
                            <option value="Medium">Medium(~16"x16"x16")</option>
                            <option value="Large">Large(~26"x26"x26")</option>
                          </Input>
                        </Col>
                        <Col className="pr-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package weight</h6>
                          <Input type="select" name="select" id="packageWeightBox">
                            <option value="Light">Light(~1 lb - 10 lb)</option>
                            <option value="Medium">Medium(~10 lb - 25 lb)</option>
                            <option value="Heavy">Heavy(~25 lb+)</option>
                          </Input>
                        </Col>
                      </Row>
                      <CheckButton/>
                    </TabPane>
                    <TabPane tabId="iconPills2">
                      <p>
                      Track any package, freight and shipment.
                      To find out where your parcel is, you need to know only
                      tracking number of your package.
                      </p>
                      <Col sm="12">
                        <FormGroup>
                          <Input
                            defaultValue=""
                            placeholder="Tracking ID"
                            type="text"
                            onChange={e => setTrackId(e.target.value)}
                          ></Input>
                          <Button className="btn-round" type="button" onClick = {() => hanndleSubmit1()}>
                            Track
                        </Button>
                        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                        <div className="modal-header justify-content-center">
                          <button
                              className="close"
                              type="button"
                              onClick={() => setModal1(false)}
                            >
                              <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <h5 className="title title-up">Track The Package</h5>
                        </div>
                          <ModalBody>
                            <HomeTracking/>
                          </ModalBody>
                        </Modal>
                        </FormGroup>
                      </Col>
                    </TabPane>
                    <TabPane tabId="iconPills3">
                      <p>
                      Search for nearest drop boxes and retail locations where
                      you can ship and collect packages. Locate the nearest
                      service points to view opening hours and drop-off deadlines.
                      </p>
                      <StoresNearby/>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Tabs;
