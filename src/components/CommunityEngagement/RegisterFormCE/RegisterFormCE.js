import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterFormCE.css'
import {Form, Container, Button, Alert} from 'react-bootstrap';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [contactName, setContactName] = useState('');


  const registrationMessage = useSelector(state => state.errors.registrationMessage);

  // This function was created by a stackoverflow user here: 
  //https://stackoverflow.com/questions/12175111/validate-accept-only-emails-from-a-specific-domain-name
  
  
  const validateEmail = (email) => { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
        //Email valid. Proceed to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
        if(email.indexOf("@results.net", email.length - "@results.net".length) !== -1){
            //VALID
            return true
        }
    }
    return false
}

  const registerUser = (event) => {
    event.preventDefault();
    if (password !== passwordConfirm){
      dispatch({type: 'PASSWORD_DOES_NOT_MATCH'})
    } else if (!validateEmail(username)){
      dispatch({type: 'INVALID_RESULTS_EMAIL'})
    } else if (username && password && passwordConfirm && phone && contactName){
      dispatch({
        type: 'REGISTER_CE',
        payload: {
          username: username,
          password: password,
          orgName: 'RE/MAX Results',
          phone: phone,
          contactName: contactName
        },
      });
    } 
  }; // end registerUser


    return (
     <Container style={{backgroundColor: 'aliceblue', margin: 'auto'}}>
      <Form className="register-form" onSubmit={event => {registerUser(event)}}>
        <h2>Register Community Engagement Profile</h2>
          {registrationMessage && (
          <Alert variant="danger">
            {registrationMessage}
          </Alert>
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
