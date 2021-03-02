import React from 'react';
import {useDispatch} from 'react-redux';
import {Dropdown} from 'react-bootstrap';

export default function FilterStatus({r}){
    const dispatch=useDispatch();
    return (
        <Dropdown.Item onSelect={()=>
            {
                dispatch({type:'FILTER_STATUS', payload: r.status});
            }}>
            {r.status}
        </Dropdown.Item>
    )
}