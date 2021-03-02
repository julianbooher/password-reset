import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// For the results foundation applicants table
function* filterBudget(action){
    const response = yield axios.get(`/api/filter/budget/${action.payload.lowBudget}/${action.payload.highBudget}`);
    yield put({type: 'SET_APP_TABLE_DATA', payload: response.data});
}

function* filterDates(action){
    const response = yield axios.get(`/api/filter/dates/${action.payload.startDate}/${action.payload.endDate}`);
    yield put({type: 'SET_APP_TABLE_DATA', payload: response.data});
}

function* filterFocus(action) {
    const response = yield axios.get(`/api/filter/focus/${action.payload.id}`);
    yield put({type: 'SET_APP_TABLE_DATA', payload: response.data});
    yield put({type: 'SET_FILTER_VALUE', payload: action.payload.focus});
}

function* filterStatus(action) {
    const response = yield axios.get(`/api/filter/status/${action.payload}`);
    yield put({type: 'SET_APP_TABLE_DATA', payload: response.data});
    yield put({type: 'SET_FILTER_VALUE', payload: action.payload});

}

function* searchTable(action) {
    const response = yield axios.get(`/api/filter/search/${action.payload}`);
    yield put({type: 'SET_APP_TABLE_DATA', payload: response.data});  
}


// For the Community Engagement Table
function* filterCeBudget(action){
    const response = yield axios.get(`/api/filter/ce/budget/${action.payload.budgetLow}/${action.payload.budgetHigh}`);
    yield put({type: 'SET_CE_APP_TABLE_DATA', payload: response.data});
}

function* filterCeDates(action){
    const response = yield axios.get(`/api/filter/ce/dates/${action.payload.startDate}/${action.payload.endDate}`);
    yield put({type: 'SET_CE_APP_TABLE_DATA', payload: response.data});
}

function* filterCeStatus(action) {
    const response = yield axios.get(`/api/filter/ce/status/${action.payload}`);
    yield put({type: 'SET_CE_APP_TABLE_DATA', payload: response.data});
}

function* searchCeTable(action) {
    const response = yield axios.get(`/api/filter/ce/search/${action.payload}`);
    yield put({type: 'SET_CE_APP_TABLE_DATA', payload: response.data});  
}
//--------------------WATCHER SAGA---------------------------//
function* filterSaga() {
    yield takeLatest('FILTER_FOCUS', filterFocus);
    yield takeLatest('FILTER_STATUS', filterStatus);
    yield takeLatest('FILTER_BUDGET', filterBudget);
    yield takeLatest('FILTER_DATES', filterDates);
    yield takeLatest('SEARCH_TABLE', searchTable)
    yield takeLatest('FILTER_CE_STATUS', filterCeStatus);
    yield takeLatest('FILTER_CE_BUDGET', filterCeBudget);
    yield takeLatest('FILTER_CE_DATES', filterCeDates);
    yield takeLatest('SEARCH_CE_TABLE', searchCeTable)
  }
  
  export default filterSaga;