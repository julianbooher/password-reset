const applicationReducer = (state = {}, action) => {
    if(action.type === 'SET_APPLICATION') {
        return action.payload;
    }
        return state;
  };
  
  // user will be on the redux state at:
  // state.user
  export default applicationReducer;