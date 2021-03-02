import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Dropdown, Button, InputGroup, Form, FormControl} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {AiOutlineClear, AiFillFilter, AiOutlineColumnHeight} from 'react-icons/ai';
import {GiChoice} from 'react-icons/gi';

export default function Filter () {
   const dispatch = useDispatch();
   const [filterValue, setFilterValue] = useState('none');
   const [column, setColumn] = useState(0);
   const [budgetLow, setBudgetLow] = useState(0);
   const [budgetHigh, setBudgetHigh] = useState(0);
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
   const reviewStatus = useSelector(state=>state.reviewStatus);
   const handleBudgetFilter = (event) => {
       event.preventDefault();
       dispatch({type:'FILTER_CE_BUDGET', payload: {budgetLow:budgetLow, budgetHigh: budgetHigh}});
   }
   const handleDateFilter = (event) => {
       event.preventDefault();
       let startDateConv = convert(startDate);
       let endDateConv = convert(endDate);
       dispatch({type: 'FILTER_CE_DATES', payload: {startDate: startDateConv, endDate:endDateConv}});
   }

   function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

   return(
    <Container>
        <Row>
            <Dropdown title="Select Filter Column">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <AiFillFilter/> <AiOutlineColumnHeight/>&nbsp;
                    {column === 0 ? ''
                    : column === 1 ? 'Status'
                    : column === 2 ? 'Budget'
                    : column === 3 && 'Date'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onSelect={()=>{setColumn(1); setFilterValue('none')}}>Status</Dropdown.Item>
                    <Dropdown.Item onSelect={()=>{setColumn(2); setFilterValue('none')}}>Budget</Dropdown.Item>
                    <Dropdown.Item onSelect={()=>{setColumn(3); setFilterValue('none')}}>Dates</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>
            {column < 2 ?
                <>
                <Dropdown title="Filter By Value">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <AiFillFilter/><GiChoice/>
                    {filterValue}
                </Dropdown.Toggle>
                {column === 1 ?
                        <Dropdown.Menu>
                            {reviewStatus.map((r)=>
                                <Dropdown.Item onSelect={()=>
                                    {
                                        dispatch({type:'FILTER_CE_STATUS', payload: r.status});
                                        setFilterValue(r.status);
                                    }}>
                                    {r.status}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    : <Dropdown.Menu>Select Column First</Dropdown.Menu>
                }
                </Dropdown>
                </>
            : column === 2 ? 
                <Form inline onSubmit={(event)=>{handleBudgetFilter(event)}}>
                    <Form.Label>From</Form.Label> 
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            required
                            value={budgetLow} 
                            onChange={(event)=>{setBudgetLow(event.target.value)}}
                        />
                    </InputGroup>
                    <Form.Label>To</Form.Label> 
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl 
                            required 
                            value={budgetHigh} 
                            onChange={(event)=>{setBudgetHigh(event.target.value)}}
                        />
                    </InputGroup>
                    <Button type="submit">Filter</Button>
                </Form>
            :
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
            }
            
            <Button variant="danger" 
                    title="Clear Filter Settings"
                    onClick={()=>{
                        dispatch({type:'FETCH_CE_APP_TABLE_DATA'});
                        setFilterValue('none');
                        setColumn(0);
                        setBudgetHigh(0);
                        setBudgetLow(0);
                    }}>
                        <AiOutlineClear/>
            </Button>
        </Row>
    </Container>
    )
}