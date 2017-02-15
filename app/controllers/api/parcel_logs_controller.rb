module Api
  class ParcelLogsController < Api::BaseController
    PARAMS_ATTRIBUTES = [:post_status, :msg, :parcel_id]

    def index
      plural_resource_name = "@#{resource_name.pluralize}"
      resources = Parcel.includes(:logs).find_by!(track_code: params.require(:id)).logs
      instance_variable_set(plural_resource_name, resources)

      respond_with instance_variable_get(plural_resource_name)
    end

    def create
      parcel = Parcel.find_by!(track_code: params.require(:parcel_id))
      resource = resource_class.new(resource_params)
      resource.parcel_id = parcel.id
      resource_set(resource)

      if resource_get.save
        render :show, status: :created
      else
        render json: resource_get.errors, status: :unprocessable_entity
      end
    end

    private

    def parcel_log_params
      params.require(:parcel_log).permit(*PARAMS_ATTRIBUTES)
    end
  end
end
