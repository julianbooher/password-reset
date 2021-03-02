import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Button} from 'react-bootstrap';
import TitleCardCE from './TitleCardCE/TitleCardCE.jsx';
import ScoreComponentCE from './ScoringCE/ScoreComponentCE.jsx';
import NotesCE from './NotesCE/NotesCE.jsx';
import SidebarCE from './SidebarCE/SidebarCE';
import UpdateStatusCE from './UpdateStatusCE/UpdateStatusCE.jsx';

export default function AppDetails(){
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const detailsData = useSelector(state => state.detailsData);
    const notes = useSelector(state => state.notes);
    
    useEffect(() => {
        dispatch({type: 'FETCH_CE_DETAILS_DATA', payload: id})
        return () => {
            dispatch({type: 'UNSET_DETAILS'})
        }
    }, [dispatch, id]);
    return(
        <>
        <SidebarCE detailsData={detailsData} />
        <Container className='container' style={{backgroundColor:'#CECECE'}}>
            <TitleCardCE />
            <ScoreComponentCE />
            <NotesCE notes={notes} detailsData={detailsData}/>
            <Container>
                <Row>
                    <UpdateStatusCE />
                    <Col><Button onClick={()=>{window.open(`/#/ce/report/${id}`)}}>View Printable Report</Button></Col>
                    <Col><Button onClick={()=>{history.push('/admin')}}>Back to Admin Main Page</Button></Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}