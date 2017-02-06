Rails.application.routes.draw do
  get 'parcels/info'

  get 'parcels/index'

  get 'parcels/manage'

  #resources :parcels

  root 'parcels#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
