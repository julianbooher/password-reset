import { put, takeLatest } from 'redux-saga/effects';


function* fetchFocusAreaQuestion(){
  yield put({ type: 'FETCH_ACTIVE_QUESTIONS' });
  yield put({ type: 'FETCH_ACTIVE_FOCUS_AREA' });
  yield put({ type: 'FETCH_BUDGET_WORDING'});
}

function* fetchCeQuestions(){
  yield put({ type: 'FETCH_ACTIVE_CE_QUESTIONS' });
  yield put({ type: 'FETCH_BUDGET_WORDING'});
}

//--------------------WATCHER SAGA---------------------------//
function* uberSaga() {
  yield takeLatest('FETCH_FOCUS_QUESTION', fetchFocusAreaQuestion);
  yield takeLatest('FETCH_CE_QUESTION', fetchCeQuestions);
}

export default uberSaga;