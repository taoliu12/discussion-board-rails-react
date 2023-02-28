class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  def author_name
    user.username
  end

  def formatted_created_at
    # created_at.strftime('%B %e, %Y at %l:%M %p')
    created_at.strftime('%B %e, %Y')
  end
end
