const budgetWordingReducer = (state = {}, action) => {
    if(action.type === 'SET_BUDGET_WORDING') {
        return action.payload;
    } else if (action.type === 'UNSET_BUDGET_WORDING'){
        return {};
    } else {
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default budgetWordingReducer;