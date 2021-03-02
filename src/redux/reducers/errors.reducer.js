import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return "Oops! The username and password didn't match. Try again!";
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'PASSWORD_DOES_NOT_MATCH':
      return 'Password does not match Password Confirmation!'
    case 'INVALID_RESULTS_EMAIL':
      return 'Invalid email for Community Engagement profile! You must have a results.net domain!'
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    case 'CE_REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

// resetMessage holds error message for the password reset components
const resetMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_RESET_ERROR':
      return '';
    case 'EMAIL_DOES_NOT_EXIST':
      return 'The email you have entered does not exist, have you registered an account?';
    default:
      return state;
  }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  resetMessage,
});
