import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllWindows(action) {
    const response = yield axios.get(`/api/grant-window`);
    yield put({type:'SET_ALL_WINDOWS', payload: response.data});
}
function* fetchPreviousWindows(action) {
    const response = yield axios.get(`/api/grant-window/previous-windows`);
    yield put({type:'SET_PREVIOUS_WINDOWS', payload: response.data});
}

function* fetchCurrentWindow(action){
    const response = yield axios.get(`/api/grant-window/current-window`);
    yield put({type: 'SET_CURRENT_WINDOW', payload: response.data});
}

function* closeGrantWindow(action) {
    yield axios.put(`/api/grant-window/close/${action.payload}`);
    yield put({type: 'FETCH_CURRENT_WINDOW'})
    yield put({type: 'FETCH_PREVIOUS_GRANT_WINDOWS'})
}

function* postGrantWindow(action) {
    yield axios.post(`/api/grant-window`, action.payload);
    yield put({type: 'FETCH_CURRENT_WINDOW'})
}

function* updateGrantWindow(action) {
    yield axios.put(`/api/grant-window/${action.payload.windowId}`, action.payload);
    yield put({type: 'FETCH_CURRENT_WINDOW'})
}


//--------------------WATCHER SAGA---------------------------//
function* grantWindowSaga() {
  yield takeLatest('FETCH_CURRENT_WINDOW', fetchCurrentWindow);
  yield takeLatest('FETCH_ALL_WINDOWS', fetchAllWindows);
  yield takeLatest('POST_GRANT_WINDOW', postGrantWindow);
  yield takeLatest('UPDATE_GRANT_WINDOW', updateGrantWindow);
  yield takeLatest('CLOSE_WINDOW', closeGrantWindow);
  yield takeLatest('FETCH_PREVIOUS_GRANT_WINDOWS', fetchPreviousWindows);
}

export default grantWindowSaga;
