module Api
  class ParcelLogsController < Api::BaseController
    PARAMS_ATTRIBUTES = [:post_status, :msg]

    def index
      resource_set
      respond_with resource_get
    end

    private

    def resource_set(resource = nil)
      resource ||= Parcel.includes(:logs).find_by!(track_code: params[:id]).logs
      instance_variable_set("@#{resource_name.pluralize}", resource)
    end

    def parcel_log_params
      params.require(:parcel_log).permit(*PARAMS_ATTRIBUTES)
    end
  end
end
