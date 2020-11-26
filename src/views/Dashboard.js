import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { MDBCol, MDBBtn} from "mdbreact";
import Cart from "./card.js"
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Modal,
  ModalBody,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "../variables/charts.js";

  export default function Dashboard() {

    const history = useHistory();
    const [data1, setData] = useState([]);
    const [data2, setData1] = useState([]);
    const [data3, setData2] = useState([]);
    const [speed, setSpeed] = useState("");
    const [type, setType] = useState("");
    const [weight, setWeight] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const { user, getAccessTokenSilently } = useAuth0();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [driver, setDriver] = useState("");
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);

    const callSecureApi = async (packageDetails)  =>{
      const token = await getAccessTokenSilently();
      fetch(`${apiUrl}/admin/updateOrders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      },
      body: packageDetails,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        console.log("SUCCESSS");
      }
    });
  };

  const callSecureApi1 = async (serviceDetails)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/admin/addServices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: serviceDetails,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      console.log("SUCCESSS");
    }
  });
};  

  const callSecureApi2 = async (serviceDetails1)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/admin/updateServices`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: serviceDetails1,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      console.log("SUCCESSS");
    }
  });
  };  

  const callSecureApi3 = async (payload)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/admin/deleteServices`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: payload,
  }).then((response) => {
    if (!response.ok) {
      console.log("SOMETHING WENT WRONG");
    } else {
      console.log("SUCCESSS");
    }
  });
  };

  const sendData = (item) => {
    let newDriver = driver;
    let packageDetails = JSON.stringify({
      packageid: item.packageid,
      packageassigned: newDriver
    });
    console.log(packageDetails)
    callSecureApi(packageDetails);
  };

  const handleSubmit = () => {
    let newSpeed = speed;
    let newType = type;
    let newSize = size;
    let newWeight = weight;
    let newPrice = price;
    let serviceDetails = JSON.stringify({
      pspeed: newSpeed,
      ptype: newType,
      psize: newSize,
      pweight: newWeight,
      price: newPrice
    });
    callSecureApi1(serviceDetails);
    };

    const handleSubmit1 = (item) => {
      let newSpeed = speed;
      let newType = type;
      let newSize = size;
      let newWeight = weight;
      let newPrice = price;
      let serviceDetails1 = JSON.stringify({
        id: item.id,
        pspeed: newSpeed,
        ptype: newType,
        psize: newSize,
        pweight: newWeight,
        price: newPrice
      });
      callSecureApi2(serviceDetails1);
      };

    const deleteRecord = (item) => {
      let sid = item.id;
      let payload = JSON.stringify({
        id: sid
      });
      callSecureApi3(payload);
    };

    React.useEffect(() => {
      (async () => {
        try {
        const token = await getAccessTokenSilently();
        let result = await fetch(`${apiUrl}/admin/orders`, {
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
    })(data1);
  },[user]);
  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/admin/drivers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const res1 = await result.json();
      console.log(res1);
      setData1(res1);
    } catch{}
  })(data2);
},[user]);
React.useEffect(() => {
  (async () => {
    try {
    const token = await getAccessTokenSilently();
    let result = await fetch(`${apiUrl}/admin/services`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res1 = await result.json();
    console.log(res1);
    setData2(res1);
  } catch{}
})(data3);
},[user]);
    return (
      <>
        <div className="content">
          {/* <Row>
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
                  <CardTitle tag="h4">Manage Orders</CardTitle>
                </CardHeader>
                <div>
                </div>
                <CardBody>
                  <Table responsive>
                    <thead className="text-danger">
                      <tr>
                        <th className="text-center">Email</th>
                        <th className="text-center">OrderID</th>
                        <th className="text-center">TrackingID</th>
                        <th className="text-center">Source</th>
                        <th className="text-center">Destination</th>
                        <th className="text-center">Deadline</th>
                        <th className="text-center">Speed</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Weight</th>
                        <th className="text-center">Size</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Assign</th>
                        <th className="text-center">Location</th>
                        <th className="text-center"><i class="now-ui-icons ui-1_send"></i></th>
                      </tr>
                    </thead>
                    <tbody>
                    {data1.map(item => (
                      <tr>
                      <td className="text-center">{item.email}</td>
                      <td className="text-center">{item.packageid}</td>
                      <td className="text-center">{item.trackingid}</td>  
                      <td className="text-center">{item.packagesource}</td>
                      <td className="text-center">{item.packagedestination}</td>
                      <td className="text-center">{item.deadline}</td>
                      <td className="text-center">{item.packagespeed}</td>
                      <td className="text-center">{item.packagetype}</td>
                      <td className="text-center">{item.packageweight}</td>
                      <td className="text-center">{item.packagesize}</td>
                      <td className="text-center">{item.packagestatus}</td>
                      <td className="text-center">
                        <Input style={{width:"120px"}} 
                        type="select" name="select" id="drivers" onClick={e => setDriver(e.target.value)}>
                            {data2.map((option) => (
                            <option value={option.username}>{option.username}</option>
                            ))}
                            </Input>
                      </td>
                      <td class="td-actions">
                        <button type="button" rel="tooltip" class="btn btn-danger" 
                        onClick={() => (window.location = item.packagelocation )} >
                            <i class="now-ui-icons location_pin"></i>
                        </button>
                      </td>
                      <td class="td-actions text-center">
                        <button type="button" rel="tooltip" class="btn btn-danger" onClick = {() => sendData(item)} >
                            <i class="now-ui-icons ui-1_check"></i>
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
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                <div class="row">
                  <div class="col-md text-left">
                  <CardTitle tag="h4">Manage Services</CardTitle>
                  </div>
                  <div class="col-md text-right">
                  <button type="button" rel="tooltip" class="btn btn-success" onClick={() => setModal1(true)}>
                    <i class="now-ui-icons ui-1_simple-add"></i>
                  </button>
                    <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                      <div className="modal-header justify-content-center">
                        <button
                          className="close"
                          type="button"
                          onClick={() => setModal1(false)}
                        >
                          <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button>
                        <h4 className="title title-up">Add New Service</h4>
                      </div>
                      <ModalBody>
                      <Table responsive>
                    <thead className="text-danger">
                      <tr>
                        <th className="text-center">Delivery Speed</th>
                        <th className="text-center">Product Category</th>
                        <th className="text-center">Product Weight</th>
                        <th className="text-center">Product Size</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td className="text-center">
                        <Input style={{width:"120px"}} type="select" name="select" id="speed" onClick={e => setSpeed(e.target.value)}>
                            <option>Regular</option>
                            <option>Express</option>
                        </Input>
                      </td>
                      <td className="text-center">
                       <Input style={{width:"120px"}} type="select" name="select" id="type" onClick={e => setType(e.target.value)}>
                            <option>Regular</option>
                            <option>Electronics</option>
                            <option>Food</option>
                            <option>Documents</option>
                            <option>Others</option>
                        </Input>
                      </td>
                      <td className="text-center">
                        <Input style={{width:"120px"}} type="select" name="select" id="weight" onClick={e => setWeight(e.target.value)}>
                            <option>Light</option>
                            <option>Medium</option>
                            <option>Heavy</option>
                        </Input>
                      </td>
                      <td className="text-center">
                        <Input style={{width:"120px"}} type="select" name="select" id="size" onClick={e => setSize(e.target.value)}>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                        </Input>
                      </td>
                      <td className="text-center">
                        <Input style={{width:"120px", height:"40px"}} type="text" id="price" onChange={e => setPrice(e.target.value)}>
                        </Input>
                      </td>
                      </tr>
                    </tbody>
                  </Table>
                      </ModalBody>
                      <div className="modal-footer">
                        <Button color="default"
                        type="submit"
                        value="Submit"
                        onClick = {() => handleSubmit()}
                        >
                          Add Service
                        </Button>
                        <Button
                          color="danger"
                          type="button"
                          onClick={() => setModal1(false)}
                        >
                          Close
                        </Button>
                      </div>
                    </Modal>
                  </div>
                </div>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-danger">
                      <tr>
                        <th className="text-center">Delivery Speed</th>
                        <th className="text-center">Product Category</th>
                        <th className="text-center">Product Weight</th>
                        <th className="text-center">Product Size</th>
                        <th className="text-center">Price</th>
                        <th className="text-center"><i class="now-ui-icons ui-2_settings-90"></i></th>
                      </tr>
                    </thead>
                    <tbody>
                    {data3.map(item => (
                      <tr>
                      <td className="text-center">{item.pspeed}</td>
                      <td className="text-center">{item.ptype}</td>
                      <td className="text-center">{item.pweight}</td>
                      <td className="text-center">{item.psize}</td>
                      <td className="text-center">$ {item.price}</td>
                      <td class="td-actions text-center">
                        <button type="button" rel="tooltip" class="btn btn-primary"  onClick={() => setModal2(true)}>
                            <i class="now-ui-icons ui-1_simple-delete"></i>
                        </button>
                        <Modal isOpen={modal2} toggle={() => setModal2(false)}>
                          <div className="modal-header justify-content-center">
                            <button
                              className="close"
                              type="button"
                              onClick={() => setModal2(false)}
                            >
                              <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <h4 className="title title-up">Modify Service</h4>
                          </div>
                          <ModalBody>
                          <Table responsive>
                            <thead className="text-danger">
                              <tr>
                                <th className="text-center">Delivery Speed</th>
                                <th className="text-center">Product Category</th>
                                <th className="text-center">Product Weight</th>
                                <th className="text-center">Product Size</th>
                                <th className="text-center">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                              <td className="text-center">
                                <Input style={{width:"120px"}} type="select" name="select" id="speed" onClick={e => setSpeed(e.target.value)}>
                                    <option>Regular</option>
                                    <option>Express</option>
                                </Input>
                              </td>
                              <td className="text-center">
                              <Input style={{width:"120px"}} type="select" name="select" id="type" onClick={e => setType(e.target.value)}>
                                    <option>Regular</option>
                                    <option>Electronics</option>
                                    <option>Food</option>
                                    <option>Documents</option>
                                    <option>Others</option>
                                </Input>
                              </td>
                              <td className="text-center">
                                <Input style={{width:"120px"}} type="select" name="select" id="weight" onClick={e => setWeight(e.target.value)}>
                                    <option>Light</option>
                                    <option>Medium</option>
                                    <option>Heavy</option>
                                </Input>
                              </td>
                              <td className="text-center">
                                <Input style={{width:"120px"}} type="select" name="select" id="size" onClick={e => setSize(e.target.value)}>
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </Input>
                              </td>
                              <td className="text-center">
                                <Input style={{width:"120px", height:"40px"}} type="text" id="price" onClick={e => setPrice(e.target.value)}>
                                </Input>
                              </td>
                              </tr>
                            </tbody>
                          </Table>
                          </ModalBody>
                          <div className="modal-footer">
                            <Button color="default"
                            type="submit"
                            value="Submit"
                            onClick = {() => handleSubmit1(item)}
                            >
                              Update
                            </Button>
                            <Button
                              color="danger"
                              type="button"
                              onClick={() => setModal2(false)}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                        <button type="button" rel="tooltip" class="btn btn-danger"  onClick={() => deleteRecord(item)}>
                            <i class="now-ui-icons ui-1_simple-remove"></i>
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