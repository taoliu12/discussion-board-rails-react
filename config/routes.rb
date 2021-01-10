Rails.application.routes.draw do
  get 'posts/new'
  get 'posts/create'
  get 'posts/destroy'
  get 'posts/show'
  get 'posts/update'
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'posts#index'

  get '/posts', to: redirect('/')
  resources :posts, except: [:index] do
    resources :votes, only: [:create]
  end

  resources :users, only: [:show] do
    resources :posts, only: [:index]
  end

  resources :sessions, only: [:destroy]

  get '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  get '/auth/:provider/callback', to: 'sessions#create_from_omniauth'

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
