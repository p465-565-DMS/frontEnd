import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { MDBCol, MDBBtn} from "mdbreact";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "../variables/charts.js";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <div className="content">
{/*           
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Capacity</p>
                        <CardTitle tag="p">150GB</CardTitle>
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
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Revenue</p>
                        <CardTitle tag="p">$ 1,345</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Last day
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Errors</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Followers</p>
                        <CardTitle tag="p">+45K</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Update now
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          */}
          {/* <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Number of Orders</CardTitle>
                </CardHeader>
                <CardBody>
                  <Line
                    // data={dashboard24HoursPerformanceChart.data}
                    // options={dashboard24HoursPerformanceChart.options}
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={90}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend ml-3">
                    <i className="fa fa-circle text-warning" /> Users{" "}
                    <i className="fa fa-circle text-danger" /> Delivery Drivers{" "}
                    <i className="fa fa-circle text-success" /> Deliver Admins{" "}
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row> */}
          <Row>
          <Col md="7">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Number of Orders</CardTitle>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={173}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    {/*
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                    */}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="5">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Percentage of Package Types Sent</CardTitle>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend ml-3">
                    <i className="fa fa-circle text-primary" /> Regular{" "}
                    <i className="fa fa-circle text-warning" /> Electronics{" "}
                    <i className="fa fa-circle text-danger" /> Food{" "}
                    <br/>
                    <i className="fa fa-circle text-info" /> Documents{" "}
                    <i className="fa fa-circle text-gray" /> Others
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        {/* </div> */}
        {/* <div className="content"> */}
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Orders</CardTitle>
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
                        <th>Order ID</th>
                        <th>Tracking ID</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                    {/* {data.map(item => (
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
                    ))} */}
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

export default Dashboard;
