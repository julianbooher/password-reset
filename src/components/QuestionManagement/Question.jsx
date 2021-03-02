import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap';

export default function Question(props) {

    const dispatch = useDispatch();
    const { question } = props;
    const [editMode, setEditMode] = useState(false);
    const [questionText, setQuestionText] = useState(question.question_text);

    const changeQuestionStatus = (event) => {
        dispatch({type: 'CHANGE_QUESTION_STATUS', payload: {
            questionId: question.id,
            newStatus: event.target.value
        }})
    }

    const submitEdit = (event) => {
        dispatch({type: 'CHANGE_QUESTION_TEXT', payload: {
            questionId: question.id,
            newText: questionText
        }})
        setEditMode(!editMode)
    }

    return (
        <div>
            <ListGroup.Item style={{opacity: question.active ? '100%' : '50%'}}>
                <Row>
                    <Col xs={8}>
                        {editMode ? 
                        <>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text" 
                                value={questionText}
                                onChange={(event)=>{setQuestionText(event.target.value)}} 
                            />
                            <InputGroup.Append>
                                <Button 
                                    variant="outline-secondary"
                                    onClick={(event)=>{submitEdit(event)}}
                                >
                                    Save
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                        </>
                        :
                        <>
                            {question.question_text}
                        </>
                        }
                    </Col>
                    <Col xs={2}>
                        <Button size="sm" onClick={(event)=>{setEditMode(!editMode)}}>
                            {editMode ? 
                            'Cancel'
                            :
                            'Edit'
                            }
                        </Button>
                    </Col>                    
                    <Col xs={2}>
                        <Form>
                            <Form.Group style={{marginBottom: 0}}>
                            <Form.Control 
                                size="sm" 
                                as="select"
                                defaultValue={question.active}
                                onChange = {(event)=>{changeQuestionStatus(event)}}
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Disabled</option>
                            </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>

                </Row>
            </ListGroup.Item>
        </div>
    );
}

