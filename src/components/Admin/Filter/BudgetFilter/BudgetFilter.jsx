import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, InputGroup, Button, FormControl} from 'react-bootstrap';

export default function BudgetFilter() {

    const dispatch = useDispatch();
    const lowBudget = useSelector(state=>state.lowBudget);
    const highBudget = useSelector(state=>state.highBudget);
    const handleBudgetFilter = (event) => {
        event.preventDefault();
        dispatch({type:'FILTER_BUDGET', payload: {lowBudget:lowBudget, highBudget: highBudget}});
    }

    return(
        <Form inline onSubmit={(event)=>{handleBudgetFilter(event)}}>
            <Form.Label>From</Form.Label> 
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    style={{width: '90px'}}
                    required
                    value={lowBudget} 
                    onChange={(event)=>{dispatch({type:'SET_LOW_BUDGET', payload: event.target.value})}}
                />
            </InputGroup>
            <Form.Label>To</Form.Label> 
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    style={{width:'90px'}}
                    required 
                    value={highBudget} 
                    onChange={(event)=>{dispatch({type: 'SET_HIGH_BUDGET', payload: event.target.value})}}
                />
            </InputGroup>
            <Button type="submit">Filter</Button>
        </Form>
    )
}