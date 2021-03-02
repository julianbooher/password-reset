import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row} from 'react-bootstrap';
import PreviousApplicationsTableRow from './PreviousApplicationsTableRow.jsx'

export default function PreviousApplicationsTable() {
  // hook to get users previous applications
  const previousApplications = useSelector(state => state.previousApplications);
    // displaying previous applications in table form
    return (
      <div>
        
        <Container>
          <Row style={{display:'flex', justifyContent:'center'}}><h2>Previous Applications</h2></Row>
          <Table striped bordered hover >
                <thead style={{backgroundColor:'#1C479A', color: 'white'}}>
                    <tr>
                        <th>Date Received</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {previousApplications.length > 0 && previousApplications.map((app)=>(
                        <PreviousApplicationsTableRow key={app.id} app={app}/>
                        ))}
                </tbody>
            </Table>
        </Container>
      </div>
    );
}

