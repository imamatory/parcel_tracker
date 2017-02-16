import { normalize } from 'normalizr'
import { isObjectLike } from 'lodash'
import axios from 'axios'

import Schemas from './schema'


const callApi = (params = {}) => {
  const defaultParams = {
    url: '',
    schema: null,
    method: 'GET',
    data: {},
  }
  const p = Object.assign({}, defaultParams, params)

  const fullUrl = `${p.url}${p.url.endsWith('/') ? '' : '/'}`
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
    .then(response => (isObjectLike(response.data) ?
      normalize(response.data, p.schema) : response))
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Error while fetching' }),
    )
}

export const fetchParcelsList = ({ id = '' }, _, data) => callApi({
  url: `/api/parcels/${id}`,
  schema: Schemas.PARCELS,
  method: 'GET',
  data,
})

export const fetchParcelLogsList = ({ trackCode = '', id = '' }) => callApi({
  url: `/api/parcel_logs/${id || trackCode}`,
  schema: Schemas.PARCEL_LOGS,
  method: 'GET',
})

export const submitParcelLog = ({ trackCode = '', id = '' }, method, data) => callApi({
  id: { id },
  url: `/api/parcels/${trackCode}/parcel_logs/${id}`,
  schema: Schemas.PARCEL_LOGS,
  method: method || 'POST',
  data,
})

export const submitParcel = ({ id = '' }, method, data) => callApi({
  url: `/api/parcels/${id}`,
  schema: Schemas.PARCELS,
  method: method || 'POST',
  data,
})
