json.parcels do
  json.partial! partial: '/api/parcels/parcel',
                collection: [@parcel], as: :parcel
end
