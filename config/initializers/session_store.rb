Rails.application.config.session_store :cookie_store, 
  key: '_your_app_session',
  secure: Rails.env.production?, # 'true' for HTTPS
  same_site: :lax, # Adjust as per your needs (strict, lax, none)
  domain: :all # Allows cookies to be sent to different subdomains