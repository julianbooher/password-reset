import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* sendReset(action){
  try{
    const response = yield axios.get(`/api/user/${action.payload.username}`);

    // Check to ensure inputted email exists.
    if (response.data.length > 0){
      // TODO - Potentially send the response instead of forwarding on the payload. Could include more data that way potentially.
      yield put ({type: 'SEND_RESET_EMAIL', payload: action.payload})
    } else {
      yield put ({type: 'EMAIL_DOES_NOT_EXIST'})
    }
  }
  catch(error){
    console.log('sendReset saga failed reset.saga.js', error);
  }
}

function* sendResetEmail(action){
  try{
    yield axios.post(`/api/reset/email/${action.payload.username}`);
    yield put ({type: 'CLEAR_RESET_ERROR'})
    yield put ({type: 'EMAIL_SENT'})
  }
  catch(error){
    console.log('sendResetEmail saga failed reset.saga.js', error);
  }
}

//--------------------WATCHER SAGA---------------------------//
function* resetSaga() {
  yield takeLatest('SEND_RESET', sendReset);
  yield takeLatest('SEND_RESET_EMAIL', sendResetEmail);
}
  
  export default resetSaga;