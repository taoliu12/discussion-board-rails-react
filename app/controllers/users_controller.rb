class UsersController < ApplicationController
    def new
        @user = User.new
    end
  
    def create
        @user = User.new(user_params)   
        if @user.save
            session[:user_id] = @user.id 
            flash[:message] = "Signup Successful"
            redirect_to posts_path
        else
            flash[:message] = "Please try again"
            render :new
        end
    end

    def show
        @user = User.find_by(params[:id])
        @posts = @user.authored_posts              
    end
    

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
    end
    
end
