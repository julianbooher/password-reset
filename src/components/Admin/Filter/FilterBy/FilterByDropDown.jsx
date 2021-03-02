import React from 'react';
import {Dropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {AiFillFilter} from 'react-icons/ai'
import {GiChoice} from 'react-icons/gi';

export default function FilterByDropdown() {
    const filterValue = useSelector(state=>state.filterValue);
    return (
        <Dropdown.Toggle variant="success" id="dropdown-basic">
            <AiFillFilter/> <GiChoice/>&nbsp;
                {filterValue}
        </Dropdown.Toggle>
    )
}
