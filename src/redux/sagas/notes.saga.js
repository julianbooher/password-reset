import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteNote(action){
  yield axios.delete(`/api/notes/${action.payload.note_id}`);
  yield put({type:'FETCH_NOTES', payload: action.payload.app_id});
}

function* fetchNotes(action){
    const response = yield axios.get(`/api/notes/${action.payload}`);
    yield put({type: 'SET_NOTES', payload: response.data});
}

function* postNote(action){
  yield axios.post(`/api/notes/`, action.payload);
  yield put({type: 'FETCH_NOTES', payload: action.payload.app_id});
}

function* updateNote(action){
    yield axios.put(`api/notes/`, action.payload);
    yield put({type: 'FETCH_NOTES', payload: action.payload.app_id});
}

// ------------CE NOTES SAGAS --------------------//
function* deleteCeNote(action){
  yield axios.delete(`/api/notes/ce/${action.payload.note_id}`);
  yield put({type:'FETCH_CE_NOTES', payload: action.payload.app_id});
}

function* fetchCeNotes(action){
    const response = yield axios.get(`/api/notes/ce/${action.payload}`);
    yield put({type: 'SET_NOTES', payload: response.data});
}

function* postCeNote(action){
  yield axios.post(`/api/notes/ce/`, action.payload);
  yield put({type: 'FETCH_CE_NOTES', payload: action.payload.app_id});
}

function* updateCeNote(action){
    yield axios.put(`api/notes/ce/`, action.payload);
    yield put({type: 'FETCH_CE_NOTES', payload: action.payload.app_id});
}

//--------------------WATCHER SAGA---------------------------//
function* notesSaga() {
  yield takeLatest('FETCH_NOTES', fetchNotes);
  yield takeLatest('POST_NOTE', postNote);
  yield takeLatest('UPDATE_NOTE', updateNote);
  yield takeLatest('DELETE_NOTE', deleteNote);
  yield takeLatest('FETCH_CE_NOTES', fetchCeNotes);
  yield takeLatest('POST_CE_NOTE', postCeNote);
  yield takeLatest('UPDATE_CE_NOTE', updateCeNote);
  yield takeLatest('DELETE_CE_NOTE', deleteCeNote);
}

export default notesSaga;
