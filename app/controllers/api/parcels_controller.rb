module Api
  class ParcelsController < Api::BaseController
    PARAMS_ATTRIBUTES = [:track_code, :phone, :src_addr, :dest_addr, :post_status]

    private

    def resource_set(resource = nil)
      resource ||= Parcel.find_by!(track_code: params[:id])
      instance_variable_set("@#{resource_name}", resource)
    end

    def parcel_log_params
      params.require(:parcel_log).permit(*PARAMS_ATTRIBUTES)
    end
  end
end
