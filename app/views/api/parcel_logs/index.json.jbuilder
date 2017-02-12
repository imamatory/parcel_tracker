json.parcel_logs do
  json.partial! partial: '/api/parcel_logs/parcel_log',
                collection: @parcel_logs, as: :parcel_log
end
