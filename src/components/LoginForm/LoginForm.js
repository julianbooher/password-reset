import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoginForm.css'
import {Container, Col, Row, Form, Button} from 'react-bootstrap';


export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginMessage = useSelector(state => state.errors.loginMessage);

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

    return (
      <Container>
        <Col>
        <Row className="login-header">
          <h2>Login</h2>
        </Row>
        <Form className="login-form" onSubmit={event => {login(event)}}>
          {loginMessage && (
            <h3 style={{marginTop: 0}} className="alert" role="alert">
              {loginMessage}
            </h3>
          )}
          <Form.Group>
            <Form.Label htmlFor="username">
              Email:
            </Form.Label>
              <Form.Control
                type="text"
                name="username"
                required
                value={username}
                onChange={event => setUsername(event.target.value)}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">
              Password:
            </Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
          </Form.Group>
          <Button 
            className="btn login-btn" 
            type="submit" 
            name="submit" 
          >
            Login
          </Button>
        </Form>
        </Col>
      </Container>
    );
}