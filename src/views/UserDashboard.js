import React, { useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import DriverLocationStatus from '../components/googleAutocomplete/driverLocationStatus';
import HomeTracking from "./UserDashboardTracking.js";
import { Loading } from "../components";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText, 
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
  userdashboardEmailStatisticsChart,
  userdashboardNASDAQChart,
} from "../variables/charts.js";

export default function UserDashboard() {

  const history = useHistory();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [modal1, setModal1] = useState(false);
  const [isLoadingTrue, setLoading] = useState(false);


  const hanndleSubmit1 = (trackId) => {
    sendData(trackId);
    setModal1(true);
  }

  const sendData = (trackId) => {
    let tid = trackId;
    let payload = JSON.stringify({
      trackingid: tid
    });
    //console.log(payload)
    setLoading(true);
    callSecureApi1(payload);
  };

  const callSecureApi1 = async (payload) => {
    fetch(`${apiUrl}/api/trackPackage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then((response) => {
      if (!response.ok) {
        console.log("SOMETHING WENT WRONG");
      } else {
        response.json().then(function(data) {
          //localStorage.setItem("trackInfo", data); 
          localStorage.setItem("dashTrackMap", data[0].packagelocation);
          //console.log(data[0].packagelocation);
        });
          //console.log(localStorage.getItem("trackInfo"))
          setLoading(false);
      }
    });
  };

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/user/currentOrders`, {
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

if (isLoadingTrue) {
  return <Loading />;
}

const renderCard = (card) => {
  return(
  <Card style = {{fontSize : "12px", width: "40%", marginRight: "20px"}}>
    <div style = {{backgroundColor:"#ef8157"}}>
      <CardTitle style={{marginLeft: "10px"}} tag="h4">Order ID: {card.packageid}</CardTitle>  
      <CardBody style={{backgroundColor: "whitesmoke"}}>
        <CardText>
          <div className="content text-left">
            <p><i class="now-ui-icons ui-1_email-85"></i> {card.email}</p>
            <p><i class="now-ui-icons users_circle-08"></i> {card.packageassigned}</p>
            <p><i class="now-ui-icons location_compass-05"></i> {card.trackingid}</p>
            <p><i class="now-ui-icons shopping_shop"></i> {card.packagesource}</p>
            <p><i class="now-ui-icons business_bank"></i> {card.packagedestination}</p>
            <p><i class="now-ui-icons ui-2_time-alarm"></i> {card.deadline}</p>
            <p><i class="now-ui-icons shopping_tag-content"></i> {card.packagetype}</p>
            <p><i class="now-ui-icons shopping_delivery-fast"></i> {card.packagestatus}</p>
            <p><i class="now-ui-icons business_money-coins"></i> ${card.price}</p>
            <Button
                color="black"
                className="mr-1"
                onClick = {() => hanndleSubmit1(card.trackingid)}
              >
                Track Package Location
            </Button>
            <Modal isOpen={modal1} toggle={() => setModal1(false)}>
              <div className="modal-header justify-content-center">
                <button
                    className="close"
                    type="button"
                    onClick={() => setModal1(false)}
                  >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h5 className="title title-up">Package Location</h5>
              </div>
              <ModalBody>
                <HomeTracking/>
              </ModalBody>
            </Modal>
          </div>
        </CardText>
      </CardBody>
    </div>
  </Card>
  )
}

    return (
      <>
      <div className="content">
        <Row>
        <Col md="7">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Payment Statistics</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={userdashboardNASDAQChart.data}
                  options={userdashboardNASDAQChart.options}
                  width={400}
                  height={179}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Percentage of Package Types</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie
                  data={userdashboardEmailStatisticsChart.data}
                  options={userdashboardEmailStatisticsChart.options}
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
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                <div class="row">
                  <div class="col-md text-left">
                    <CardTitle tag="h4">Current Orders</CardTitle>
                  </div>
                  <div class="col-md text-right">
                    <button type="button" rel="tooltip" class="btn btn-success" onClick={() => history.push("/")}>
                      <i class="now-ui-icons ui-1_simple-add"></i> Place New Order
                    </button>
                  </div>
                </div>
                </CardHeader>
                <div>
                  {/* <MDBCol md="6">
                    <div>
                      <input type="text" placeholder="Search" aria-label="Search" />
                      <MDBBtn outline color="warning" rounded size="sm" type="submit" className="mr-auto">
                        Search
                      </MDBBtn>
                    </div>
                  </MDBCol> */}
                </div>
                <CardBody>
                  {data.map(renderCard)}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }