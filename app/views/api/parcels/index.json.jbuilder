json.parcels do
  json.partial! partial: '/api/parcels/parcel',
                collection: @parcels, as: :parcel
end
