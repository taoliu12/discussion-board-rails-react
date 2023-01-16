class VotesController < ApplicationController
    def create 
        @post = Post.find_by_id(params[:post_id])
        if !@post
            flash[:message] = 'Post Does Not Exist'
            redirect_to posts_path
        end
        
        @vote = current_user.votes.find_or_initialize_by(post: @post)
        
        if @vote.value == vote_params[:value].to_i
            flash[:message] = 'Vote Retracted'
            @vote.destroy
        elsif @vote.update(vote_params)      
            flash[:message] = 'Vote Successful'
        else
            flash[:message] = `Something went wrong`
        end
        redirect_to post_path(@post)
    end

    private

    def vote_params
        params.require(:vote).permit(:value)
    end
    
end
