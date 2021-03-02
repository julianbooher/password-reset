const appTableReducer = (state = [], action) => {
  if(action.type === 'SET_APP_TABLE_DATA') {
      return action.payload;
  }
      return state;
};

// user will be on the redux state at:
// state.user
export default appTableReducer;
