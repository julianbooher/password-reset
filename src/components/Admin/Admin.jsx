import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Container, Row, ButtonGroup, Col, ToggleButton} from 'react-bootstrap';
import AppTableCE from '../CommunityEngagement/AppTableCE/AppTableCE'
import AppTableList from './AppTable/AppTableList.jsx';
import AdminTitle from './AdminTitle/AdminTitle.jsx';
import HeaderDropdown from './AppTable/HeaderDropdown.jsx';
import Filter from './Filter/Filter.jsx';
import Search from './Search/Search.jsx';

export default function Admin() {
    const dispatch = useDispatch();
    const appTableData = useSelector(state=>state.appTableData);
    const [radioValue, setRadioValue] = useState('1');

    // Options for the radio toggler to switch between community engagement view and regular view.
    const radios = [
        { name: 'Results Foundation Applicants', value: '1' },
        { name: 'Community Engagement', value: '2' },
      ];


    
    useEffect(() => {
        dispatch({type: 'FETCH_APP_TABLE_DATA'})
        dispatch({type: 'FETCH_CE_APP_TABLE_DATA'})
    }, [dispatch]);
 
    return(
        <>
        {/* Radio toggle, switches between standard and CE tables. */}
        <Container style={{textAlign: 'center'}}>
            <ButtonGroup toggle>
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="secondary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>
        </Container>
        { radioValue === '1' &&
        <>
            <Container>
                <AdminTitle />
            </Container>
            <Col>
                <Row style={{display:'flex', justifyContent:'center'}}><h2>Applications Table</h2></Row>
                <Row>
                    <Col xs={4}><Search/></Col>
                    <Col xs={8}><Filter /></Col>
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
                            <HeaderDropdown title="Organization" col="1"/>
                            <HeaderDropdown title="Contact" col="2"/>  
                            <th>Phone</th>
                            <th>Email</th>
                            <HeaderDropdown title="Budget" col="3"/>
                            <HeaderDropdown title="Area of Focus" col="4"/>
                            <HeaderDropdown title="Date Recieved" col="5"/>
                            <HeaderDropdown title="Status" col="6"/>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appTableData.length > 0 && appTableData.map((app)=>(
                            <AppTableList key={app.id} app={app}/>)
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
        }
        { radioValue === '2' && 
            <AppTableCE/>
        
        }
            </>
    )
}