const qANDa = (state = [], action) => {
    if(action.type === 'SET_Q_AND_A') {
        return action.payload;
    } else if (action.type === 'UNSET_Q_AND_A'){
        return []
    } else{
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default qANDa;