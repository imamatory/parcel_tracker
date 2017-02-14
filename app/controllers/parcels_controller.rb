class ParcelsController < ApplicationController
  # respond_to :json
  rescue_from ActionController::ParameterMissing, with: :bad_request

  # before_action :require_parcel_data, only: :index

  def index
  end

  def manage
    @parcels = Parcel.all
  end

  private

  # def require_parcel_data
  #   params.require(:phone)
  #   params.require(:track_code)
  # end
end
