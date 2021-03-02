import React from 'react';
import {useDispatch} from 'react-redux';
import {Dropdown} from 'react-bootstrap';

export default function FilterFocus({f}) {

    const dispatch=useDispatch();
    
    return (
        <Dropdown.Item onSelect={()=>
            {
                dispatch({type:'FILTER_FOCUS', payload: {id: f.id, focus: f.focus}});
            }}>
                {f.focus}
        </Dropdown.Item>
    )
}