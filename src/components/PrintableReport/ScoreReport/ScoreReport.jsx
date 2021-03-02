import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Col, Row} from 'react-bootstrap';


const SubHeader = styled.p `
    font-size: 1.4rem;
    text-decoration: underline;
`

export default function ScoreReport({qa}) {

    return (
        <Container>
            <SubHeader>{qa.question_text} </SubHeader>
            <Row>
                <Col xs={10}>
                    {qa.answer_text} 
                </Col>
                <Col xs={2}>
                   {qa.review_score && <span><b>Review Score: </b>{qa.review_score}</span>}
                </Col>
            </Row>   
        </Container>
    )
}