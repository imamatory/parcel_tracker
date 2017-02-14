class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  before_action :dispatch_responder

  private

  def dispatch_responder
    respond_to do |format|
      format.json
      format.html { render 'spa/index' }
    end
  end
end
