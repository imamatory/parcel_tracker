json.parcels do
  json.partial! partial: '/api/parcels/parcel',
                collection: @parcels, as: :parcel
end
json.page_info do
  json.page params[:page]
  json.count @page_count
end
