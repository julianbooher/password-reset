import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import grantWindowSaga from './grantWindow.saga';
import applicationSaga from './application.saga';
import tableSaga from './table.saga';
import notesSaga from './notes.saga';
import reviewStatusSaga from './reviewStatus.saga';
import reviewSaga from './review.saga';
import focusAreaSaga from './focusArea.saga';
import questionSaga from './question.saga';
import uberSaga from './uber.saga';
import greetingSaga from './greeting.saga';
import filterSaga from './filter.saga';
import resetSaga from './reset.saga'


export default function* rootSaga() {
  yield all([
    loginSaga(), 
    registrationSaga(),
    userSaga(),
    grantWindowSaga(),
    applicationSaga(),
    tableSaga(),
    notesSaga(),
    reviewStatusSaga(),
    reviewSaga(),
    focusAreaSaga(),
    questionSaga(),
    uberSaga(),
    greetingSaga(),
    filterSaga(),
    resetSaga()
  ]);
}
