json.parcels do
  json.partial! partial: '/parcels/parcel',
                collection: @parcels, as: :parcel
end
