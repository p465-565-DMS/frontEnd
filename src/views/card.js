import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Modal,
  ModalBody,
  Button,
  Row,
  Col,
} from "reactstrap";
// core components
export default function Cart(props) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [modal1, setModal1] = useState(false);
  const [review, setReview] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

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

    return (
      <>
        {/* <div className="content"> */}
         
            <Card style = {{fontSize : "12px", width: "30%", marginRight: "20px",backgroundColor:"#ef8157", borderRadius:"10px"}}>
              <div style = {{}}>
                <CardTitle style={{margin: "10px", color:"white"}} tag="h4">Order ID: {props.card.packageid}</CardTitle>  
                <CardBody style={{backgroundColor: "whitesmoke"}}>
                  <CardText>
                    <div className="content text-left">
                      <p><i class="now-ui-icons travel_info"></i> {props.card.companyname}</p>
                      <p><i class="now-ui-icons ui-1_email-85"></i> {props.card.email}</p>
                      <p><i class="now-ui-icons users_circle-08"></i> {props.card.packageassigned}</p>
                      <p><i class="now-ui-icons location_compass-05"></i> {props.card.trackingid}</p>
                      <p><i class="now-ui-icons shopping_shop"></i> {props.card.packagesource}</p>
                      <p><i class="now-ui-icons business_bank"></i> {props.card.packagedestination}</p>
                      <p><i class="now-ui-icons ui-2_time-alarm"></i> {props.card.deadline}</p>
                      <p><i class="now-ui-icons shopping_tag-content"></i> {props.card.packagetype}</p>
                      <p><i class="now-ui-icons shopping_delivery-fast"></i> {props.card.packagestatus}</p>
                      <p><i class="now-ui-icons business_money-coins"></i> ${props.card.price}</p>
                      <p><i class="now-ui-icons ui-2_chat-round"></i> {props.card.review}</p>
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
                              onClick={() => sendReview(props.card.packageid)}
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
    {/* </div> */}
      </>
    );
  
}
