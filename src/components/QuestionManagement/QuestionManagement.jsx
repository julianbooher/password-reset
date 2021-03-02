import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Container, ButtonGroup, ToggleButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './Question.jsx';
import QuestionCE from '../CommunityEngagement/QuestionManagementCE/QuestionCE.jsx';
import AddQuestionForm from './AddQuestionForm.jsx';
import AddQuestionFormCE from '../CommunityEngagement/QuestionManagementCE/AddQuestionFormCE.jsx';
import BudgetWording from './BudgetWording.jsx';
import FocusArea from './FocusArea.jsx';
import AddFocusAreaForm from './AddFocusAreaForm.jsx';
import './QuestionManagement.css';



export default function QuestionManagement() {

  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState('1');

  // Radio Toggler that switches between community engagement questions and regular questions.
  const radios = [
    { name: 'Results Foundation Questions', value: '1' },
    { name: 'Community Engagement Questions', value: '2' },
  ];

  // Reducers for all questions.
  const allQuestion = useSelector(state => state.allQuestion);
  const allCeQuestion = useSelector(state => state.allCeQuestion);
  const budgetWording = useSelector(state => state.budgetWording);
  const focusArea = useSelector(state => state.focusArea);

  // Fetch the previous grant windows to populate the table.
  useEffect(() => {
    dispatch({type: 'FETCH_ALL_QUESTIONS'})
    dispatch({type: 'FETCH_ALL_CE_QUESTIONS'})
    dispatch({type: 'FETCH_BUDGET_WORDING'})
    dispatch({type: 'FETCH_FOCUS_AREA'})
  }, [dispatch])

  return (
    <div className="question-manager">
      <h2>Question Manager</h2>
      <Container style={{textAlign: 'center'}}>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Container>
      <Container>
        <ListGroup variant="flush">
          {Object.keys(budgetWording).length > 0 &&
            <BudgetWording budgetWording={budgetWording}/>          
          }
        </ListGroup>
        <ListGroup variant="flush">
          {allQuestion.length > 0 && radioValue === '1' && allQuestion.map(question => 
            (<Question key={question.id} question={question}/>))}

          {allCeQuestion.length > 0 && radioValue === '2' && allCeQuestion.map(question => 
            (<QuestionCE key={question.id} question={question}/>))}
        </ListGroup>

      {radioValue === '1' ?
        <>
        <AddQuestionForm />
          <h2 style={{paddingBottom: '15px'}}>Focus Area Manager</h2>
          <ListGroup variant="flush">
              {focusArea.length > 0 && focusArea.filter(focus=>focus.id!==5).map(focus => (
                <FocusArea key={focus.id} focusArea={focus} />
                ))}
          </ListGroup>
          <AddFocusAreaForm />
        </>
        : 
        <AddQuestionFormCE />
      }  
      </Container>
    </div>
  );
}
