import { throttle, takeEvery, delay } from 'redux-saga'
import { select, take, call, put, fork } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as actions from '../actions'
import * as types from '../actions/Types'
import { getUserData, getIsUserLoggedIn } from '../store/selectors'
import { API_FETCH_DELAY } from '../constants'


const forwardTo = (url) => {
  browserHistory.push(url)
}

const injectUserData = (obj, userData) =>
  Object.assign({}, obj, {
    data: {
      ...userData,
    },
  })

function* fetchEntity(action) {
  // console.log(action);
  const { entityRequestActions: entity, apiFun, id, method, data } = action
  yield put(entity.request(id))
  const { response, error } = yield call(apiFun, id, method, data)
  if (response) {
    yield put(entity.success(response, id))

    if (action.nextAction) {
      yield put(action.nextAction())
    }
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


// function* callFetchEntity(action) {
//   const userData = yield select(getUserData)
//   yield call(fetchEntity, injectUserData(action, userData))
// }

function* callFetchEntity(action) {
  const { isUserDataNeeded } = action
  const isLoggedIn = yield select(getIsUserLoggedIn)

  if (isLoggedIn && isUserDataNeeded) {
    const userData = yield select(getUserData)
    yield call(fetchEntity, injectUserData(action, userData))
  } else {
    yield call(fetchEntity, action)
  }
}

function* watchCallApiAsync() {
  yield takeEvery(types.FETCH_ENTITIES_LIST, callFetchEntity)
}

function* watchSubmit() {
  yield takeEvery(types.SUBMIT_ENTITY_FORM, callFetchEntity)
}

function* watchLogin() {
  yield takeEvery(types.SUBMIT_USER_DATA, () => {
    forwardTo('/parcels/')
  })
}

function* watchLogout() {
  yield takeEvery(types.RESET_USER, () => {
    forwardTo('/')
  })
}

function* watchSubmitFormSuccess() {
  yield takeEvery(types.SUBMIT_FORM.SUCCESS, (action) => {
    // console.log(action);
    // forwardTo('/')
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
    fork(watchSubmitFormSuccess),
    fork(watchLogin),
    fork(watchLogout),
  ]
}
