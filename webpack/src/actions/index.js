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

const loadParcelsRequest = createRequestCallbacks(types.ENTITIES_LIST)
const loadParcelLogsRequest = createRequestCallbacks(types.ENTITIES_LIST)
const submitParcelLogRequest = createRequestCallbacks(types.SUBMIT_FORM)
const submitParcelRequest = createRequestCallbacks(types.SUBMIT_FORM)

export const loadParcels = (id = {}) => action(types.FETCH_ENTITIES_LIST,
  {
    id,
    entityRequestActions: loadParcelsRequest,
    apiFun: api.fetchParcelsList,
    isUserDataNeeded: true,
  })

export const loadParcelLogs = (id = {}) => action(types.FETCH_ENTITIES_LIST,
  {
    id,
    entityRequestActions: loadParcelLogsRequest,
    apiFun: api.fetchParcelLogsList,
  })

export const submitParcelLogForm = (method, id = {}) => data => action(types.SUBMIT_ENTITY_FORM,
  {
    id,
    method,
    entityRequestActions: submitParcelLogRequest,
    apiFun: api.submitParcelLog,
    data,
    nextAction: () => loadParcelLogs({ trackCode: id.trackCode }),
    nextUrl: ({ trackCode, id }) => `/manage/parcels/${trackCode}/parcel_logs/${id}/?action=edit&saved=true`,
    getNextUrlParam: (respData) => {
      const { trackCode, id } = Object.values(respData.parcelLogs)[0]
      return { trackCode, id }
    },
  })

export const submitParcelForm = (method, id = {}) => data => action(types.SUBMIT_ENTITY_FORM,
  {
    id,
    method,
    entityRequestActions: submitParcelRequest,
    apiFun: api.submitParcel,
    data,
    nextAction: loadParcels,
    nextUrl: trackCodeReplace => `/manage/parcels/${trackCodeReplace}/?action=edit&saved=true`,
    getNextUrlParam: respData => Object.values(respData.parcels)[0].trackCode,
  })

export const setEditorMode = () => action(types.SET_EDITOR_MODE)
export const submitUserData = data => action(types.SUBMIT_USER_DATA, data)
export const resetUserData = () => action(types.RESET_USER)
