require 'rails_helper'

RSpec.describe "parcels/manage.json.jbuilder", type: :view do
  it 'should return full list of parcels' do
    assign(:parcels, FactoryGirl.create_list(:parcel, 10))

    render

    json = JSON.parse(rendered)

    expect(json['parcels'].length).to eq(10)

  end
end
