import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row} from 'react-bootstrap';
import ScoreReportCE from './ScoreReportCE/ScoreReportCE.jsx';
import NotesReportCE from './NotesReportCE/NotesReportCE.jsx';
import styled from 'styled-components';
import {formatPhone} from '../../Hooks/Hooks.jsx';


const SubHeader = styled.p `
    font-size: 1.4rem;
    text-decoration: underline;
`

export default function PrintableReport() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const {budget} = useSelector(state => state.budget);
    const {org_name, focus, phone, username, contact_name} = useSelector(state => state.detailsData);
    const qANDa = useSelector(state => state.qANDa);
    useEffect(() => {dispatch({type: 'FETCH_CE_DETAILS_DATA', payload: id})}, [dispatch, id]);


    return (
        <Container style={{backgroundColor:'white'}}>
            <Container style={{textAlign:'center'}}>
                {org_name && <h1>{org_name}</h1>}
                <SubHeader>Contact Info:</SubHeader>
                {contact_name && <p>{contact_name}</p>}
                {username && <p>{username}</p>}
                {phone && <p>{formatPhone(phone)}</p>}
            </Container>
            <Container style={{textAlign:'center'}}>
                <Row>
                    <Col>
                        <SubHeader>Area of Focus:</SubHeader>
                        {focus && <p>{focus}</p>}
                    </Col>
                    <Col>
                        <SubHeader>Budget</SubHeader>
                        {budget && <p>{budget}</p>}
                    </Col>
                </Row>
            </Container>
            {qANDa.length > 0 && qANDa.map((qa) => <ScoreReportCE key={qa.id} qa={qa}/>)}
            <h3 style={{textAlign:'center'}}>Notes</h3>
            {notes.length > 0 && notes.map((n)=> <NotesReportCE n={n}/>)}
        </Container>
        
        )
}