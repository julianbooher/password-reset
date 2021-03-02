import React from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css';
import {Card, Container, Row, Button} from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

export default function RegisterPage() {

  const history = useHistory();

    return (
      <Container>
        <Row>
          <Card>
            <Card.Header className="register-header">
              <h2>Welcome to the Results Foundation Application Portal!</h2>
            </Card.Header>
            <Card.Body className="register-sub-header">
              <h4>Please take a moment to register your organization with us before moving on to the grant application</h4>
            </Card.Body>
          </Card>
        </Row>
        <Row>
            <RegisterForm />
        </Row>
          

          <center style={{paddingTop: '10px'}}>
            <p>Already registered?</p>
            <Button
              variant= 'primary'
              type="button"
              onClick={() => {
                history.push('/login');
              }}
            >
              Login
            </Button>
          </center>
      </Container>
    );
};