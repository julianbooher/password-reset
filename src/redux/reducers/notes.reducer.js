const notesReducer = (state = {}, action) => {
  if(action.type === 'SET_NOTES') {
      return action.payload;
  } else if (action.type === 'UNSET_NOTES'){
      return {}
  } else {
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default notesReducer;
