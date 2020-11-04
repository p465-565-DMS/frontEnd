import SearchLocationInput from '../../components/googleAutocomplete/rateAndShipAddress';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Loading } from "../../components"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  FormGroup,
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
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [data, setData] = useState({});
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  const [queryValue, setQuery] = React.useState("");
  const ref1 = React.createRef();
  const ref2 = React.createRef();
  const [isLoadingTrue, setLoading] = useState(false);


const callSecureApi = async (query) => {
  const token = await getAccessTokenSilently();
  fetch(`${apiUrl}/api/search`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: query,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      history.push("/search-result");
    }
  });
};

const handleSubmit = (queryValue) => {
  setLoading("True");

  let query = JSON.stringify({
    queryValue,
  });
  console.log(query);
  callSecureApi(query);
};

if (isLoadingTrue) {
  return <Loading />;
}

  const CheckButton = () => (
    <Route render={({history}) => (
      <Button
        type='button'
        onClick={() => {
          history.push('/search-result');
          
          // let dateBox = document.getElementById("dateBox");
          // if(dateBox.value != ''){
            // customQuery += qWrap(dateBox.value);
          // }
          let customQuery = 'SELECT * FROM servicedetails WHERE 1=1';
          let deliveryBox = document.getElementById("deliverySpeedBox");
          customQuery += qWrap("pspeed", deliveryBox.value);

          let typeBox = document.getElementById("packageTypeBox");

          customQuery += qWrap("ptype", typeBox.value);

          let sizeBox = document.getElementById("packageSizeBox");
          customQuery += qWrap("psize", sizeBox.value);

          let weightBox = document.getElementById("packageWeightBox");
          customQuery += qWrap("pweight", weightBox.value);

          customQuery += ";";

          handleSubmit(customQuery)

         }}
        aria-label="Check"
        className="mt-5"
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
                            <SearchLocationInput ref={ref1}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-5 mt-3" sm="12">
                          <h6 style={{textAlign:"left"}}>To</h6>
                            <SearchLocationInput ref={ref2}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="px-5 mt-3" sm="6">
                          <h6 style={{textAlign:"left"}}>Date</h6>
                            <Input placeholder="dd/mm/yyyy"
                            id="dateBox"></Input>
                        </Col>
                        <Col className="px-5 mt-3" sm="6">
                          <h6 style={{textAlign:"left"}}>Delivery Speed</h6>
                          <Input type="select" name="select" id="deliverySpeedBox">
                            <option>Regular</option>
                            <option>Express</option>
                          </Input>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package type</h6>
                          <Input type="select" name="select" id="packageTypeBox">
                            <option>Regular</option>
                            <option>Electronic</option>
                            <option>Food</option>
                            <option>Documents</option>
                            <option>Others</option>
                          </Input>
                        </Col>
                        <Col className="px-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package size</h6>
                          <Input type="select" name="select" id="packageSizeBox">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                          </Input>
                        </Col>
                        <Col className="pr-5 mt-3" sm="4">
                          <h6 style={{textAlign:"left"}}>Package weight</h6>
                          <Input type="select" name="select" id="packageWeightBox">
                            <option>Light</option>
                            <option>Medium</option>
                            <option>Heavy</option>
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
                          ></Input>
                        </FormGroup>
                      </Col>
                    </TabPane>
                    <TabPane tabId="iconPills3">
                      <p>
                      Search for nearest drop boxes and retail locations where
                      you can ship and collect packages. Locate the nearest
                      service points to view opening hours and drop-off deadlines.
                      </p>
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
