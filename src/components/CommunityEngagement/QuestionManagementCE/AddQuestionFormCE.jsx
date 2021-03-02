import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

export default function AddQuestionForm() {

    const dispatch = useDispatch();
    const [newQuestion, setNewQuestion] = useState('');
    const submitQuestion = (event) => {
        event.preventDefault();
        dispatch({type: 'POST_NEW_CE_QUESTION', payload: {newQuestion: newQuestion}})
    }

    return (
        <div>
            <h2 style={{paddingTop: '15px'}}>Add Community Engagement Question</h2>
            <Container>
                <Card>
                    <Form onSubmit={(event) => {submitQuestion(event)}} >
                        <Row>
                            <Col xs={12} sm={8}>
                                <Form.Group style={{margin: "1em"}}>
                                    <Form.Control 
                                        as="textarea" 
                                        value={newQuestion}
                                        onChange={(event)=>{setNewQuestion(event.target.value)}}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                            <Button style={{margin: "1em"}} variant="primary"   type="submit">
                                Submit
                            </Button>
                            </Col>

                        </Row>
                    </Form>

                </Card>
            </Container>
        </div>
    );
}