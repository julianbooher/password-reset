import React, {useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm.jsx';
import { Button } from 'react-bootstrap';


export default function LoginPage() {

  const history = useHistory();
  const {userid, token} = useParams();
  useEffect(() => {
    console.log(userid);
    console.log(token)
  }, []);

  return (
    <div style={{padding: '66px'}}>
      <ResetPasswordForm />

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