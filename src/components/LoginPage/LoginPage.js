import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';
import { Button } from 'react-bootstrap';


export default function LoginPage() {

  const history = useHistory();

  return (
    <div style={{padding: '66px'}}>
      <LoginForm />

      <center style={{paddingTop: '10px'}}>
        <p>Not registered?</p>
        <Button
          className="btn login-btn" 
          variant= 'primary'
          type="button"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
        <p>Forgot Password?</p>
        <Button
          className="btn login-btn" 
          variant= 'primary'
          type="button"
          onClick={() => {
            history.push('/forgotpassword');
          }}
        >
          Reset Password
        </Button>
      </center>
    </div>
  );
}