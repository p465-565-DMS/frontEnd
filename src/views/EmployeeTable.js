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
                        <th>User ID</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Phone Number</th>
                        <th>Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>304511</td>
                        <td>dakotarice</td>
                        <td>Dakota</td>
                        <td>Rice</td>
                        <td>Courier</td>
                        <td>(234)859-7890</td>
                        <td>$77,738</td>
                      </tr>
                      <tr>
                        <td>758761</td>
                        <td>jwatson</td>
                        <td>Jessica</td>
                        <td>Watson</td>
                        <td>Courier</td>
                        <td>(525)898-7890</td>
                        <td>$45,738</td>
                      </tr>
                      <tr>
                        <td>408576</td>
                        <td>aadamy</td>
                        <td>Amy</td>
                        <td>Adam</td>
                        <td>Courier</td>
                        <td>(123)576-1290</td>
                        <td>$57,738</td>
                      </tr>
                      <tr>
                        <td>304231</td>
                        <td>samsamsmith</td>
                        <td>Sam</td>
                        <td>Smith</td>
                        <td>Courier</td>
                        <td>(123)456-9990</td>
                        <td>$36,738</td>
                      </tr>
                      <tr>
                        <td>306911</td>
                        <td>johndoedoe</td>
                        <td>John</td>
                        <td>Doe</td>
                        <td>Courier</td>
                        <td>(123)234-7890</td>
                        <td>$40,738</td>
                      </tr>
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