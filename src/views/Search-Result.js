import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SearchLocationInput from '../components/googleAutocomplete/rateAndShipAddress';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Container } from "@material-ui/core";


const divStyle = {
    //border: '2px solid black',
    //borderRadius: '5px'  
};

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

const renderCard = (card, index) => {
    return(
        <Card className="d-flex flex-column mt-2">
        <Row>
            <Col md="1">
            </Col>
            <Col md="3">
                <div className="pl-4 col-example text-left">{card.companyname}</div>
            </Col>
            <Col md="4">
                {/*<div className="p-2 col-example text-left">{card.}</div>*/}
            </Col>
            <Col md="2">
                <div className="p-2 col-example text-left">{card.price}</div>
            </Col>
            <Col md="2">
                <Button className="m-1" outline color="primary" size="sm">select</Button>
            </Col>
        </Row>
    </Card>
    )
}

export default function SearchResult(props) {
    const q = localStorage.result;
    console.log(q);
    var qList = JSON.parse(q);
    console.log(qList[0])
    return (
      <>
        <Container className="content mt-5 pt-5">
             <Row>
             <Col md="2"/>
            <Col md="8">
            <Row>
                <Container style={divStyle}>
                    <h2>Search Result</h2>
                    <Row>
                        <Col md="4 pl-4">
                            <span>From:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <SearchLocationInput></SearchLocationInput>
                        </Col>
                        <Col md="4 pl-4">
                            <span>To:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <SearchLocationInput></SearchLocationInput>
                        </Col>
                        <Col md="4 pl-4">
                            <span>Date:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Input placeholder="mm/dd/yyyy"></Input>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Divider className="mt-2" variant="middle"/>
            <Container className="d-flex flex-column mt-5">
                <Row>
                    <Col md="1">
                    </Col>
                    <Col md="3">
                        <div className="pr-5 col-example text-left">Company</div>
                    </Col>
                    <Col md="4">
                        {/*<div className="p-2 col-example text-left">Estimate Arrival Date</div>*/}
                    </Col>
                    <Col md="2">
                        <div className="pl-3 col-example text-left">Price</div>
                    </Col>
                    <Col md="2">
                    </Col>
                </Row>
                <Divider variant="middle"/>
            </Container>
            <div>
                {qList.map(renderCard)}
            </div>
            </Col>
            <Col md="2"/>
          </Row>
        </Container>
      </>
    );
}