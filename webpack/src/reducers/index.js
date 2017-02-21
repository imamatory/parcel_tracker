import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import * as types from '../actions/Types'

const entitiesInitialState = {
  parcels: {},
  parcelLogs: {},
  postStatuses: {},
}

const entities = (state = entitiesInitialState, action) => {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities)
  }

  return state
}

const listsParsers = (state = [], action) => {
  if (action.response && action.response.result && action.response.result.parcels) {
    return action.response.result.parcels.slice()
  }

  return state
}

const listsParserLogsInitialState = {
  trackCode: null,
  logs: [],
}

const listsParserLogs = (state = listsParserLogsInitialState, action) => {
  if (action.response && action.response.result && action.response.result.parcelLogs) {
    return Object.assign({}, state,
      {
        trackCode: action.name.trackCode,
        logs: action.response.result.parcelLogs,
      }
    )
  }

  return state
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_ENTITIES_LIST.REQUEST:
      return true
    case types.FETCH_ENTITIES_LIST.SUCCESS:
    case types.FETCH_ENTITIES_LIST.FAILURE:
      return false
    default:
      return state
  }
}

const isEditorMode = (state = false, action) => {
  if (action.type === types.SET_EDITOR_MODE) {
    return true
  }
  if (action.type === types.RESET_USER) {
    return false
  }
  return state
}

const userData = (state = {}, action) => {
  switch (action.type) {
    case types.SUBMIT_USER_DATA:
      const { phone } = action
      return { phone }
    case types.RESET_USER:
    case types.SET_EDITOR_MODE:
      return {}
    default:
      return state
  }
}

const pageInitial = {
  page: 1,
  count: null,
}

const pageInfo = (state = pageInitial, action) => {
  switch (action.type) {
    case types.SET_PAGE:
    case types.FETCH_ENTITIES_LIST.SUCCESS:
      if (action.pageInfo) {
        const { page, count } = action.pageInfo
        return { count,
          page,
        }
      }
      return state
    case types.NEXT_PAGE:
      return { ...state,
        page: state.page + 1,
      }
    case types.PREVIOUS_PAGE:
      return { ...state,
        page: Math.max(1, state - 1),
      }
    case types.RESET_USER:
    case types.SET_EDITOR_MODE:
      return {
        page: Math.max(1, state - 1),
        from: null,
      }
    default:
      return state
  }
}

const submitErrorsReducer = (state, action) => {
  switch (action.type) {
    case types.SUBMIT_FORM.FAILURE:
      if (action.error.response && action.error.response.data) {
        return {
          ...state,
          asyncErrors: action.error.response.data,
        }
      } else {
        return {
          ...state,
          asyncErrors: {
            error: action.error,
          },
        }
      }

    default:
      return state
  }
}

const form = formReducer.plugin({
  parcel: submitErrorsReducer,
  parcelLog: submitErrorsReducer,
})


const rootReducer = combineReducers({
  entities,
  isFetching,
  form,
  isEditorMode,
  userData,
  pageInfo,
  lists: combineReducers({
    parcels: listsParsers,
    parcelLogs: listsParserLogs,
  }),
})

export default rootReducer
