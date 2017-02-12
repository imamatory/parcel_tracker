import { normalize } from 'normalizr'
import axios from 'axios'
import qs from 'qs'

import Schemas from './schema'

// const API_ROOT = '/dist/list.json';

const callApi = (endpoint, id, schema) => {
  const fullUrl = endpoint
  const method = 'GET'
  const dataParamName = method === 'POST' ? 'data' : 'params'

  return axios(fullUrl, {
    method,
    [dataParamName]: id ? { id } : {},
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    //headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // paramsSerializer: params =>
    //   qs.stringify(params, { encode: false }),
  })
    .then(response => normalize(response.data, schema))
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Error while fetching' }),
    )
}

export const submitParcels = data => callApi('/test/edit/', data)

export const fetchParcelsList = id => callApi('/api/parcels/', id, Schemas.PARCELS)
export const fetchParcelLogsList = id => callApi('/api/parcel_logs', id, Schemas.PARCEL_LOGS)
