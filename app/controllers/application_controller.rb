class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?

    include ActionController::Cookies

    private

    def current_user         
        User.find_by(id: session[:user_id]) #find_by returns nil if no user found
    end
    
    def logged_in?
        !!current_user
    end
    
end
