export const filterValue = (state = '', action) => {
    if(action.type === 'SET_FILTER_VALUE') {
        return action.payload;
    } else if (action.type === 'UNSET_FILTER_VALUE'){
        return ''
    } else {
        return state;
    }
  };
 
export const filterColumn = (state = 0, action) => {
    if(action.type === 'SET_FILTER_COLUMN') {
        return action.payload;
    } else if (action.type === 'UNSET_FILTER_COLUMN'){
        return 0
    } else {
        return state;
    }
  };

  export const lowBudget = (state = 0, action) => {
    if(action.type === 'SET_LOW_BUDGET') {
        return action.payload;
    } else if (action.type === 'UNSET_LOW_BUDGET'){
        return 0
    } else {
        return state;
    }
  };

  export const highBudget = (state = 0, action) => {
    if(action.type === 'SET_HIGH_BUDGET') {
        return action.payload;
    } else if (action.type === 'UNSET_HIGH_BUDGET'){
        return 0
    } else {
        return state;
    }
  };