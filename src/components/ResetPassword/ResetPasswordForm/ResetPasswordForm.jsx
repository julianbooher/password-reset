import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ResetPasswordForm.css'
import {Container, Col, Row, Form, Button, Alert} from 'react-bootstrap';


export default function LoginForm(props) {

  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const resetMessage = useSelector(state => state.errors.resetMessage);
  const successMessage = useSelector(state => state.successMessages.resetSuccessMessage);

  const {token, id} = props;

  const reset = (event) => {
    event.preventDefault();

    if (password === passwordConfirm) {
      dispatch({
        type: 'SEND_FINAL_RESET',
        payload: {
          password: password,
          token: token,
          id: id
        },
      });
    } else {
      dispatch({
        type: 'RESET_PASSWORD_DOES_NOT_MATCH',
      })
    }
  }; // end login

    return (
      <Container>
        <Col>
        <Row className="send-reset-header">
          <h2>Please Reset Your Password</h2>
        </Row>
        <Form className="send-reset-form" onSubmit={event => {reset(event)}}>
          {resetMessage && (
            <Alert style={{marginTop: 0}} variant="danger">
              {resetMessage}
            </Alert>
          )}
          {successMessage &&(
            <Alert variant="primary">{successMessage}</Alert>
          )}
          <Form.Group>
          <Form.Label htmlFor="password">
            New Password
            <br></br>
          </Form.Label>
            <Form.Control
              className="register"
              type="password"
              name="password"
              value={password}
              required
              onChange={event => setPassword(event.target.value)}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="passwordConfirm">
            Confirm New Password
            <br></br>
          </Form.Label>
          <Form.Control
            className="register confirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            style={{
              border: password === passwordConfirm && passwordConfirm ?
              'green 1px solid'
              :
              'red 1px solid'
            }}
            required
            onChange={event => setPasswordConfirm(event.target.value)}
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