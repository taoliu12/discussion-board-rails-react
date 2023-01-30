class VotesController < ApplicationController
    def create 
        @post = Post.find_by_id(params[:post_id])
        if !@post
            message = 'Post Does Not Exist'
            render json: { error: message }, status: :unprocessable_entity
        end
        
        @vote = current_user.votes.find_or_initialize_by(post: @post)
                 
        if @vote.value == vote_params[:value].to_i
            message = 'Already Voted'
            @vote.destroy
        elsif @vote.update(vote_params)      
            message = 'Vote Successful'
        else
            message = `Something went wrong`
        end
        render json: PostSerializer.new(@post)
    end

    private

    def vote_params
        params.require(:vote).permit(:value)
    end
    
end
