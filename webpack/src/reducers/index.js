import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { merge } from 'lodash'
import * as types from '../actions/Types'

const entitiesInitialState = {
  parcels: {},
  parcelLogs: {},
  postStatuses: {},
}

// const parcels = (state = [], action) => {
//   if (action.type === types.FETCH_ENTITIES_LIST.SUCCESS) {
//     const parcels = action.response.entities.parcels
//     return Object.keys(parcels)
//   }
//   return state
// }

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
        trackCode: action.response.result.track_num,
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

const isEditorMode = (state = true, action) => {
  if (action.type === types.SET_EDITOR_MODE) {
    return true
  }
  return state
}


const rootReducer = combineReducers({
  entities,
  isFetching,
  form: formReducer,
  isEditorMode,
  lists: combineReducers({
    parcels: listsParsers,
    parcelLogs: listsParserLogs,
  }),
})

export default rootReducer
