class User < ApplicationRecord
    has_secure_password

    has_many :votes
    has_many :authored_posts, class_name: "Post", foreign_key: 'author_id'
    has_many :voted_posts, through: :votes, source: :post

    validates :username,  presence: true, uniqueness: {case_sensitive: :false}

    def formatted_created_at
        # created_at.strftime('%B %e, %Y at %l:%M %p')
        created_at.strftime('%B %e, %Y')
    end
end
