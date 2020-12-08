
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
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
} from "reactstrap";

export default function UserProfile() {
  const history = useHistory();
  const [data, setData] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddrs] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [role, setRole] = useState("");
  const [url, setUrl] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState(false);

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
      localStorage.setItem("userid", res[0].userid);
      setFirstName(res[0].fname);
      setLastName(res[0].lname);
      setRole(res[0].role);
      setContactNumber(res[0].phone);
      setZipCode(res[0].zipcode);
      setStreetAddrs(res[0].address);
      setCity(res[0].city);
      setState(res[0].state);
      setUrl(res[0].googlelink);
    } catch{}
  })(data);
},[user]);

const callSecureApi = async (userDetails) => {
  const token = await getAccessTokenSilently();
  fetch(`${apiUrl}/api/me`, {
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
      history.push("/admin/user-page");
    }
  });
};

const handleSubmit = (evt) => {
  setLoading("True");
  evt.preventDefault();
  let address = {
    streetAddress,
    city,
    state,
    zip: zipCode,
    googlelink: url,
  };

  let userDetails = JSON.stringify({
    email,
    fname: firstName,
    lname: lastName,
    phone: contactNumber,
    role,
    address,
  });
  console.log(userDetails);
  callSecureApi(userDetails);
};

if (isLoadingTrue) {
  return <Loading />;
}
  const { email } = user;  
    return (
      <>
        <div className="content">
             <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img
                    alt="..."
                    src={require("../assets/img/damir-bosnjak.jpg")}
                  />
                </div>
                <CardBody>
                  <div className="author">
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={`${user.picture}`}
                    />
                    <h5 className="title">{user.nickname}</h5>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit}> 
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={`${firstName}`}
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
                            defaultValue={`${lastName}`}
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            disabled
                            defaultValue={`${user.nickname}`}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="5">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input
                          disabled
                          defaultValue={`${user.email}`}
                          placeholder="Email"
                          type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="3">
                        <FormGroup>
                          <label>Role</label>
                          <Input
                            defaultValue={`${role}`}
                            disabled
                            placeholder="Role"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="3">
                        <FormGroup>
                          <label>
                            Phone Number
                          </label>
                          <Input 
                          defaultValue={`${contactNumber}`}
                          onChange={e => setContactNumber(e.target.value)}
                          type="phone" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>Address</label>
                          <Input 
                          defaultValue={`${streetAddress}`}
                          onChange={e => setStreetAddrs(e.target.value)}
                          type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input 
                          defaultValue={`${city}`}
                          onChange={e => setCity(e.target.value)}
                          type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Zip Code</label>
                          <Input 
                          defaultValue={`${zipCode}`}
                          onChange={e => setZipCode(e.target.value)}
                          type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          value="Submit"
                        >
                          Update Profile
                        </Button>
                      </div>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}