import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css'
import {Form, Container, Button} from 'react-bootstrap';
import {formatPhone} from '../Hooks/Hooks.jsx';


export default function RegisterForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [orgName, setOrgName] = useState('');
  const [background, setBackground] = useState('');
  const [phone, setPhone] = useState('');
  const [contactName, setContactName] = useState('');


  const registrationMessage = useSelector(state => state.errors.registrationMessage);


  const registerUser = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm){
      dispatch({type: 'PASSWORD_DOES_NOT_MATCH'})
    } else if (username && password && passwordConfirm && orgName && background && phone && contactName){
      setPhone(formatPhone(phone));
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          orgName: orgName,
          background: background,
          phone: phone,
          contactName: contactName
        },
      });
    } 
  }; // end registerUser


    return (
     <Container style={{backgroundColor: 'aliceblue', margin: 'auto'}}>
      <Form className="register-form" onSubmit={event => {registerUser(event)}}>
        <h2>Register Organization</h2>
          {registrationMessage && (
          <h3 className="alert" role="alert">
            {registrationMessage}
          </h3>
        )}
        <Form.Group>
          <Form.Label htmlFor="username">
            Email
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            type="text"
            name="username"
            value={username}
            required
            onChange={event => setUsername(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">
            Password
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
            Confirm Password
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
        
        <Form.Group>
          <Form.Label htmlFor="phone">
            Phone Number
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            type="text"
            name="phone"
            value={phone}
            required
            onChange={event => setPhone(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="contactName">
            Contact Name
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            type="text"
            name="Contact Name"
            value={contactName}
            required
            onChange={event => setContactName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="orgName">
            Organization Name
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            type="text"
            name="Organization Name"
            value={orgName}
            required
            onChange={event => setOrgName(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="background">
            Organization Background
            <br></br>
          </Form.Label>
          <Form.Control
            className="register"
            as="textarea"
            rows={10}
            name="Organization Background"
            value={background}
            required
            onChange={event => setBackground(event.target.value)}
          />
        </Form.Group>
        <Form.Group style={{textAlign: 'center'}}>
          <Button 
            className="btn" 
            type="submit" 
            name="submit" 
          >
            Register
          </Button>
        </Form.Group>
      </Form>
      </Container>
    );
  }
