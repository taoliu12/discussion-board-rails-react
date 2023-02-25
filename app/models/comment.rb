class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  def author_name
    user.username
  end
end
