import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
export default function Cart(props) {
  
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="12" xs="12">
                      <div className="numbers">
                        <p className="card-category">{props.items.username}</p>
                        <CardTitle tag="p">First Name: `${props.items.fname}` + " " + `${props.items.lname}`</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
        </Row>
    </div>
      </>
    );
  
}
