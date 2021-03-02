const activeQuestion = (state = [], action) => {
    if(action.type === 'SET_ACTIVE_QUESTIONS') {
        return action.payload;
    }
        return state;
  };
  
  // user will be on the redux state at:
  // state.user
  export default activeQuestion;