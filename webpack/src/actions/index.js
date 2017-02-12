import * as types from './Types'
import * as api from '../middleware/api'

function action(type, payload = {}) {
  return { type, ...payload }
}

const createRequestCallbacks = requestActionType => ({
  request: name => action(requestActionType.REQUEST, { name }),
  success: (response, name) => action(requestActionType.SUCCESS, { response, name }),
  failure: error => action(requestActionType.FAILURE, { error }),
})

// ИЗБЫТОЧНО!! достаточно одного набора RequestCallbacks для сопровождения любого запроса?
const loadParcelsRequest = createRequestCallbacks(types.ENTITIES_LIST)
const loadParcelLogsRequest = createRequestCallbacks(types.ENTITIES_LIST)

export const loadParcels = id => action(types.FETCH_ENTITIES_LIST,
  {
    id,
    entityRequestActions: loadParcelsRequest,
    apiFun: api.fetchParcelsList,
  })
export const loadParcelLogs = id => action(types.FETCH_ENTITIES_LIST,
  {
    id,
    entityRequestActions: loadParcelLogsRequest,
    apiFun: api.fetchParcelLogsList,
  })
