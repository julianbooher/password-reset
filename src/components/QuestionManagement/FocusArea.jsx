import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Row, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap';

export default function FocusArea(props) {

    const dispatch = useDispatch();
    const { focusArea } = props;
    const [editMode, setEditMode] = useState(false);
    const [focusAreaText, setFocusAreaText] = useState(focusArea.focus);

    const changeFocusStatus = (event) => {
        dispatch({type: 'CHANGE_FOCUS_STATUS', payload: {
            focusId: focusArea.id,
            newStatus: event.target.value
        }})
    }

    const submitEdit = (event) => {
        dispatch({type: 'CHANGE_FOCUS_TEXT', payload: {
            focusId: focusArea.id,
            newText: focusAreaText
        }})
        setEditMode(!editMode)
    }

    return (
        <div>
            <ListGroup.Item style={{opacity: focusArea.active ? '100%' : '50%'}}>
                <Row>
                    <Col xs={8}>
                        {editMode ? 
                        <>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text" 
                                value={focusAreaText}
                                onChange={(event)=>{setFocusAreaText(event.target.value)}} 
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
                            {focusArea.focus}
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
                                defaultValue={focusArea.active}
                                onChange = {(event)=>{changeFocusStatus(event)}}
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

