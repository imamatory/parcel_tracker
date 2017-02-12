json.extract!(parcel_log,
              :id,
              :parcel_id,
              :msg,
              :post_status,
              :updated_at)

json.extract!(parcel_log.parcel, :track_code)
