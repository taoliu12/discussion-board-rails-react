class SessionsController < ApplicationController
  def new
    redirect_to posts_path if current_user
  end

  def create
    @user = User.find_by(username: params[:username])     
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else 
      flash[:message] = 'Please try again'
      redirect_to login_path
    end     
  end

  def create_from_omniauth
    user = User.find_or_create_by(email: omniauth[:info][:email]) do |user|
      user.username = omniauth[:info][:email] #need to remove email format later
      user.email = omniauth[:info][:email]
      user.password = SecureRandom.hex
    end

    session[:user_id] = user.id

    if logged_in? 
      flash[:message] = 'Login via Google successful.'
    else
      flash[:message] = 'Something went wrong. Please try again.'
    end
    redirect_to root_path
  end

  def destroy
    session.clear     
    redirect_to root_path
  end

  private

  def omniauth
    request.env['omniauth.auth']
  end
end
