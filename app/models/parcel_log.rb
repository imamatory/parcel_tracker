class ParcelLog < ApplicationRecord
  belongs_to :parcel

  # attr_accessor :post_status
  enum post_status: Parcel.post_statuses

  default_scope { order('created_at DESC') }

  validates :post_status, presence: true
  validates :parcel_id, presence: true
  validates :msg, presence: true

  include ActiveModel::Validations
  validates_with ParcelLogPostStatusValidator

  after_save :update_parcel_post_status
  after_destroy :set_previous_parcel_post_status

  private

    def update_parcel_post_status
      self.parcel.post_status = post_status
      self.parcel.save
    end

    def set_previous_parcel_post_status
      last_log = self.class.all.order("created_at").last
      self.parcel.post_status = last_log.post_status
      self.parcel.save
    end

end
