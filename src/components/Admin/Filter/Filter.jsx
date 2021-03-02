import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Row, Dropdown, Button} from 'react-bootstrap';
import {AiOutlineClear} from 'react-icons/ai';
import ColumnDropdownMenu from './FilterColumn/ColumnDropdownMenu.jsx';
import ColumnDropdownToggle from './FilterColumn/ColumnDropdownToggle.jsx';
import FilterBy from './FilterBy/FilterBy.jsx';
import BudgetFilter from './BudgetFilter/BudgetFilter.jsx';
import DateFilter from './DateFilter/DateFilter.jsx';

export default function Filter () {
   const dispatch = useDispatch();
   const filterColumn = useSelector(state=>state.filterColumn);
   const columnMenu = [{column: 1, value: 'Area of Focus'}, 
            {column: 2, value: 'Status'}, {column: 3, value: 'Budget'}, 
            {column: 4, value: 'Dates'}]; //Object ceated to pass into the ColumnDropDownMenu function
   
   return(
       <Container>
        <Row>
                <Dropdown title="Select Filter Column">
                    <ColumnDropdownToggle column = {filterColumn}/>
                    <Dropdown.Menu>
                        {columnMenu.map((c, i) => (<ColumnDropdownMenu key={i} column = {c.column} value={c.value}/>))}
                    </Dropdown.Menu>
                </Dropdown>
            {filterColumn < 3 ?
                <FilterBy />
            : filterColumn === 3 ? 
                <BudgetFilter />
            :
                <DateFilter/>
            }
            <Button variant="danger" title="Clear Filter Settings"
                    onClick={()=>{
                        dispatch({type:'FETCH_APP_TABLE_DATA'});
                        dispatch({type:'UNSET_FILTER_VALUE'});
                        dispatch({type: 'UNSET_FILTER_COLUMN'});
                        dispatch({type: 'UNSET_LOW_BUDGET'});
                        dispatch({type: 'UNSET_HIGH_BUDGET'});
                    }}>
                        <AiOutlineClear/>
            </Button>
        </Row>
        </Container>
    )
}