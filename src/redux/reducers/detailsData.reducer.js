const detailsDataReducer = (state = {}, action) => {
  if(action.type === 'SET_DETAILS_DATA') {
      return action.payload;
  } else if (action.type === 'UNSET_DETAILS_DATA'){
      return {}
  } else {
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default detailsDataReducer;
