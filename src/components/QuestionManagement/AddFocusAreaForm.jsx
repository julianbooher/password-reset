import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

export default function AddQuestionForm() {

    const dispatch = useDispatch();
    const [newFocusArea, setNewFocusArea] = useState('');

    const submitFocusArea = (event) => {
        event.preventDefault();
        dispatch({type: 'POST_NEW_FOCUS_AREA', payload: {newFocusArea: newFocusArea}})
    }

    return (
        <div>
            <h2 style={{paddingTop: '15px' }}>Add Focus Area</h2>
            <Container>
                <Card>
                    <Form onSubmit={(event) => {submitFocusArea(event)}} >
                        <Row>
                            <Col xs={12} sm={8}>
                                <Form.Group style={{margin: "1em"}}>
                                    <Form.Control 
                                        as="textarea" 
                                        value={newFocusArea}
                                        onChange={(event)=>{setNewFocusArea(event.target.value)}}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={4}>
                            <Button style={{margin: "1em"}} variant="primary" type="submit">
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