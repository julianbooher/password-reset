const previousApplications = (state = [], action) => {
  if(action.type === 'SET_PREVIOUS_APPLICATIONS') {
      return action.payload;
  }
      return state;
};

// user will be on the redux state at:
// state.user
export default previousApplications;
