import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';

export default function NotesTitle() {

    return (
        <Card style={{backgroundColor:'#1C479A', color: 'white'}}>
            <Card.Header style={{fontSize:'4rem'}}>
                <p>Notes</p>
            </Card.Header>
        </Card>
    )
}