const focusArea = (state = [], action) => {
    if(action.type === 'SET_FOCUS_AREA') {
        return action.payload;
    } else if (action.type === 'SET_ACTIVE_FOCUS_AREA') {
        return action.payload;
    }
        return state;
  };
  
  export default focusArea;