import React from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment'
import {Button} from 'react-bootstrap';
import swal from 'sweetalert';


export default function GrantWindowInfo(props) {

    const { changeEditMode, editMode, currentWindow } = props;
    const dispatch = useDispatch();

    // currency formatter
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

      // Function to close the current grant window if there is one.
    const closeWindow = () => {

        swal({
            title: "Are you sure?",
            text: "Once the current grant window is closed, the end date will become today's date and you will not be able to reopen it.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willClose) => {
            if (willClose) {
                dispatch({type: 'CLOSE_WINDOW', payload: currentWindow.id})
                swal("Current grant window has been closed!", {
                icon: "success",
                });
            } else {
                swal("Cancelled! Grant window remains open!");
            }
            });
    }

  return (
    <div className ="current-grant-window-info">
        <h3>Current Grant Window runs from {moment(currentWindow.start_date).format('LL')} to {moment(currentWindow.end_date).format('LL')}</h3>
        <h4>Budget: {formatter.format(currentWindow.funds_available)}</h4>
        <h4>Number of applications: {currentWindow.app_count}</h4>
        <Button onClick={(event)=>{changeEditMode(!editMode)}}>Edit Current Grant Window</Button>
        <Button onClick={(event)=>{closeWindow()}}>Close Current Grant Window</Button>
    </div>
  );
}

