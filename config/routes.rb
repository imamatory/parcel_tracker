Rails.application.routes.draw do

  get 'spa/index'

  get 'parcels/manage/*', to: 'parcel_logs#index'

  get 'parcels/:id', to: 'parcels#index'
  get 'parcel_logs/:id', to: 'parcels#index'

  namespace :api, defaults: { format: :json } do
    actions = [:index, :show, :create, :update, :destroy]

    resources :parcels, only: actions
    resources :parcel_logs, only: actions
  end

  root 'spa#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
