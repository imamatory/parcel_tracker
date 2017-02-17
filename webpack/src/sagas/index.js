import { throttle, takeEvery, delay } from 'redux-saga'
import { select, take, call, put, fork } from 'redux-saga/effects'
import { browserHistory } from 'react-router'

import * as actions from '../actions'
import * as types from '../actions/Types'
import { getUserData, getIsUserLoggedIn, getParcelLogTrackCode } from '../store/selectors'
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
  const { entityRequestActions: entity, apiFun, id, method, data } = action
  yield put(entity.request(id))
  const { response, error } = yield call(apiFun, id, method, data)
  if (response) {
    yield put(entity.success({ ...action, ...response }, id))

    if (action.nextAction) {
      yield put(action.nextAction())
    }
  } else {
    yield put(entity.failure(error, id))
  }
}

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

function* watchAfterSubmitRedirect() {
  yield takeEvery(types.SUBMIT_FORM.SUCCESS, (action) => {
    if (action.response) {
      const { nextUrl, getNextUrlParam, entities } = action.response
      if (nextUrl && getNextUrlParam && entities) {
        console.log(getNextUrlParam(entities));
        forwardTo(nextUrl(getNextUrlParam(entities)))
      }
    }
  })
}

function* watchLogin() {
  yield takeEvery(types.SUBMIT_USER_DATA, ({ trackCode }) => {
    forwardTo(`/parcels/${trackCode}/parcel_logs`)
  })
}

function* watchLogout() {
  yield takeEvery(types.RESET_USER, () => {
    forwardTo('/')
  })
}

function* pollParcelsListApi() {
  yield call(delay, API_FETCH_DELAY)
  yield put({ ...actions.loadParcels(), isAutoPoll: true })

  const trackCode = yield select(getParcelLogTrackCode)

  if (trackCode) {
    yield put({ ...actions.loadParcelLogs({ trackCode }), isAutoPoll: true })
  }
}

export function* watchPollEntityApi() {
  const pattern = (action) => {
    switch (action.type) {
      case types.ENTITIES_LIST.SUCCESS:
      case types.START_POLL_ENTITIES:
        return true
      default:
        return false
    }
  }

  yield throttle(API_FETCH_DELAY, pattern, pollParcelsListApi)
}

export default function* rootSaga() {
  yield [
    fork(watchPollEntityApi),
    fork(watchCallApiAsync),
    fork(watchSubmit),
    fork(watchAfterSubmitRedirect),
    fork(watchLogin),
    fork(watchLogout),
  ]
}
