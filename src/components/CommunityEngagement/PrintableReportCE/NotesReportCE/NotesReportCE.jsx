import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import moment from 'moment';


export default function NotesReport(props) {
    const {n} = props;
    return (
        <Container>
            <p><b>Last Modified</b> {moment(n.date_added).format('LL')}</p>
            <p>{n.review_note}</p>
        </Container>
    )
}