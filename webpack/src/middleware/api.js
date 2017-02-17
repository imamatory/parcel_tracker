import { normalize } from 'normalizr'
import { isObjectLike } from 'lodash'
import snakeCaseKeys from 'snakecase-keys'
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
  const dataParamName = method === 'POST' || method === 'PATCH' ? 'data' : 'params'

  return axios(fullUrl, {
    method,
    [dataParamName]: isObjectLike(p.data) ?
      snakeCaseKeys(p.data, { deep: true }) : p.data,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })
    .then((response) => {
      if (isObjectLike(response.data) && p.schema !== null) {
        return normalize(response.data, p.schema)
      } else {
        return response
      }
    })
    .then(
      response => ({ response }),
      error => ({ error }),
    )
}

export const fetchParcelsList = ({ id = '' }, _, data) => callApi({
  url: `/api/parcels/${id}`,
  schema: Schemas.PARCELS,
  method: 'GET',
  data,
})

export const fetchParcelLogsList = ({ trackCode = '', id = '' }) => callApi({
  url: `/api/parcels/${trackCode}/parcel_logs/${id}`,
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

export const submitParcel = ({ trackCode = '' }, method, data) => callApi({
  url: `/api/parcels/${trackCode}`,
  schema: Schemas.PARCELS,
  method: method || 'POST',
  data,
})
