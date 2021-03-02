import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFocusArea(action){
  const response = yield axios.get(`/api/focus`);
  yield put({ type: 'SET_FOCUS_AREA', payload: response.data });
}

function* fetchActiveFocusArea(action){
  const response = yield axios.get(`/api/focus/active`);
  yield put({ type: 'SET_ACTIVE_FOCUS_AREA', payload: response.data });
}

function* changeFocusStatus(action) {
  const { focusId, newStatus } = action.payload;
  yield axios.put(`/api/focus/status/${focusId}`, {newStatus: newStatus});
  yield put({ type:'FETCH_FOCUS_AREA' });

}

function* changeFocusText(action) {
  const { focusId, newText } = action.payload;
  yield axios.put(`/api/focus/text/${focusId}`, {newText: newText});
  yield put({ type:'FETCH_FOCUS_AREA' });
}

function* postNewFocusArea(action) {
  yield axios.post(`/api/focus`, action.payload);
  yield put({ type:'FETCH_FOCUS_AREA' });
}


//--------------------WATCHER SAGA---------------------------//
function* focusAreaSaga() {
  yield takeLatest('FETCH_FOCUS_AREA', fetchFocusArea);
  yield takeLatest('FETCH_ACTIVE_FOCUS_AREA', fetchActiveFocusArea)
  yield takeLatest('CHANGE_FOCUS_STATUS', changeFocusStatus);
  yield takeLatest('CHANGE_FOCUS_TEXT', changeFocusText);
  yield takeLatest('POST_NEW_FOCUS_AREA', postNewFocusArea)
}

export default focusAreaSaga;
