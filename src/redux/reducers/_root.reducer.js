import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import currentWindow from './currentWindow.reducer';
import application from './application.reducer';
import appTableData from './appTableData.reducer';
import detailsData from './detailsData.reducer';
import reviewStatus from './reviewStatus.reducer';
import notes from './notes.reducer';
import allWindows from './allWindows.reducer';
import activeQuestion from './activeQuestion.reducer';
import focusArea from './focusArea.reducer';
import currentStatus from './currentStatus.reducer';
import previousWindows from './previousWindows.reducer'
import qANDa from './qANDa.reducer';
import allQuestion from './allQuestion.reducer';
import budget from './budget.reducer';
import greeting from './greeting.reducer';
import budgetWording from './budgetWording.reducer';
import ceAppTableData from './ceAppTableData.reducer';
import allCeQuestion from './allCeQuestion.reducer';
import {filterValue, filterColumn, highBudget, lowBudget} from './filter.reducer';
import previousApplications from './previousApplications.reducer'


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  currentWindow,
  application,
  appTableData,
  detailsData,
  reviewStatus,
  notes,
  allWindows,
  activeQuestion,
  focusArea,
  currentStatus, 
  previousWindows,
  qANDa,
  allQuestion,
  budget,
  greeting,
  budgetWording,
  ceAppTableData,
  allCeQuestion,
  filterValue,
  filterColumn,
  highBudget,
  lowBudget,
  previousApplications,
});

export default rootReducer;
