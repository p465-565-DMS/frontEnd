/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
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

class Tables extends React.Component {
  render() {
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
}

export default Tables;
