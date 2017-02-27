class ParcelsController < ApplicationController
  rescue_from ActionController::ParameterMissing, with: :bad_request

  def index
  end
end
