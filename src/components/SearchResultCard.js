import React from "react";
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

const SearchResultCard = () => {
  return (
    <Card className="d-flex flex-column mt-5">
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
  );
};

export default SearchResultCard;