import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchGreeting(){
    const response = yield axios.get(`/api/greeting/`);
    yield put({type:'SET_GREETING', payload: response.data});
}


function* updateGreeting(action){
    yield axios.put(`/api/greeting/`, action.payload);
    yield put({type:'FETCH_GREETING'});

}

//--------------------WATCHER SAGA---------------------------//
function* greetingSaga() {
   yield takeLatest('FETCH_GREETING', fetchGreeting);
   yield takeLatest('UPDATE_GREETING', updateGreeting);
}

export default greetingSaga;