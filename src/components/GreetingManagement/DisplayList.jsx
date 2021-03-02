import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Row, Col, Form, FormControl, FormGroup, Button} from 'react-bootstrap';
import swal from 'sweetalert';

// this functional component is displaying the welcome page information
// in an editable format
export default function DisplayList({g}) {

    const dispatch = useDispatch();

    const [header, setHeader] = useState(g.header);
    const [message, setMessage] = useState(g.message);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        swal({
            title: "Change Greeting",
            text: "You are about submit changes to this greeting. Once submitted, changes cannot be cancelled. OK?",
            icon: "info",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch({type:'UPDATE_GREETING', payload:{header:header, message: message, render_position:g.render_position}});
              swal("Greeting updated!", {
                icon: "success",
              });
            } else {
              swal("Change to greeting was not committed");
            }
          });
    }

    return(
            <div key={g.render_position}>
                <Form onSubmit={(event)=>handleSubmit(event)}>
                    <FormGroup as={Row}>
                        <Form.Label>Header {g.render_position}</Form.Label>
                        <Col lg={8}>
                            <FormControl
                                
                                aria-label="Header Field"
                                value={header}
                                onChange={((event)=>setHeader(event.target.value))}
                            /> 
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row}>
                        <Form.Label>Text Area {g.render_position}</Form.Label>
                        <Col lg={8}>
                            <FormControl
                                    as="textarea"
                                    rows={12}
                                    value={message}
                                    onChange={((event)=>setMessage(event.target.value))}
                                />
                        </Col>
                        <Col>
                            <Button type="submit" variant="success">Submit</Button>
                            <Button variant="danger">Cancel</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
    )
}