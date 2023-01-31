class Post < ApplicationRecord
    has_many :votes
    has_many :users, through: :votes
    belongs_to :user, foreign_key: "author_id"

    validates :title, presence: true
    validates :body, presence: true

    def votes_total
        votes.sum(&:value)
    end

    def formatted_created_at
        # created_at.strftime('%B %e, %Y at %l:%M %p')
        created_at.strftime('%B %e, %Y')
    end

    # def current_user_vote
    # #     does post have a vote that belongs to current user?
    #         # what is value of the vote?
    #         # 	if 1, render filled up arrow
    #         # 	if -1, render filled down arrow
    #         # 	else, render render default arrows
    #     if current_user
    #         votes.find_by(user_id: current_user.id)
            
    #     end
    
    # end
end
