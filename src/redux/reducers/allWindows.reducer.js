const allWindowsReducer = (state = {}, action) => {
  if(action.type === 'SET_ALL_WINDOWS') {
      return action.payload;
  }
      return state;
};

// user will be on the redux state at:
// state.user
export default allWindowsReducer;
