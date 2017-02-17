class Parcel < ApplicationRecord
  has_many :logs, class_name: 'ParcelLog', dependent: :destroy

  # attr_accessor :post_status

  enum post_status: %i(in_transit arrived received)

  default_scope { order('created_at DESC') }

  validates :phone, presence: true, numericality: { only_integer: true }
  validates :track_code, presence: true, uniqueness: true

  validates_each :post_status do |record, attr, value|
    if Parcel.post_statuses[record.post_status] > Parcel.post_statuses[value]
      record.errors.add(attr, 'wrong status transition')
    end
  end

  validates_each :track_code do |record, attr, value|
    if record.track_code_changed? && record.persisted?
      record.errors.add(attr, 'forbidden to update')
    end
  end

  # state_machine :post_status, initial: :in_transit do
  #   after_transition do |parcel, transition|
  #     puts transition.inspect
  #     # parcel.post_status = transition
  #   end
  #
  #   event :switch_to_in_transit do
  #     transition in_transit: same
  #   end
  #
  #   event :switch_to_arrived do
  #     transition [:in_transit, :arrived] => :arrived
  #   end
  #
  #   event :switch_to_received do
  #     transition any => :received
  #   end
  #
  #   state :in_transit, :value => 0
  #   state :arrived, :value => 1
  #   state :received, :value => 2
  # end
end
