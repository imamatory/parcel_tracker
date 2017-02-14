json.extract!(parcel_log,
              :id,
              :parcel_id,
              :msg,
              :post_status)

json.extract!(parcel_log.parcel, :track_code)
json.date parcel_log.created_at.to_formatted_s(:db)
