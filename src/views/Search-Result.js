import React, { useState, useEffect } from "react";
import Divider from '@material-ui/core/Divider';
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

export default function SearchResult(props) {
    return (
      <>
        <div className="content mt-5 pt-5">
             <Row>
             <Col md="2"/>
            <Col md="8">
            <Row>
                <h2>Search Result</h2>
            </Row>
            <Row>
                <Col md="4">
                    <span>From:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>Jordan Ave Bloomington</span>
                </Col>
                <Col md="4">
                    <span>To:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>E Rogers Rd Bloomington</span>
                </Col>
                <Col md="4">
                    <span>Date:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>12/31/2020</span>
                </Col>
            </Row>
            <Divider variant="middle"/>
              <Card className="d-flex flex-column mt-5">
                <Row>
                    <Col md="1">
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">Company</div>
                    </Col>
                    <Col md="4">
                        <div className="p-2 col-example text-left">Estimate Arrival Date</div>
                    </Col>
                    <Col md="2">
                        <div className="p-2 col-example text-left">Price</div>
                    </Col>
                </Row>
            </Card>
            <Card className="d-flex flex-column-reverse">
                <div className="p-2 col-example text-left">Flex item 1</div>
                <div className="p-2 col-example text-left">Flex item 2</div>
                <div className="p-2 col-example text-left">Flex item 3</div>
            </Card>
            </Col>
            <Col md="2"/>
          </Row>
        </div>
      </>
    );
}