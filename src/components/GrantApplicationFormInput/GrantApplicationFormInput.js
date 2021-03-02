import React from 'react';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function GrantApplicationFormInput ({ question, questionChanged, value }) {

    return (
        <>
            <Form.Group key={question.id}>
                <Form.Label htmlFor={question.id}>{question.question_text}</Form.Label>
                <Form.Control 
                    required
                    name={question.id} 
                    value={value}
                    as="textarea" rows={3}
                    onChange={(e) => {
                        // Notify the main state of the new value
                        questionChanged(question.id, e.target.value);
                    }} />
            </Form.Group>
        </>
    );
}

export default GrantApplicationFormInput;