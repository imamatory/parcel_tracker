class ParcelsController < ApplicationController
  # respond_to :json
  rescue_from ActionController::ParameterMissing, with: :bad_request

  before_action :require_track_code, only: :index

  def index
    @parcels = ParcelLogs.where('track_code = ?', get_track_code)
  end

  private

  def get_track_code
    params.require(:track_code)
  end
end
