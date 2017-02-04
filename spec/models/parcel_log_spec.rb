require 'rails_helper'
require 'pry-byebug'

RSpec.describe ParcelLog, type: :model do
  before do
    @parcel = Parcel.new(:track_code => "CN123RU", :phone => 900200600)
    @parcel.save
  end

  it "is valid with valid attributes" do
    puts Parcel.post_statuses
    parcel_log = @parcel.logs.build(msg: "Hi", post_status: :arrived)
    expect(parcel_log.valid?).to be true
  end

  it "not valid with wrong status transition" do
    pp = @parcel.logs.build(msg: "Hi", post_status: :arrived)
    pp.save
    parcel_log = @parcel.logs.build(msg: "Hi2", post_status: :in_transit)
    expect(parcel_log.valid?).to be false
  end
end