class UsersController < ApplicationController
    def new
        redirect_to posts_path if current_user
        @user = User.new
    end
  
    def create
        @user = User.new(user_params)   
        # byebug
        if @user.save
            session[:user_id] = @user.id 
            render json: @user
        else
            # byebug
            render json: { error: "Invalid username or password" }, status: :unauthorized
        end
    end

    def edit
        @user = User.find(params[:id])
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user
            redirect_to user_posts_path(@user)    
        else
            redirect_to root_path
        end     
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end
    
end
