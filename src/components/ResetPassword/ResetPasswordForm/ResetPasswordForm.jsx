import React from 'react';
import { useHistory } from 'react-router-dom';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm.jsx';
import { Button } from 'react-bootstrap';


export default function LoginPage() {

  const history = useHistory();

  return (
    <div style={{padding: '66px'}}>
      <ForgotPasswordForm />

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
        <p>Remember your password?</p>
        <Button
          className="btn login-btn" 
          variant= 'primary'
          type="button"
          onClick={() => {
            history.push('/login');
          }}
        >
          Reset Password
        </Button>
      </center>
    </div>
  );
}