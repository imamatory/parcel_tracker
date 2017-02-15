import { throttle, takeEvery, delay } from 'redux-saga'
import { select, take, call, put, fork } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as actions from '../actions'
import * as types from '../actions/Types'
import { getUserData } from '../store/selectors'
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
  const { phone, trackCode: track_code } = yield select(getUserData)

  yield call(fetchEntity, Object.assign({}, action, {
    data: {
      phone,
      track_code,
    },
  }))
}

export function* watchCallApiAsync() {
  yield takeEvery(types.FETCH_ENTITIES_LIST, callFetchEntity)
}

export function* watchSubmit() {
  yield takeEvery(types.SUBMIT_ENTITY_FORM, callFetchEntity)
}

export function* watchAuth() {
  yield takeEvery(types.SUBMIT_USER_DATA, () => {
    browserHistory.push('/parcels/')
  })
}

// export function* watchPollparcelsApi() {
//   yield throttle(API_FETCH_DELAY, types.FETCH_PARCELS_LIST.SUCCESS, pollParcelsListApi)
// }

export default function* rootSaga() {
  yield [
    // fork(watchPollparcelsApi),
    fork(watchCallApiAsync),
    fork(watchSubmit),
    fork(watchAuth),
  ]
}
