const resetPassword = (state = 'loading', action) => {
    if(action.type === 'CORRECT_RESET_PASSWORD_INFO') {
        return 'checked';
    } else if(action.type === 'EXPIRED_RESET_PASSWORD_INFO'){
        return 'expired'
    } else if (action.type === 'UNSET_RESET_PASSWORD_INFO'){
        return 'loading'
    } else if (action.type === 'RESET_PASSWORD_SUCCESS'){
        return 'success'
    }else{
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default resetPassword;