import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Divider from '@material-ui/core/Divider';
import {useHistory } from "react-router-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SearchLocationInput from '../components/googleAutocomplete/rateAndShipAddress1';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  FormGroup,
  Container,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";


const selectButton = () => (
    <Route render={({history}) => (
      <Button
        type='button'
        onClick={() => {
            history.push('/search-result');
        }}
        aria-label="Check"
        size="sm"
      >
        Select
      </Button>
    )} />
)


// const renderCard = (card, index) => {
//     return(
//         <Card className="d-flex flex-column mt-2">
//         <Row>
//             <Col>
//                 <div className="pl-5 col-example text-left">{card.companyname}</div>
//             </Col>
//             <Col>
//                 <div className="pl-5 col-example text-left">{card.address}</div>
//             </Col>
//             <Col>
//                 <div className="p-2 col-example text-left">{card.pspeed}</div>
//             </Col>
//             <Col>
//                 <div className="p-2 col-example text-left">{card.ptype}</div>
//             </Col>
//             <Col>
//                 <div className="p-2 col-example text-left">{card.pweight}</div>
//             </Col>
//             <Col>
//                 <div className="p-2 col-example text-left">{card.psize}</div>
//             </Col>
//             <Col>
//                 <div className="p-2 col-example text-left">{card.price}</div>
//             </Col>
//             <Col>
//                 <Button className="m-1" outline color="danger" size="sm">select</Button>
//             </Col>
//         </Row>
//     </Card>
//     )
// }


export default function SearchResult(props) {
    const [userId, setUser] = useState({});
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    const history = useHistory();
    const q = localStorage.result;
    const deadline = localStorage.getItem("deliveryDate");
    const fullAddress1 = localStorage.getItem("fullAddress1");
    const fullAddress2 = localStorage.getItem("fullAddress2");
    console.log(q);
    console.log(fullAddress1, fullAddress2, deadline);
    var qList = JSON.parse(q);
    console.log(qList[0])

    const renderCard = (card) => {
      return(
      <Card style = {{fontSize : "11px", width : "30%", marginRight: "20px"}}>
        <div style = {{backgroundColor:"#ef8157"}}>
          <CardTitle style={{marginLeft: "10px"}} tag="h4">{card.companyname}</CardTitle>  
          <CardBody style={{backgroundColor: "whitesmoke"}}>
            <CardText>
              <div className="content text-left">
                <p><i class="now-ui-icons shopping_shop"></i> {card.address}</p>
                <p><i class="now-ui-icons shopping_delivery-fast"></i> {card.pspeed}</p>
                <p><i class="now-ui-icons shopping_tag-content"></i> {card.ptype}</p>
                <p><i class="now-ui-icons shopping_basket"></i> {card.pweight}</p>
                <p><i class="now-ui-icons design-2_ruler-pencil"></i> {card.psize}</p>
                <p><i class="now-ui-icons business_money-coins"></i> ${card.price}</p>
                <Button className="btn-icon btn-round" color="danger" type="button" onClick={() => sendOrder(card)}>
                  <i className="now-ui-icons gestures_tap-01"></i>
                  </Button>
              </div>
            </CardText>
          </CardBody>
        </div>
      </Card>
      )
    }

    const sendOrder = (card) => {
      let orderInfo = JSON.stringify({
        source: card.address,
        companyname: card.companyname,
        adminid: card.adminid,
        pspeed: card.pspeed,
        ptype: card.ptype,
        psize: card.psize,
        pweight: card.pweight,
        price: card.price
      });
      console.log(orderInfo)
      localStorage.setItem("orderInfo", orderInfo);  
      history.push('/payment');
    }

    return (
      <>
        <Container className="content mt-5 pt-5">
             <Row>
             <Col md="2"/>
            <Col>
            <Row>
                <Container>
                    <h2>Search Result</h2>
                    <Row>
                        <Col md="4 pl-4">
                            <span>From:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            {`${fullAddress1}`}
                        </Col>
                        <Col md="4 pl-4">
                            <span>To:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            {`${fullAddress2}`}
                        </Col>
                        <Col md="4 pl-4">
                            <span>Deliver By:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            {`${deadline}`}
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Divider className="mt-3" variant="middle"/>
            {/* <Container className="d-flex flex-column mt-8">
                <Row>
                    <Col>
                        <div className="pl-4 col-example text-left">Company</div>
                    </Col>
                    <Col>
                        <div className="pl-4 col-example text-left">Address</div>
                    </Col>
                    <Col>
                        <div className="pl-4 col-example text-left">Speed</div>
                    </Col>
                    <Col>
                        <div className="pl-4 col-example text-left">Content</div>
                    </Col>
                    <Col>
                        <div className="pl-4 col-example text-left">Weight</div>
                    </Col>
                    <Col>
                        <div className="pl-4 col-example text-left">Size</div>
                    </Col>
                    <Col>
                        <div className="pl-2 col-example text-left">Price</div>
                    </Col>
                </Row>
                <Divider variant="middle"/>
            </Container> */}
            <Container className="d-flex flex-column mt-8">
                {/* <Row>
                <div>
                    {qList.map(renderCard)}
                </div>
                </Row> */}
                <div>
                  {qList.map(renderCard)}
                </div>
                <Divider variant="middle"/>
            </Container>
            </Col>
            <Col md="2"/>
          </Row>
        </Container>
      </>
    );
}