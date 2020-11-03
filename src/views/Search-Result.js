import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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

export default function SearchResult(props) {
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
                            <span>Jordan Ave Bloomington</span>
                        </Col>
                        <Col md="4 pl-4">
                            <span>To:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>E Rogers Rd Bloomington</span>
                        </Col>
                        <Col md="4 pl-4">
                            <span>Date:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span>12/31/2020</span>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Divider className="mt-2" variant="middle"/>
            <Card className="d-flex flex-column mt-5">
                <Row>
                    <Col md="4">
                        <div className="p-2 col-example text-left">Company</div>
                    </Col>
                    <Col md="4">
                        <div className="p-2 col-example text-left">Estimate Arrival Date</div>
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">Price</div>
                    </Col>
                </Row>
                <Divider variant="middle"/>
                
                <Row>
                    <Col md="4">
                        <div className="p-2 col-example text-left">Hermes</div>
                    </Col>
                    <Col md="4">
                        <div className="p-2 col-example text-left">01/01/2020</div>
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">$15</div>
                    </Col>
                    <Col md="2">
                        <button className="m-1">select</button>
                    </Col>
                </Row>

                <Row>
                    <Col md="4">
                        <div className="p-2 col-example text-left">UPS</div>
                    </Col>
                    <Col md="4">
                        <div className="p-2 col-example text-left">02/01/2020</div>
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">$17</div>
                    </Col>
                    <Col md="2">
                        <button className="m-1">select</button>
                    </Col>
                </Row>

                <Row>
                    <Col md="4">
                        <div className="p-2 col-example text-left">USPS</div>
                    </Col>
                    <Col md="4">
                        <div className="p-2 col-example text-left">03/01/2020</div>
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">$20</div>
                    </Col>
                    <Col md="2">
                        <button className="m-1">select</button>
                    </Col>
                </Row>
                
            </Card>
            </Col>
            <Col md="2"/>
          </Row>
        </Container>
      </>
    );
}