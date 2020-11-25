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
                  <CardTitle tag="h4">Delivery History</CardTitle>
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
                        <th>Customer Username</th>
                        <th>Customer Name</th>
                        <th>Customer Address</th>
                        <th>Package Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>304511</td>
                        <td>Laptop</td>
                        <td>gamerguy7864</td>
                        <td>Derek</td>
                        <td>$2165.63</td>
                        <td>530 W Hoosier Court Ave</td>
                      </tr>
                      <tr>
                        <td>406512</td>
                        <td>Custom Furniture</td>
                        <td>gertrude77</td>
                        <td>Gertrude</td>
                        <td>$217.86</td>
                        <td>600 E Second Street</td>
                      </tr>
                      <tr>
                        <td>978621</td>
                        <td>Video Game Merchandise</td>
                        <td>efan797</td>
                        <td>Raheem</td>
                        <td>$50.66</td>
                        <td>131 N Clark Street</td>
                      </tr>
                      <tr>
                        <td>647895</td>
                        <td>Dragon Egg</td>
                        <td>mortwinThedark</td>
                        <td>Mortimer</td>
                        <td>$7000.01</td>
                        <td>403 N Roosevelt Street</td>
                      </tr>
                      <tr>
                        <td>658963</td>
                        <td>Makeup Kit</td>
                        <td>darcyday</td>
                        <td>Darcy</td>
                        <td>$85.96</td>
                        <td>3039 E Amy Lane</td>
                      </tr>
                      <tr>
                        <td>25698</td>
                        <td>Wand of Smiles</td>
                        <td>tashavergo</td>
                        <td>Tasha</td>
                        <td>$304.65</td>
                        <td>3209 E 10th Street, Apt. F11</td>
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