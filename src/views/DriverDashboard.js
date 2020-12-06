import React, { useState } from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import DriverLocationStatus from '../components/googleAutocomplete/driverLocationStatus';
// reactstrap components
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
  driverdashboardEmailStatisticsChart,
  driverdashboardNASDAQChart,
} from "../variables/charts.js";

export default function Dashboard() {

  const history = useHistory();
  const [data1, setData] = useState([]);
  const [status, setStatus] = useState("");
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;

  const callSecureApi = async (packageDetails)  =>{
    const token = await getAccessTokenSilently();
    fetch(`${apiUrl}/driver/updateOrders`, {
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

  const sendData = (item) => {
    let streetAddress = localStorage.getItem("streetAddress");
    let city = localStorage.getItem("city");
    let state = localStorage.getItem("state");
    let googleMapLink = localStorage.getItem("googleMapLink");
    let address = {"streetAddress":streetAddress,"state":state,"city":city,"googleMapLink":googleMapLink};
    let newStatus = status;
    let packageDetails = JSON.stringify({
      packageid: item.packageid,
      packagelocation: !!(googleMapLink)?googleMapLink:item.packagelocation,
      packagestatus: newStatus
    });
    console.log(packageDetails)
    callSecureApi(packageDetails);
  };

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/driver/orders`, {
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
  return (
    <>
      <div className="content">
        <Row>
        <Col md="7">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Number of Deliveries</CardTitle>
              </CardHeader>
              <CardBody>
                <Line
                  data={driverdashboardNASDAQChart.data}
                  options={driverdashboardNASDAQChart.options}
                  width={400}
                  height={179}
                />
              </CardBody>
            </Card>
          </Col>
          <Col md="5">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Percentage of Package Types Delivered</CardTitle>
              </CardHeader>
              <CardBody>
                <Pie
                  data={driverdashboardEmailStatisticsChart.data}
                  options={driverdashboardEmailStatisticsChart.options}
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
                <CardTitle tag="h4">Manage Deliveries</CardTitle>
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
                      <th className="text-center">Location</th>
                      <th className="text-center">Update Location</th>
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
                    {/* <td className="text-center">{item.packagestatus}</td> */}
                    <td className="text-center">
                      <Input style={{width:"120px"}} 
                      type="select" defaultValue={item.packagestatus} name="select" id="status" onClick={e => setStatus(e.target.value)}>
                          <option value='Received'>Received</option>
                          <option value='In Transit'>In Transit</option>
                          <option value='Delivered'>Delivered</option>
                          </Input>
                    </td>
                    <td class="td-actions">
                      <button type="button" rel="tooltip" class="btn btn-danger" 
                      onClick={() => (window.location = item.packagelocation )} >
                          <i class="now-ui-icons location_pin"></i>
                      </button>
                    </td>
                    <td className="text-center">
                    <DriverLocationStatus
                          />
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
      </div>
    </>
  );
}