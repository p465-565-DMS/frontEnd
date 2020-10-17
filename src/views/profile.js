import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Highlight } from "../components";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import profileCss from "../css/profile.css";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-regular';


const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  const object = JSON.parse(JSON.stringify(user, null, 2));
  const Button = () => (
    <Route render={({ history}) => (
      <button
        type='button'
        onClick={() => { history.push('/profileEdit') }}
        class="btn btn-default"
        aria-label="Edit"
      >
        <FontAwesomeIcon icon={faEdit}/>
      </button>
    )} />
  )

  return (
    <Container className="profileContainer">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <FontAwesomeIcon icon="home"/>
          <FontAwesomeIcon icon="edit"/>
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </Col>
        <Col>
          <Button/>
        </Col>
      </Row>
      <Row>
        {
        /* Show all user variables
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        */
        }
        <label for="staticFirstName" class="col-sm-2 col-form-label">First Name</label>
        <Col>
          <input type="text" readonly class="form-control-plaintext" placeholder={object.nickname}/>
        </Col>
        <label for="staticLastName" class="col-sm-2 col-form-label">Last Name</label>
        <Col>
          <input type="text" readonly class="form-control-plaintext" placeholder={object.name}/>
        </Col>
      </Row>
      <Row>
        <label for="staticEmail" class="col-sm-2 col-form-label">Email Address</label>
        <Col>
          <input type="text" class="form-control-plaintext" placeholder={object.email} disabled/>
        </Col>
        <label for="staticLastUpdate" class="col-sm-2 col-form-label">Last Update</label>
        <Col>
          <input type="text" class="form-control-plaintext" placeholder={object.updated_at} disabled/>
        </Col>
      </Row>
      <Row>
        <label for="staticDoB" class="col-sm-2 col-form-label">Date of Birth</label>
        <Col>
          <input type="text" class="form-control-plaintext" placeholder={" "} disabled/>
        </Col>
        <label for="staticRoleId" class="col-sm-2 col-form-label">Role</label>
        <Col>
          <input type="text" class="form-control-plaintext" placeholder={" "} disabled/>
        </Col>
      </Row>
      <Row>
        <label for="staticAddress" class="col-sm-2 col-form-label">Address</label>
        <Col>
          <input type="text" class="form-control-plaintext" placeholder={" "} disabled/>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;