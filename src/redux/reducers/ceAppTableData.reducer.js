const ceAppTableReducer = (state = [], action) => {
  if(action.type === 'SET_CE_APP_TABLE_DATA') {
      return action.payload;
  }
      return state;
};


export default ceAppTableReducer;
