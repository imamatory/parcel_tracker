class ParcelsController < ApplicationController
  respond_to :json
  rescue_from ActiveRecord::RecordNotFound,       with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid,        with: :record_invalid
  rescue_from ActionController::ParameterMissing, with: :bad_request

  before_filter :require_parcel_data, only: :index

  def index
    @parcels = Parcel.where('phone = ?', params[:phone])
  end

  def manage
    @parcels = Parcel.all
  end

  def show
    @parcel = Parcel.find_by_track_code(params[:track_code])
  end

  private

    def require_parcel_data
      params.require(:phone)
      params.require(:track_code)
    end

    def record_not_found
      render nothing: true, status: :not_found
    end

    def record_invalid
      render nothing: true, status: :unprocessable_entity
    end

    def bad_request
      render nothing: true, status: :bad_request
    end
end
