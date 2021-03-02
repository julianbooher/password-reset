import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import './AppStatus.css';


export default function AppStatus(props) {
  const dispatch = useDispatch();

  const { app } = props;
  const user = useSelector(state => state.user)
  // TODO - potentially refactor the grant window conditional based on the grant window tied to the application, not to the current grant window.
  const currentWindow = useSelector(state => state.currentWindow);
  const currentStatus = useSelector(state => state.currentStatus);
  
  useEffect(() => {dispatch({type: 'FETCH_CURRENT_STATUS', payload: app.id})}, [dispatch, app.id]);
  
  return (
      
    <div className="appStatus" >
      
        
      <h2>Welcome Back, {user.contact_name}!</h2>
      <p>Thank you for your application.</p>
      {currentStatus && <p>Your application has been received and is currently: <b>{currentStatus.status}</b></p>}
      {currentWindow ? 
      // If there is a grant window, this message is displayed.
      <p>Our grant window runs <b>{moment(currentWindow.start_date).format('LL')}</b> to <b>{moment(currentWindow.end_date).format('LL')}</b></p>
      :
      // If there is no window, this message is displayed.
      <p>There is currently no grant window, however your application will be added to the next window that is opened.</p>
      }
      <p>We will inform you as soon as possible of our decision.</p>
    </div>
  );
}


