import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {AiFillFilter, AiOutlineColumnHeight} from 'react-icons/ai';

export default function ColumnDropdownToggle({column}){
    return (
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            <AiFillFilter/> <AiOutlineColumnHeight/>&nbsp;
            {column === 0 ? '' :
             column === 1 ? 'Area of Focus' :
             column === 2 ? 'Status' :
             column === 3 ? 'Budget' :
             column === 4 && 'Date'
            }
        </Dropdown.Toggle>
    )
}