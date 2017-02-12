require 'rails_helper'

RSpec.describe ParcelsController, type: :controller do
  before do
    @format = { format: 'json' }
  end

  describe 'POST #index' do
    it 'returns http success' do
      post :index, params: { phone: '123', track_code: 'RU123CN' }, **@format
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #manage' do
    it 'returns http success' do
      get :manage, @format
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    it 'returns http success' do
      post :create, params: { parcel: { phone: '123', track_code: 'RU123CN' }}, **@format
      expect(response).to have_http_status(:success)
    end
  end

end
