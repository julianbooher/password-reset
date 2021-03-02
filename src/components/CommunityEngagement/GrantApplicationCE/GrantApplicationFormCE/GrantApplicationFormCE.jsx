import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import GrantApplicationFormInputCE from '../GrantApplicationFormInputCE/GrantApplicationFormInputCE.jsx';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GrantApplicationFormCE.css';
import swal from 'sweetalert';

function GrantApplicationForm(props) {

  // hooks
  const user = useSelector((store) => store.user);
  const questions = useSelector((store) => store.activeQuestion);
  const budgetWording = useSelector((store) => store.budgetWording);
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({});
  const [budget, setBudget] = useState(0);
  const [validated, setValidated] = useState(false);
  
  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
    } else {
      e.preventDefault();
      setValidated(true);
        
      // send data to server
      dispatch({ type: 'POST_CE_APPLICATION', 
        payload: { 
          values: values, 
          budget: budget,
          contact_name: user.contact_name,
          email: user.username,
        } 
      });
      // Sweet Alert confirmation for the user.
      swal({
        title: "Thank You!",
        text: "Your application was submitted!",
        icon: "success",
        button: "View application history.",
      })
      .then((value) => {
        history.push('/applications')
      });
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_CE_QUESTION' });
    }, [dispatch]
  );

  // callback provided to components to update the main list of form values
  const questionChanged = (questionId, value) => {
    // use a callback to find the field in the value list and update it
    setValues({...values, [questionId]: value});
  };
  

  return (
    <>
        <Container className="container">
          <h2 className="headerRow">Community Engagement Grant Application Form</h2>
        
        <Container className="formContainer">
        <Row>
        <Col>
          <Form validated={validated} onSubmit={onSubmit}>
              {
                questions.map((question) => (
                  <GrantApplicationFormInputCE 
                    key={question.id}
                    questionChanged={questionChanged}
                    value={values[question.id]}
                    question={question}
                    required
                    className="form" />
                ))
              }
              <Form.Label htmlFor="budget">{budgetWording.question_wording}</Form.Label>
              <Form.Control
                required
                name="budget"
                type="number"
                onChange={(e) => setBudget(e.target.value)}
              />          
              <br />
              <Button type="submit">Submit Grant Application</Button>
          </Form>
        </Col>
        </Row>
      </Container>
      </Container>
    </>
  );
}

export default GrantApplicationForm;
