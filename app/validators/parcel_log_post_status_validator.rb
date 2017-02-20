# Checks whether parcel_log.post_status has been changed correctly

class ParcelLogPostStatusValidator < ActiveModel::Validator
  def validate(record)
    statuses = Parcel.post_statuses
    if statuses[record.parcel.post_status] > statuses[record.post_status]
      record.errors.add(:post_status, 'invalid status for this parcel')
    end
  end
end
