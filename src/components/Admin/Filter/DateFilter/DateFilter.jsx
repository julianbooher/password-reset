import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, InputGroup, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFilter() {
    const dispatch=useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    //function to dispatch the date filter for the table
    const handleDateFilter = (event) => {
        event.preventDefault();
        let startDateConv = convert(startDate);
        let endDateConv = convert(endDate);
        dispatch({type: 'FILTER_DATES', payload: {startDate: startDateConv, endDate:endDateConv}});
    }
    //Date conversion function
    function convert(str) {
     var date = new Date(str),
       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
       day = ("0" + date.getDate()).slice(-2);
     return [date.getFullYear(), mnth, day].join("-");
   }

return (
    <Form onSubmit={(event)=>{handleDateFilter(event)}} inline>
        <Form.Label>From</Form.Label> 
        <InputGroup>
            <DatePicker
                placeholderText = "End Date"
                dateFormat="MM/dd/yyyy"
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
            />
        </InputGroup>
        <Form.Label>To</Form.Label> 
        <InputGroup>
            <DatePicker
                placeholderText = "End Date"
                dateFormat="MM/dd/yyyy"
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
            />
        </InputGroup>
        <Button type="submit">Filter</Button>
</Form>
    )
}