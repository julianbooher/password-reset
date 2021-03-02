const reviewStatusReducer = (state = [], action) => {
  if(action.type === 'SET_REVIEW_STATUS') {
      return action.payload;
  }
      return state;
};

// user will be on the redux state at:
// state.user
export default reviewStatusReducer;
