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
const submitParcelLogRequest = createRequestCallbacks(types.SUBMIT_FORM)
const submitParcelRequest = createRequestCallbacks(types.SUBMIT_FORM)

export const loadParcels = data => action(types.FETCH_ENTITIES_LIST,
  {
    data,
    entityRequestActions: loadParcelsRequest,
    apiFun: api.fetchParcelsList,
  })

export const loadParcelLogs = id => action(types.FETCH_ENTITIES_LIST,
  {
    id,
    entityRequestActions: loadParcelLogsRequest,
    apiFun: api.fetchParcelLogsList,
  })

export const submitParcelLogForm = (actionName, id) => data => action(types.SUBMIT_ENTITY_FORM,
  {
    id,
    actionName,
    entityRequestActions: submitParcelLogRequest,
    apiFun: api.submitParcelLog,
    data,
  })

export const submitParcelForm = (actionName, id) => data => action(types.SUBMIT_ENTITY_FORM,
  {
    id,
    actionName,
    entityRequestActions: submitParcelRequest,
    apiFun: api.submitParcel,
    data,
  })

export const setEditorMode = () => action(types.SET_EDITOR_MODE)

export const submitUserData = data => action(types.SUBMIT_USER_DATA, data)
