FactoryGirl.define do
  factory :parcel do
    sequence(:track_code) {|n| n.to_s }
    src_addr 'Moscow'
    dest_addr 'China'
    phone { "7999888777#{Random.rand(1..3)}" }
  end
end
