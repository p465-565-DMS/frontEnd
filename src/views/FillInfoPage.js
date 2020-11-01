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
  const { email, picture, nickname } = user;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [role, setRole] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [message, setMessage] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const [isLoadingTrue, setLoading] = useState("False");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const toggle1 = () => {
    setIsOpen(!isOpen)
    if (isOpen2){
      setIsOpen2(!isOpen2)
    }
  };
  const toggle2 = () => {
    setIsOpen2(!isOpen2)
    if (isOpen){
      setIsOpen(!isOpen)
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
    } else {
      console.log("SUCCESSS");
      history.push(window.location.origin);
    }
  });
};

const lookup = {User:1, DeliveryDriver:2, DeliveryAdmin:3, Admin:4}

const handleSubmit = (evt) => {
  console.log(role)
  setLoading("True")
  evt.preventDefault();
  let streetAddress = localStorage.getItem("streetAddress");
  let city = localStorage.getItem("city");
  let state = localStorage.getItem("state");
  let country = localStorage.getItem("country");
  let googleMapLink = localStorage.getItem("googleMapLink");
  let auth0_id = user.sub;
  let username = user.nickname;
  let userpassword = "123456"
  let userDetails = JSON.stringify({
    username,
    roleid: "1",
    userpassword,
    fname: firstName,
    lname: lastName,
    address: streetAddress,
  });
  console.log(userDetails);
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
                  <CardTitle tag="h5">Complete Your Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit = {handleSubmit}>
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
                      <Col className="pl-1" md="6">
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
                      <Col className="pr-1" md="5">
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
                      <Col className="px-1" md="7">
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
                    </Row>
                    {/* <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            placeholder="Company Name"
                            onChange={e => (e.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                     <Col className="pl-1" md="6">
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
                    </Row> */}
                    <Row>
                      <Col className="pr-1" md="10">
                        <FormGroup>
                          <label>Address</label>
                          <SearchLocationInput required
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                      <Col className="px-1" md="2">
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
                      <h5>If you want to become</h5>
                      <div>
                        <Button color="success" onClick={toggle1} style={{ marginBottom: '1rem' }}>Deliver Driver</Button>
                        <Button color="success" onClick={toggle2} style={{ marginBottom: '1rem' }}>Deliver Admin</Button>
                        <Collapse isOpen={isOpen}>
                          <Container>
                            <Row>
                              <Col className="pl-1" md="6">
                                <FormGroup>
                                  <label>Company Name</label>
                                  <Input
                                    required
                                    placeholder="Company Name"
                                    type="text"
                                    /*
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    */
                                  />
                                </FormGroup>
                              </Col>
                              <Col className="pl-1" md="6">
                                <FormGroup>
                                  <label>Driver License</label>
                                  <Input
                                    required
                                    placeholder="License No."
                                    /*
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                    type="text"
                                    */
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
                                    required
                                    placeholder="Company Name"
                                    type="text"
                                    /*
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                    */
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
                                      Electronic Item
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Food
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      Documents
                                  </Label>
                                </Row>
                              </Col>
                              <Col md="3">
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox3" />{' '}
                                      Light
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Medium
                                  </Label>
                                </Row>
                                <Row className="pl-4">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox2" />{' '}
                                      Heavy
                                  </Label>
                                </Row>
                              </Col>
                              <Col md="3">
                                  <Label check>
                                    <Input type="checkbox" id="checkbox3" />{' '}
                                      Normal Delivery
                                  </Label>
                                  <Label check>
                                    <Input type="checkbox" id="checkbox4" />{' '}
                                      Express Delivery
                                  </Label>
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
                        >
                          Submit
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="2"/>
          </Row>
        </div>
      </>
    );
}