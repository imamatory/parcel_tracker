class ParcelLogsController < ApplicationController
  # respond_to :json
  rescue_from ActionController::ParameterMissing, with: :bad_request

  def index
  end
end
