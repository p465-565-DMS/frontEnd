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
                  <CardTitle tag="h4">Order History</CardTitle>
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
                        <th>Package ID</th>
                        <th>Package Content</th>
                        <th>Driver Username</th>
                        <th>Driver Name</th>
                        <th>Package Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>304511</td>
                        <td>Laptop</td>
                        <td>daveDrives</td>
                        <td>Dave</td>
                        <td>$2165.63</td>
                      </tr>
                      <tr>
                        <td>406511</td>
                        <td>Purse</td>
                        <td>abbeyWheels</td>
                        <td>Abbey</td>
                        <td>$217.86</td>
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
