class User < ApplicationRecord
    has_secure_password

    has_many :votes
    has_many :authored_posts, class_name: "Post", foreign_key: 'author_id'
    has_many :voted_posts, through: :votes, source: :post

    validates :username,  presence: true, uniqueness: {case_sensitive: :false}
end
