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

// Complex types
export const ENTITIES_LIST = createRequestTypes(FETCH_ENTITIES_LIST)
