import React from 'react';
import {useDispatch} from 'react-redux';
import {Dropdown} from 'react-bootstrap';

export default function ColumnDropdownMenu({column, value}) {
    const dispatch = useDispatch();
    return (
        <Dropdown.Item onSelect={()=>{dispatch({type: 'SET_FILTER_COLUMN', payload: column}); dispatch({type: 'UNSET_FILTER_VALUE'})}}>{value}</Dropdown.Item>
    )
}