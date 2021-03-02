import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GrantApplicationFormInput from '../GrantApplicationFormInput/GrantApplicationFormInput';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GrantApplicationForm.css';



function GrantApplicationForm(props) {

  // hooks
  const questions = useSelector((store) => store.activeQuestion);
  const budgetWording = useSelector((store) => store.budgetWording);
  const focusArea = useSelector((store) => store.focusArea);
  const user = useSelector((store) => store.user);
  const grantWindow = useSelector((store) => store.currentWindow);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [focusAreaId, setFocusAreaId] = useState(0);
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

      dispatch({ type: 'POST_APPLICATION', 
      payload: { 
          values: values, 
          user_id: user.id, 
          grant_window_id: grantWindow.id, 
          focus_area_id: focusAreaId,
          budget: budget,
          contact: user.contact_name,
          email: user.username,
          org_name: user.org_name
        } 
      });
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_FOCUS_QUESTION' });
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
          <h2 className="headerRow">Grant Application Form</h2>
        
        <Container className="formContainer">
        <Row>
        <Col>
          <Form validated={validated} onSubmit={onSubmit}>
              {
                questions.map((question, i) => (
                  <GrantApplicationFormInput 
                    key={question.id}
                    questionChanged={questionChanged}
                    value={values[question.id]}
                    question={question}
                    required
                    className="form" />
                ))
              }
              <Form.Group>
                <Form.Label htmlFor="budget">{budgetWording.question_wording}</Form.Label>
                <Form.Control
                  required
                  name="budget"
                  type="number"
                  onChange={(e) => setBudget(e.target.value)}
                />
              </Form.Group>
              <p>Please select your area of focus from the list.</p>
              <Form.Group>
                <Form.Control 
                  as="select" 
                  onChange={(e) => setFocusAreaId(e.target.value)}
                  required
                  custom
                >
                  <option key={'empty'} value={''}>...</option>
                    {
                      focusArea.filter(focus=>focus.id!==5).map((area) => (
                        <option key={area.id} value={area.id}>{area.focus}</option>
                    ))
                    }
                </Form.Control>
              </Form.Group>
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
