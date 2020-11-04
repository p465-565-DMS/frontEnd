import React, { useEffect, useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MDBCol, MDBBtn} from "mdbreact";
import { Form } from 'react-bootstrap';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

const renderCard = (card, index) => {
  return(
    <tr>
      <th>{card.username}</th>
      <th>{card.fname}</th>
      <th>{card.lname}</th>
      <th>{card.role}</th>
      <th>{card.email}</th>
    </tr>
  )
}

var list = 
[
  {
  fname: 'sigeh',
  lname: 'llubed',
  email: 'sigeh58579@llubed.com',
  username: 'sigeh58579',
  role: 'driver',
  googlelink: 'https://maps.google.com/?q=1425+N+Dunn+St,+Bloomington,+IN+47408,+USA&ftid=0x886c66ce696aca37:0x8cf32b9df0547ad2'
  },
  {
  fname: 'daxe',
  lname: 'laf',
  email: 'daxelaf572@mojzur.com',
  username: 'daxelaf572',
  role: 'driver',
  googlelink: 'https://maps.google.com/?q=2307+E+2nd+St,+Bloomington,+IN+47401,+USA&ftid=0x886c66993c6b0b17:0xdab438e92530cd5a'
  },
  {
  fname: 'limi',
  lname: 'tax',
  email: 'limitax114@adeata.com',
  username: 'limitax114',
  role: 'driver',
  googlelink: 'https://maps.google.com/?q=694+S+Landmark+Ave,+Bloomington,+IN+47403,+USA&ftid=0x886c6711138040d1:0x3766bedc9edf6521'
  }
]

export default function Tables() {

  const history = useHistory();
  const [data, setData] = useState({});
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/api/employees`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      // localStorage.setItem("userid", res[0].userid);
      // setFirstName(res[0].fname);
      // setLastName(res[0].lname);
      // setRole(res[0].role);
      // setContactNumber(res[0].phone);
      // setZipCode(res[0].zipcode);
      // setStreetAddrs(res[0].address);
      // setCity(res[0].city);
      // setState(res[0].state);
      // setUrl(res[0].googlelink);
    } catch{}
  })(data);
},[user]);
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Employee List</CardTitle>
                </CardHeader>
                <div>
                  <MDBCol md="6">
                    <div>
                      <input type="text" placeholder="Search" aria-label="Search" />
                      <MDBBtn outline color="warning" rounded size="sm" type="submit" className="mr-auto">
                        Search
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </div>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>email</th>
                      </tr>
                    </thead>
                    <tbody>
                        {list.map(renderCard)}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
}