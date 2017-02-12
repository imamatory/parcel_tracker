import { schema } from 'normalizr'


//const postStatusSchema = new schema.Entity('postStatuses')
const parcelLogSchema = new schema.Entity('parcelLogs')
const parcelSchema = new schema.Entity('parcels')


// Сопоставление схем данных с форматом анализируемого объекта
const Schemas = {
  PARCELS: {
    parcels: [parcelSchema],
  },
  PARCEL_LOGS: {
    parcelLogs: [parcelLogSchema],
  },
}

export default Schemas
