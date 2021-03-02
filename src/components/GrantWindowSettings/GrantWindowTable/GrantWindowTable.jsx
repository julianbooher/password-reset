import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row} from 'react-bootstrap';
import GrantWindowTableRow from './GrantWindowTableRow.jsx'

export default function GrantWindowTable() {

  const previousWindows = useSelector(state => state.previousWindows);

    return (
      <div>
        {/* {JSON.stringify(previousWindows)} */}
        <Container>
          <Row style={{display:'flex', justifyContent:'center'}}><h2>Previous Grant Windows</h2></Row>
          <Table striped bordered hover >
                <thead style={{backgroundColor:'#1C479A', color: 'white'}}>
                    <tr>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Applications</th>
                    </tr>
                </thead>
                <tbody>
                    {previousWindows.length > 0 && previousWindows.map((window)=>(
                        <GrantWindowTableRow key={window.id} window={window}/>
                        ))}
                </tbody>
            </Table>
        </Container>
      </div>
    );
}

