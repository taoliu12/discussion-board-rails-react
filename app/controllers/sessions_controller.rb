class SessionsController < ApplicationController
  def new
    redirect_to posts_path if current_user
  end

  def create
    @user = User.find_by(username: user_params[:username])     
    if @user && @user.authenticate(user_params[:password])
      session[:user_id] = @user.id       
      render json: @user
    else         
        render json: { error: "Invalid username or password" }, status: :unauthorized
    end   
  end
  
  def get_logged_in_user
    user_already_loggedin = User.find_by( id: session[:user_id] ) 
    # render json: user_already_loggedin        
    render json: UserSerializer.new(user_already_loggedin)        
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
    render json: { message: "logged out"}
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def omniauth
    request.env['omniauth.auth']
  end
end
