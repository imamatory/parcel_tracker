json.extract!(parcel,
              :id,
              :track_code,
              :post_status,
              :src_addr,
              :dest_addr,
              :phone)
json.date parcel.created_at.to_formatted_s(:db)
