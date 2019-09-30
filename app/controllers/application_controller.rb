class ApplicationController < ActionController::Base
    
    private

    def current_user
        User.last
        #User.find_by(id: session[:user_id]) #find_by returns nil if no user found
    end
    
    def logged_in?
        !!current_user
    end
    
end
