import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendReset(action){
  try{
    const response = yield axios.get(`/api/user/${action.payload.username}`);

    // Check to ensure inputted email exists.
    if (response.data.length > 0){
      yield put ({type: 'SEND_RESET_EMAIL', payload: action.payload})
    } else {
      yield put ({type: 'EMAIL_DOES_NOT_EXIST'})
    }
  }
  catch(error){
    console.log('postApplication saga failed appSaga', error);
  }
}

//--------------------WATCHER SAGA---------------------------//
function* resetSaga() {
    yield takeLatest('SEND_RESET', sendReset);
  }
  
  export default resetSaga;