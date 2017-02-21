// side-effect types
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    const eventName = `${base}_${type}`
    return Object.assign(acc, { [type]: eventName })
  }, {})
}

// Plain types
export const FETCH_ENTITIES_LIST = 'FETCH_ENTITIES_LIST'
export const SET_EDITOR_MODE = 'SET_EDITOR_MODE'
export const SUBMIT_ENTITY_FORM = 'SUBMIT_ENTITY_FORM'
export const SUBMIT_USER_DATA = 'SUBMIT_USER_DATA'
export const RESET_USER = 'RESET_USER'
export const START_POLL_ENTITIES = 'START_POLL_ENTITIES'
export const SET_PAGE = 'SET_PAGE'
export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

// Complex types
export const ENTITIES_LIST = createRequestTypes(FETCH_ENTITIES_LIST)
export const SUBMIT_FORM = createRequestTypes(SUBMIT_ENTITY_FORM)
