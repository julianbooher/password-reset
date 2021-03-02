import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchApplication(action){
    const currentWindow = yield axios.get(`/api/grant-window/current-window`);
    let axiosRoute = '/api/app-check/'
    // if there is currently a window, add that to the route parameters.
    // otherwise it will run a seperate route without a grant window as a parameter
    // this ensures that no matter if there is a current window or not, the user cannot submit duplicate applications.
    if (currentWindow.data.id){
      axiosRoute += currentWindow.data.id
    } 
    console.log('inside fetchApplication', axiosRoute)
    const response = yield axios.get(axiosRoute);
    yield put({type:'SET_APPLICATION', payload: response.data});
}

function* postApplication(action){
  try{
    yield axios.post(`/api/application`, action.payload);
    yield put ({ type: 'FETCH_APPLICATION' });
    yield put ({ type: 'POST_EMAIL_CONFIRMATION', payload: action.payload });
  }
  catch(error){
    console.log('postApplication saga failed appSaga', error);
  }
}

function* postCeApplication(action){
  try{
    yield axios.post(`/api/application/ce`, action.payload);
    yield put ({ type: 'FETCH_APPLICATION' });
    yield put ({ type: 'POST_CE_CONFIRMATION', payload: action.payload });
  }
  catch(error){
    console.log('postApplication saga failed appSaga', error);
  }
}

function* postCeConfirmation(action){
  try {
    yield axios.post(`/api/mail/ce/confirmation`, action.payload);
    yield axios.post(`/api/mail/ce/notification`, action.payload);
  }
  catch(error){
    console.log('postCeConfirmation saga failed appSaga', error);
  }
}

function* postEmailConfirmation(action){
  try{
    yield axios.post(`/api/mail/confirmation`, action.payload);
    yield axios.post(`/api/mail/notification`, action.payload);
  }
  catch(error){
    console.log('postEmailConfirmation saga failed appSaga', error);
  }
}

function* fetchPreviousApplications(action){
  const response = yield axios.get('/api/application/previous-applications');
  yield put({type:'SET_PREVIOUS_APPLICATIONS', payload: response.data});
}

//--------------------WATCHER SAGA---------------------------//
function* applicationSaga() {
  yield takeLatest('FETCH_APPLICATION', fetchApplication);
  yield takeLatest('POST_APPLICATION', postApplication);
  yield takeLatest('POST_CE_APPLICATION', postCeApplication);
  yield takeLatest('POST_EMAIL_CONFIRMATION', postEmailConfirmation);
  yield takeLatest('FETCH_PREVIOUS_APPLICATIONS', fetchPreviousApplications);
  yield takeLatest('POST_CE_CONFIRMATION', postCeConfirmation)
}

export default applicationSaga;
