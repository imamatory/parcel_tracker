# Checks whether parcel.post_status has been changed correctly

class ParcelPostStatusValidator < ActiveModel::Validator
  def validate(record)
    unless record.new_record?
      statuses = Parcel.post_statuses
      if statuses[record.post_status] < statuses[record.post_status_was]
        record.errors.add(:post_status, 'invalid status for this parcel')
      end
    end
  end
end
