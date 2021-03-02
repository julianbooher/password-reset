import React from 'react';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import FilterFocus from './FilterFocus.jsx';
import FilterStatus from './FilterStatus.jsx';
import FilterByDropdown from './FilterByDropDown.jsx';

export default function FilterBy() {
   const focusArea = useSelector(state=> state.focusArea);
   const filterColumn = useSelector(state=>state.filterColumn);
   const reviewStatus = useSelector(state=>state.reviewStatus);

   return(
    <Dropdown title="Filter By Value">
        <FilterByDropdown />
        {filterColumn === 1 ? 
            <Dropdown.Menu>
            {focusArea.map((f)=>
                <FilterFocus key={f.id} f={f}/>
            )}
        </Dropdown.Menu>
        : filterColumn === 2 ?
            <Dropdown.Menu>
                {reviewStatus.map((r)=>
                    <FilterStatus key={r.id} r={r}/>
                )}
            </Dropdown.Menu>
        : <Dropdown.Menu>Select Column First</Dropdown.Menu>
        }
    </Dropdown>
   )
}