const budgetReducer = (state = [], action) => {
    if(action.type === 'SET_BUDGET') {
        return action.payload;
    } else if (action.type === 'UNSET_BUDGET'){
        return [];
    } else {
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default budgetReducer;