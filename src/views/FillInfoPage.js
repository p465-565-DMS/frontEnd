import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SearchLocationInput from '../components/SearchLocationInput';
import { Redirect, useHistory } from "react-router-dom";
import { Loading } from "../components"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Collapse,
  Container,
  ListGroup, 
  ListGroupItem,
  Label,
} from "reactstrap";

export default function UserProfile(props) {
  const history = useHistory();
  const { user } = useAuth0();
  const { email, nickname } = user;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [company, setCompanyName] = useState("N/A");
  const [license, setLicenseNo] = useState("N/A");
  const [role, setRole] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoadingTrue, setLoading] = useState("False");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle0 = () => {
    setIsOpen(!isOpen)
    if (isOpen2){
      setIsOpen2(!isOpen2)
    }
    if (isOpen1){
      setIsOpen1(!isOpen1)
    }
  };
  const toggle1 = () => {
    setIsOpen1(!isOpen1)
    if (isOpen2){
      setIsOpen2(!isOpen2)
    }
    if (isOpen){
      setIsOpen(!isOpen)
    }
  };
  const toggle2 = () => {
    setIsOpen2(!isOpen2)
    if (isOpen1){
      setIsOpen(!isOpen1)
    }
    if (isOpen){
      setIsOpen(!isOpen)
    }
  };
  const handleRole = (type) => {
    if(type === "user"){
      setRole("user");
      toggle0();
    }
    else if(type === "driver"){
      setRole("driver");
      toggle1();
    }
    else{
      setRole("dadmin");
      toggle2();
    }
  };
  const callSecureApi = async (userDetails)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/fill-info`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: userDetails,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
      history.push("/fill-info");
    } else {
      console.log("SUCCESSS");
      history.push(window.location.origin);
    }
  });
};

const handleSubmit = (evt) => {
  setLoading("True")
  evt.preventDefault();
  let streetAddress = localStorage.getItem("streetAddress");
  let city = localStorage.getItem("city");
  let state = localStorage.getItem("state");
  let googleMapLink = localStorage.getItem("googleMapLink");
  let username = user.nickname;
  let address = {"streetAddress":streetAddress,"state":state,"city":city,"googleMapLink":googleMapLink};
  let driver = {"cname":company,"lno":license};
  let admin = {"cname":company,"spkg":"TRUE", "mpkg":"TRUE", "lpkg":"TRUE", "elec":"TRUE", "deli":"TRUE", "heavy":"TRUE", "doc":"TRUE", "other":"TRUE", "express":"TRUE", "normal":"TRUE"};
  let userDetails = JSON.stringify({
    username,
    role,
    fname: firstName,
    lname: lastName,
    address,
    phone: phoneNumber,
    email,
    zipCode:zipcode,
    driver,
    admin
  });
  callSecureApi(userDetails);
  };
  if (isLoadingTrue === "True") {
    return <Loading />;
  }
    return (
      <>
        <div className="content mt-5 pt-5">
             <Row>
             <Col md="2"/>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h4">Complete Your Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <form onSubmit = {handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            required
                            placeholder="First Name"
                            type="text"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="5">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            required
                            placeholder="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            disabled
                            defaultValue={nickname}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                          disabled
                          defaultValue={email}
                          placeholder="Email"
                          type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Phone Number
                          </label>
                          <Input 
                          required
                          placeholder="(123)456-7890" 
                          onChange={e => setPhoneNumber(e.target.value)}
                          type="phone" />
                        </FormGroup>
                      </Col> 
                    </Row>
                    <Row>
                      <Col className="pr-1" md="8">
                        <FormGroup>
                          <label>Address</label>
                          <SearchLocationInput required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input 
                          required
                          placeholder="ZIP Code" 
                          onChange={e => setZipCode(e.target.value)}
                          type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div>
                      <h5>Select Your Role</h5>
                      <div>
                        <Button color="success" onClick={() => handleRole("user")}style={{ marginBottom: '1rem' }}>User</Button>
                        <Button color="success" onClick={() => handleRole("driver")} style={{ marginBottom: '1rem' }}>Delivery Driver</Button>
                        <Button color="success" onClick={() => handleRole("dadmin")} style={{ marginBottom: '1rem' }}>Delivery Admin</Button>
                        <Collapse isOpen={isOpen}></Collapse>
                        <Collapse isOpen={isOpen1}>
                          <Container>
                            <Row>
                              <Col className="pl-1" md="6">
                                <FormGroup>
                                  <label>Company Name</label>
                                  <Input
                                    //required
                                    placeholder="Company Name"
                                    type="text"
                                    onChange={e => setCompanyName(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col className="pl-1" md="6">
                                <FormGroup>
                                  <label>Driver License</label>
                                  <Input
                                   // required
                                    placeholder="License No."
                                    onChange={e => setLicenseNo(e.target.value)}
                                    type="text"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                        </Collapse>
                        <Collapse isOpen={isOpen2}>
                          <Container>
                            <Row>
                              <Col className="pl-1" md="6">
                                <FormGroup>
                                  <label>Company Name</label>
                                  <Input
                                    //required
                                    placeholder="Company Name"
                                    type="text"
                                    onChange={e => setCompanyName(e.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <h5>Delivery Item Preference</h5>
                          <Container>
                            <Row>
                              <Col md="3">
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox1" />{' '}
                                      Small Package
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      Medium Package
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      Large Package
                                  </Label>
                                </Row>
                              </Col>
                              <Col md="3">
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox3" />{' '}
                                      Electronic Items
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Food Items
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      General Itmes
                                  </Label>
                                </Row>
                              </Col>
                              <Col md="3">
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox3" />{' '}
                                      Light Weight Item
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Medium Weight Item
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      Heavy Weight Item
                                  </Label>
                                </Row>
                              </Col>
                              <Col md="3">
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox3" />{' '}
                                      Normal Delivery
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Express Delivery
                                  </Label>
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </Collapse>
                      </div>
                    </div>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          value="Submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col md="2"/>
          </Row>
        </div>
      </>
    );
}