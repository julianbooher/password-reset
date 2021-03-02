const allQuestion = (state = [], action) => {
    if(action.type === 'SET_ALL_QUESTIONS') {
        return action.payload;
    }
        return state;
  };
  
  // user will be on the redux state at:
  // state.user
  export default allQuestion;