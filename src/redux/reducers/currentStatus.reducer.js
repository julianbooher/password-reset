const currentStatusReducer = (state = {}, action) => {
    if(action.type === 'SET_CURRENT_STATUS') {
        return action.payload;
    }
        return state;
  };
  
  // user will be on the redux state at:
  // state.user
  export default currentStatusReducer;