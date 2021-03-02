import React from 'react';
import { useSelector } from 'react-redux';
import AppTableListCE from './AppTableListCE.jsx';
import { Table, Container, Row, Col } from 'react-bootstrap';
import HeaderDropdownCE from './HeaderDropdownCE.jsx';
import FilterCE from './FilterCE/FilterCE';
import SearchCE from './SearchCE/SearchCE';
import AdminTitle from '../AdminTitleCE/AdminTitleCE';



export default function AppTable() {

    const ceAppTableData = useSelector(state=>state.ceAppTableData);

    return (
        <>
            <Container>
                <AdminTitle ceAppTableData={ceAppTableData} />
            </Container>
            <Col>
                <Row style={{display:'flex', justifyContent:'center'}}><h2>Community Engagement Table</h2></Row>
                <Row>
                    <Col xs={4}>
                        <SearchCE/>
                    </Col>
                    <Col xs={8}>
                        <FilterCE/>
                    </Col>
                </Row>
            </Col>
            
            <Container fluid>
                    <Table 
                        striped 
                        bordered 
                        hover 
                        
                    >
                        <thead style={{backgroundColor:'#1C479A', color: 'white'}}>
                            <tr>
                                <HeaderDropdownCE title="Organization" col="1"/>
                                <HeaderDropdownCE title="Contact" col="2"/>  
                                <th>Phone</th>
                                <th>Email</th>
                                <HeaderDropdownCE title="Budget" col="3"/>
                                <HeaderDropdownCE title="Area of Focus" col="4"/>
                                <HeaderDropdownCE title="Date Recieved" col="5"/>
                                <HeaderDropdownCE title="Status" col="6"/>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ceAppTableData.length > 0 && ceAppTableData.map((app)=>(
                                <AppTableListCE key={app.id} app={app}/>)
                            )}
                        </tbody>
                    </Table>
            </Container>
        </>
    )
}