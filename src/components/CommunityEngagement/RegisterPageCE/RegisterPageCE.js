import React from 'react';
import { useHistory } from 'react-router-dom';
import './RegisterPageCE.css';
import {Card, Container, Row, Button} from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterFormCE from '../RegisterFormCE/RegisterFormCE';

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
              <h4>Please take a moment to register your Results Foundation Community Engagement profile using a results.net email!</h4>
            </Card.Body>
          </Card>
        </Row>
        <Row>
            <RegisterFormCE />
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