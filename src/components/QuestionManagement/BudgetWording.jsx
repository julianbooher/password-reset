import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';

export default function BudgetWording(props) {

    const dispatch = useDispatch();
    const {budgetWording} = props;
    const [editMode, setEditMode] = useState(false);
    const [updatedWording, setUpdatedWording] = useState(budgetWording.question_wording);

    const submitEdit = (event) => {
        dispatch({type: 'CHANGE_BUDGET_WORDING', payload: {
            updatedWording: updatedWording
        }})
        setEditMode(!editMode)
    }

    return (
        <div>
            
            <ListGroup.Item>
                <Row>
                    <Col xs={8}>
                        {editMode ? 
                        <>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text" 
                                value={updatedWording}
                                onChange={(event)=>{setUpdatedWording(event.target.value)}} 
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
                            {budgetWording.question_wording}
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
                        Both Applications 
                    </Col>

                </Row>
            </ListGroup.Item>
        </div>
    );
}

