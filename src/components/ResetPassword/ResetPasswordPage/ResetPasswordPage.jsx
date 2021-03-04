import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm.jsx';
import { Button } from 'react-bootstrap';
import { FiLoader } from 'react-icons/fi';


export default function LoginPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const {userid, token} = useParams();
  const resetPasswordInfo = useSelector(state => state.resetPassword);
  useEffect(() => {
    dispatch({type: 'FETCH_PASSWORD_RESET_INFO', payload: {
      id: userid,
      token: token
    }
  })
    console.log(userid);
    console.log(token)
  }, []);

  return (
    <div style={{padding: '66px'}}>
      {resetPasswordInfo === 'loading' &&
        <center>
          <h2>Loading Information</h2>
          <FiLoader/>
        </center>
      }
      {resetPasswordInfo === 'expired' &&
        <h2>Expired test</h2>
      }
      {resetPasswordInfo === 'checked' &&
        <ResetPasswordForm />
      }

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