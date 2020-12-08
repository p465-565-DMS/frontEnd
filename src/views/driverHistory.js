import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MDBCol, MDBBtn} from "mdbreact";
import { Form } from 'react-bootstrap';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  Table,
  Row,
  Col,
  Input,
} from "reactstrap";
// import { CardText } from "material-ui";

const renderCard = (card) => {
  return(
  <Card style = {{fontSize : "11px", width : "30%", marginRight: "20px",backgroundColor:"#ef8157", borderRadius:"10px"}}>
    <div style = {{}}>
      <CardTitle style={{marginLeft: "10px", color:"white"}} tag="h4">Order ID: {card.packageid}</CardTitle>  
      <CardBody style={{backgroundColor: "whitesmoke"}}>
        <CardText>
          <div className="content text-left">
            <p><i class="now-ui-icons ui-1_email-85"></i> {card.email}</p>
            <p><i class="now-ui-icons users_circle-08"></i> {card.fname}</p>
            <p><i class="now-ui-icons location_compass-05"></i> {card.trackingid}</p>
            <p><i class="now-ui-icons ui-2_time-alarm"></i> {card.deadline}</p>
            <p><i class="now-ui-icons shopping_tag-content"></i> {card.packagetype}</p>
            <p><i class="now-ui-icons shopping_delivery-fast"></i> {card.packagestatus}</p>
            {/* <p><i class="now-ui-icons location_pin"></i></p> */}
            <p><i class="now-ui-icons business_money-coins"></i> ${card.price}</p>
            <p><i class="now-ui-icons ui-2_chat-round"></i> {card.review}</p>
          </div>
        </CardText>
      </CardBody>
    </div>
  </Card>
  )
}

export default function OrderHistory() {

  const history = useHistory();
  const [data, setData] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const apiUrl = process.env.REACT_APP_API_URL;
  // const geocoder = new google.maps.Geocoder();
  const [isLoadingTrue, setLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/driver/orderHistory`, {
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
                  <CardTitle tag="h4">Orders History</CardTitle>
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