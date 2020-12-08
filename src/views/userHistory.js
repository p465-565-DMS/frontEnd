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
  Modal,
  ModalBody,
  CardText,
  Table,
  Row,
  Col,
  Input,
  Button
} from "reactstrap";
// import { CardText } from "material-ui";


export default function OrderHistory() {

  const history = useHistory();
  const [data, setData] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();
  const [modal1, setModal1] = useState(false);
  const [review, setReview] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  // const geocoder = new google.maps.Geocoder();
  const [isLoadingTrue, setLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      try {
      const token = await getAccessTokenSilently();
      let result = await fetch(`${apiUrl}/user/orderHistory`, {
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

const callSecureApi = async (payload)  =>{
  const token = await getAccessTokenSilently();
  fetch(`${apiUrl}/user/review`, {
    method: "POST",
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

const sendReview = (packageid) => {  
  let payload = JSON.stringify({
    review,
    packageid
  });
  callSecureApi(payload);
  };

const renderCard = (card) => {
  return(
  <Card style = {{fontSize : "11px", width : "30%", marginRight: "20px"}}>
    <div style = {{backgroundColor:"#ef8157"}}>
      <CardTitle style={{marginLeft: "10px"}} tag="h4">Order ID: {card.packageid}</CardTitle>  
      <CardBody style={{backgroundColor: "whitesmoke"}}>
        <CardText>
          <div className="content text-left">
            <p><i class="now-ui-icons travel_info"></i> {card.companyname}</p>
            <p><i class="now-ui-icons ui-1_email-85"></i> {card.email}</p>
            <p><i class="now-ui-icons users_circle-08"></i> {card.packageassigned}</p>
            <p><i class="now-ui-icons location_compass-05"></i> {card.trackingid}</p>
            <p><i class="now-ui-icons shopping_shop"></i> {card.packagesource}</p>
            <p><i class="now-ui-icons business_bank"></i> {card.packagedestination}</p>
            <p><i class="now-ui-icons ui-2_time-alarm"></i> {card.deadline}</p>
            <p><i class="now-ui-icons shopping_tag-content"></i> {card.packagetype}</p>
            <p><i class="now-ui-icons shopping_delivery-fast"></i> {card.packagestatus}</p>
            <p><i class="now-ui-icons business_money-coins"></i> ${card.price}</p>
            <p><i class="now-ui-icons ui-2_chat-round"></i> {card.review}</p>
            <Button
                color="black"
                className="mr-1"
                onClick={() => setModal1(true)}
              >
                Review
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
                  <h5 className="title title-up">Please Provide Your Review</h5>
              </div>
                <ModalBody>
                  <p>
                  <Input
                      placeholder="Review Delivery Service"
                      type="text"
                      onChange={e => setReview(e.target.value)}
                  />
                  </p>
                </ModalBody>
                <div className="modal-footer">
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => sendReview(card.packageid)}
                  >
                    Send
                  </Button>
                </div>
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