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
  const [data, setData] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [isLoadingTrue, setLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/admin/employees`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      console.log(res);
      setData(res);
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
                  <MDBCol md="12">
                    <div>
                      <input type="text" placeholder="Search" aria-label="Search" />
                      <MDBBtn outline color="danger" rounded size="sm" type="submit" className="mr-auto">
                        Search
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </div>
                <CardBody>
                  <Table responsive>
                    <thead className="text-danger">
                      <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                      <tr>
                      <td>{item.email}</td>
                      <td>{item.fname}</td>
                      <td>{item.lname}</td>
                      <td>{item.role}</td>
                      <td class="td-actions">
                        <button type="button" rel="tooltip" class="btn btn-danger" 
                        onClick={() => (window.location = item.googlelink )} >
                            <i class="now-ui-icons location_pin"></i>
                        </button>
                      </td>
                      </tr>
                    ))}
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