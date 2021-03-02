import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TenPointScaleCE from './TenPointScaleCE.jsx';
import {Container, Row} from 'react-bootstrap';


export default function Score({q}) {
    const dispatch=useDispatch();
    const numberLine = [...Array(11).keys()];
    const [selectedNumbers, setSelectedNumbers] = useState(q.review_score);
    const detailsData = useSelector(state=>state.detailsData);
    return (
        <Container>
            <Row>
                <h3>Enter Score</h3> 
                <p>('X' means you do not want a score)</p>
            </Row>
            <Row>
                {numberLine.map((number) => (
                    <TenPointScaleCE key={number} 
                        selected={selectedNumbers >= number} 
                        number={number} 
                        onSelect={()=>{
                            setSelectedNumbers(number); 
                            dispatch({
                                type:'UPDATE_CE_SCORE', 
                                payload: {score: number, q_id: q.id, app_id:detailsData.id}
                            })
                        }
                    }/>
                ))}
            </Row>
        </Container>
    )

}