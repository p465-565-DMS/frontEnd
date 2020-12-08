import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MDBCol, MDBBtn} from "mdbreact";
import { Form } from 'react-bootstrap';
import CartListing from "./card.js";
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

// const callSecureApi = async (payload)  =>{
//   const token = await getAccessTokenSilently();
//   fetch(`${apiUrl}/user/review`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//   },
//   body: payload,
// }).then((response) => {
//   if (!response.ok) {
//     console.log("SOMETHING WENT WRONG");
//   } else {
//     console.log("SUCCESSS");
//   }
// });
// };

// const sendReview = (packageid) => {  
//   let payload = JSON.stringify({
//     review,
//     packageid
//   });
//   callSecureApi(payload);
//   };



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
                <CardBody >
                  {/* {data.map(renderCard)} */}
                  {data.map((value) => {
                  return <CartListing card={value} />;
                  })}
                  {data.length === 0 ? (
                    <h5>
                      Looks Like you don't have any order history!
                    </h5>
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }