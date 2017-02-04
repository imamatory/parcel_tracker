class ParcelLog < ApplicationRecord
  belongs_to :parcel

  # attr_accessor :post_status
  enum post_status: Parcel.post_statuses

  validates :post_status, presence: true
  validates :msg, presence: true

  validates_each :post_status do |record, attr, value|
    if Parcel.post_statuses[record.parcel.post_status] > Parcel.post_statuses[value]
      record.errors.add(attr, 'has wrong status transition')
    end
  end

  after_save :update_post_status

  # def parcel_post_status
  #   parcel.post_status
  # end

  private

    def update_post_status
      self.parcel.post_status = post_status
      self.parcel.save
    end

end
