Rails.application.routes.draw do

  # get '/manage/:entity/:id(.:format)', to: 'parcels#index'
  # get 'parcels/:id(.:format)', to: 'parcels#index'
  # get 'parcel_logs/:id(.:format)', to: 'parcels#index'

  namespace :api, defaults: { format: :json } do
    actions = [:index, :show, :create, :update, :destroy]

    resources :parcels, only: actions do
      resources :parcel_logs, only: actions
    end
  end

  get '/:controller/(:id)(.:format)', action: :index


  get '/manage/(.:format)', to: 'parcels#index'
  get '/manage/parcels/(:id)(.:format)', to: 'parcels#index'
  get '/(manage)/parcels/:track_code/parcel_logs/(:id)(.:format)', to: 'parcels#index'

  root 'parcels#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
