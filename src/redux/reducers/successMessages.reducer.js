import { combineReducers } from 'redux';

// resetMessage holds error message for the password reset components
const resetSuccessMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_RESET_SUCCESS':
      return '';
    case 'EMAIL_SENT':
      return 'Your password reset email has been sent, please check your inbox and follow the instructions within the email.';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  resetSuccessMessage,
});