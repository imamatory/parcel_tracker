import { throttle, takeEvery, delay } from 'redux-saga'
import { select, take, call, put, fork } from 'redux-saga/effects'

import * as actions from '../actions'
import * as types from '../actions/Types'
import { API_FETCH_DELAY } from '../constants'


function* fetchEntity(action) {
  const { entityRequestActions: entity, apiFun, id, actionName, data } = action

  yield put(entity.request(id))
  const { response, error } = yield call(apiFun, id, actionName, data)
  if (response) {
    yield put(entity.success(response, id))
  } else {
    yield put(entity.failure(error, id))
  }
}

// function* pollParcelsListApi() {
//   try {
//     yield call(delay, API_FETCH_DELAY)
//     yield call(fetchParcelsList)
//   } catch (e) {
//     return
//   }
// }

export function* callFetchEntity(action) {
  yield call(fetchEntity, action)
}

export function* watchCallApiAsync() {
  yield takeEvery(types.FETCH_ENTITIES_LIST, callFetchEntity)
}

export function* watchSubmit() {
  yield takeEvery(types.SUBMIT_ENTITY_FORM, callFetchEntity)
}

// export function* watchPollparcelsApi() {
//   yield throttle(API_FETCH_DELAY, types.FETCH_PARCELS_LIST.SUCCESS, pollParcelsListApi)
// }

export default function* rootSaga() {
  yield [
    // fork(watchPollparcelsApi),
    fork(watchCallApiAsync),
    fork(watchSubmit),
  ]
}
