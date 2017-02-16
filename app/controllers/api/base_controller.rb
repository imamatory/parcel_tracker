require 'camel_json'

module Api
  class BaseController < ApplicationController
    include CamelJson

    respond_to :json
    rescue_from ActiveRecord::RecordNotFound,       with: :record_not_found
    rescue_from ActiveRecord::RecordInvalid,        with: :record_invalid
    rescue_from ActionController::ParameterMissing, with: :bad_request

    before_action :resource_set, only: [:show, :update, :destroy]

    def index(resource_scope = resource_class.all)
      plural_resource_name = "@#{resource_name.pluralize}"
      resources = resource_scope.where(resource_params)
                      .page(page_params[:page])
                      .per(page_params[:page_size])
      instance_variable_set(plural_resource_name, resources)

      respond_with instance_variable_get(plural_resource_name)
    end

    def show
      respond_with resource_get
    end

    def create
      resource_set(resource_class.new(resource_params))

      if resource_get.save
        render :show, status: :created
      else
        render json: camelize_keys(resource_get.errors), status: :unprocessable_entity
      end
    end

    def destroy
      resource_get.destroy
      head :no_content
    end

    def update
      if resource_get.update(resource_params)
        render :show
      else
        render json: camelize_keys(resource_get.errors), status: :unprocessable_entity
      end
    end

    private

    # def csrf_token
    #   session['_csrf_token'] ||= form_authenticity_token
    # end

    def resource_get
      instance_variable_get("@#{resource_name}")
    end

    def query_params
      {}
    end

    def page_params
      params.permit(:page, :page_size)
    end

    def resource_class
      @resource_class ||= resource_name.classify.constantize
    end

    def resource_name
      @resource_name ||= controller_name.singularize
    end

    def resource_params
      @resource_params ||= send("#{resource_name}_params")
    end

    def resource_set(resource = nil)
      resource ||= resource_class.find(params[:id])
      instance_variable_set("@#{resource_name}", resource)
    end
  end
end
