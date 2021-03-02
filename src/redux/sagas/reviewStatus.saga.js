import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchStatusDropdown(action){
    const response = yield axios.get(`/api/review-status/`);
    yield put({type:'SET_REVIEW_STATUS', payload: response.data});
}

function* fetchAdminReviewStatus(action) {
  const response = yield axios.get(`/api/review-status/${action.payload}`);
  yield put({type:'SET_CURRENT_STATUS', payload: response.data});
}

function* fetchCurrentStatus(action){
  const response = yield axios.get(`/api/application/status/${action.payload}`);
  yield put({type:'SET_CURRENT_STATUS', payload: response.data});
}

function* updateStatus(action){
  yield axios.put(`/api/review-status/`, action.payload);
  yield put({type: 'FETCH_ADMIN_REVIEW_STATUS', payload: action.payload.id});
}

function* updateCeStatus(action){
  yield axios.put(`/api/review-status/ce`, action.payload);
  yield put({type: 'FETCH_ADMIN_REVIEW_STATUS', payload: action.payload.id});
}

//--------------------WATCHER SAGA---------------------------//
function* reviewStatusSaga() {
  yield takeLatest('FETCH_STATUS_DROPDOWN', fetchStatusDropdown);
  yield takeLatest('FETCH_ADMIN_REVIEW_STATUS', fetchAdminReviewStatus);
  yield takeLatest('FETCH_CURRENT_STATUS', fetchCurrentStatus);
  yield takeLatest('UPDATE_STATUS', updateStatus);
  yield takeLatest('UPDATE_CE_STATUS', updateCeStatus);
}

export default reviewStatusSaga;
