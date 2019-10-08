class VotesController < ApplicationController
    def create 
        @post = Post.find_by(params[:post_id])
        @vote = current_user.votes.find_or_initialize_by(post: @post)
        @vote.update(vote_params)         
        redirect_to post_path(@post)
    end

    private

    def vote_params
        params.require(:vote).permit(:value)
    end
    
end
