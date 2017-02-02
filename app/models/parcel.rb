class Parcel < ApplicationRecord
  enum post_status: %i(in_transit, arrived, received)
end
