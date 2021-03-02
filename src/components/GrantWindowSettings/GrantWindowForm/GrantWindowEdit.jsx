import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import DatePicker from "react-datepicker";
import {Button} from 'react-bootstrap';
import './GrantWindowForm.css'
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


export default function GrantWindowEdit(props) {

  // Getting the functions and variables to change the edit mode from the GrantWindowSettings component
  // currentWindow has the window info to populate the input fields of the edit form.
  const { changeEditMode, editMode, currentWindow } = props;
  const startDate = moment(currentWindow.start_date).toDate();
  const [endDate, setEndDate] = useState(moment(currentWindow.end_date).toDate());
  const [budget, setBudget] = useState(currentWindow.funds_available);
  
  const dispatch = useDispatch();

  // function to convert the datepicker format to a more digestable format in SQL.
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  // function to convert the current date for the start date on the DOM.
  function convertDom(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear(), ].join("/");
  }

  // onSubmit function for the grant window edit form.
  const updateGrantWindow = (event) => {
    event.preventDefault();
    // Convert the dates from react-datepicker to SQL dates
    const convertedStartDate = convert(startDate)
    const convertedEndDate = convert(endDate)

    // Send all necessary info to the saga.
    dispatch({type: 'UPDATE_GRANT_WINDOW', payload: {
      startDate: convertedStartDate, 
      endDate: convertedEndDate,
      budget: budget,
      windowId: currentWindow.id
    }})

    // Change the edit mode back to false on the GrantWindowSettings component.
    changeEditMode(!editMode);
  }

    return (
      <form onSubmit={event => {updateGrantWindow(event)}} className="grant-window-form">
        <h2>Create a New Grant Window</h2>
        Start Date: {convertDom(startDate)}
        <div className="date-pickers">
          <DatePicker
            placeholderText = "End Date"
            dateFormat="MM/dd/yyyy"
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <div className="budget">
          <label htmlFor="budget">Budget: </label>
          <input 
            type="number"
            name="budget"
            required
            value={budget}
            onChange={event => setBudget(event.target.value)}
          />
        </div>
        <Button type="submit">Save</Button>
        <Button onClick={(event)=>{changeEditMode(!editMode)}}>Cancel</Button>
      </form>
    );
  }

