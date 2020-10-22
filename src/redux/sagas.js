import {takeEvery, put, call} from 'redux-saga/effects';
import { REQUEST_POSTS, FETCH_POSTS } from './types';
import { showAlert, hideLoader, showLoader } from './actions';

export function* sagaWatcher() {
    //
    yield takeEvery(REQUEST_POSTS, sagaWorker)
}
//put - диспатчит события 

function* sagaWorker() {
    try {
        yield put(showLoader());
        const payload = yield call(fetchPosts)
        //fetchPosts
        yield put({ type: FETCH_POSTS, payload})
        yield put(hideLoader())        
    } catch(e) {
        yield put(showAlert('Что то пошло не так'));
        yield put(hideLoader())        
    }
}

async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    return await response.json()
  }