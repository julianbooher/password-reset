import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ForgotPasswordForm.css'
import {Container, Col, Row, Form, Button} from 'react-bootstrap';


export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const resetMessage = useSelector(state => state.errors.resetMessage);

  const reset = (event) => {
    event.preventDefault();

    if (username) {
      dispatch({
        type: 'SEND_RESET',
        payload: {
          username: username,
        },
      });
    } 
  }; // end login

    return (
      <Container>
        <Col>
        <Row className="send-reset-header">
          <h2>Reset Password</h2>
        </Row>
        <Form className="send-reset-form" onSubmit={event => {reset(event)}}>
          {resetMessage && (
            <h3 style={{marginTop: 0}} className="alert" role="alert">
              {resetMessage}
            </h3>
          )}
          <Form.Group>
            <Form.Label htmlFor="username">
              Please enter your Email:
            </Form.Label>
              <Form.Control
                type="text"
                name="username"
                required
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
          </Form.Group>
          <Button 
            className="btn send-reset-btn" 
            type="submit" 
            name="submit" 
          >
            Reset Password
          </Button>
        </Form>
        </Col>
      </Container>
    );
}