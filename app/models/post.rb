class Post < ApplicationRecord
    has_many :votes
    has_many :users, through: :votes
    belongs_to :user, foreign_key: "author_id"

    validates :title, presence: true
    validates :body, presence: true

    def votes_total
        votes.sum(&:value)
    end
end
