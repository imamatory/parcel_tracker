require 'rails_helper'
require 'pry-byebug'

RSpec.describe ParcelLog, type: :model do
  before do
    @parcel = Parcel.new(:track_code => 'CN123RU', :phone => 900200600)
    @parcel.save
  end

  it 'is valid with valid attributes' do
    log1 = @parcel.logs.build(msg: 'Hi', post_status: :arrived)

    expect(log1.save).to be true

    log2 = @parcel.logs.build(msg: 'Hi2', post_status: :received)

    expect(log2.save).to be true
  end

  it 'not valid with wrong status transition' do
    log1 = @parcel.logs.build(msg: 'Hi', post_status: :arrived)

    expect(log1.save).to be true

    log2 = @parcel.logs.build(msg: 'Hi2', post_status: :in_transit)

    expect(log2.save).to be false
  end
end
