import { createSelector } from 'reselect'


export const getParcels = state => state.entities.parcels
export const getParcelLogs = state => state.entities.parcelLogs
export const getIsFetching = state => state.isFetching

export const getParcelIds = state => state.lists.parcels
export const getParcelLogIds = state => state.lists.parcelLogs.logs
export const getParcelLogTrackCode = state => state.lists.parcelLogs.trackCode

const entityByIds = (getEntities, getListIds) =>
  createSelector(
    getEntities,
    getListIds,
    (entities, listIds) =>
      listIds.reduce((acc, id) => acc.concat(entities[id] || []), [])
  )

export const getParcelsList = entityByIds(getParcels, getParcelIds)
export const getCurrentParcelLog = entityByIds(getParcelLogs, getParcelLogIds)
