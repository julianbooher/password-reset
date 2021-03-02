import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row, Button} from 'react-bootstrap';
import TitleCard from './TitleCard/TitleCard.jsx';
import ScoreComponent from './Scoring/ScoreComponent.jsx';
import Notes from './Notes/Notes.jsx';
import Sidebar from './Sidebar/Sidebar';
import UpdateStatus from './UpdateStatus/UpdateStatus.jsx';

export default function AppDetails(){
    const history = useHistory();
    const {id} = useParams();
    const dispatch = useDispatch();
    const detailsData = useSelector(state => state.detailsData);
    const notes = useSelector(state => state.notes);
    // fetch details data to pass as props
    useEffect(() => {
        dispatch({type: 'FETCH_DETAILS_DATA', payload: id})
        return () => {
            dispatch({type: 'UNSET_DETAILS'})
        }
    }, [dispatch, id]);
    return(
        <>
        <Sidebar detailsData={detailsData} />
        <Container className='container' style={{backgroundColor:'#CECECE'}}>
            <TitleCard />
            <ScoreComponent />
            <Notes notes={notes} detailsData={detailsData}/>
            <Container>
                <Row>
                    <UpdateStatus />
                    <Col><Button onClick={()=>{window.open(`/#/report/${id}`)}}>View Printable Report</Button></Col>
                    <Col><Button onClick={()=>{history.push('/admin')}}>Back to Admin Main Page</Button></Col>
                </Row>
            </Container>
        </Container>
        </>
    )
}