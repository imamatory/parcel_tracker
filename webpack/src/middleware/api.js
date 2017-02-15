import { normalize } from 'normalizr'
import axios from 'axios'

import Schemas from './schema'


const callApi = (params = {}) => {
  const defaultParams = {
    url: '',
    actionName: '',
    schema: null,
    method: 'GET',
    data: {},
  }
  const p = Object.assign({}, defaultParams, params)

  const fullUrl = `${p.url}${p.url.endsWith('/') ? '' : '/'}${p.actionName}`
  const method = p.method
  const dataParamName = method === 'POST' ? 'data' : 'params'

  return axios(fullUrl, {
    method,
    [dataParamName]: p.data,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // paramsSerializer: params =>
    //   qs.stringify(params, { encode: false }),
  })
    .then(response => normalize(response.data, p.schema))
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Error while fetching' }),
    )
}

export const fetchParcelsList = (id = '', _, data) => callApi({
  url: `/api/parcels/${id}`,
  schema: Schemas.PARCELS,
  method: 'GET',
  data,
})

export const fetchParcelLogsList = (id = '') => callApi({
  url: `/api/parcel_logs/${id}`,
  schema: Schemas.PARCEL_LOGS,
  method: 'GET',
})

export const submitParcelLog = (id = '', actionName = '', data) => callApi({
  url: `/api/parcels/${id}/parcel_logs`,
  schema: Schemas.PARCEL_LOGS,
  method: 'POST',
  actionName,
  data,
})

export const submitParcel = (id = '', actionName = '', data) => callApi({
  url: `/api/parcels/${id}`,
  schema: Schemas.PARCELS,
  method: 'POST',
  actionName,
  data,
})
