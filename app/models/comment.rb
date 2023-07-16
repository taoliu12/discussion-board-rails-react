class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user
  belongs_to :parent_comment, class_name: 'Comment', optional: true
  has_many :child_comments, class_name: 'Comment', foreign_key: 'parent_comment_id', dependent: :destroy

  validates :content, presence: true

  def author_name
    user.username
  end

  def formatted_created_at
    # created_at.strftime('%B %e, %Y at %l:%M %p')
    created_at.strftime('%B %e, %Y')
  end
end
