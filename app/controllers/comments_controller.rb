class CommentsController < ApplicationController
    def create 
        post = Post.find(params[:post_id])
        comment = post.comments.build(content: params[:content])
        comment.parent_comment_id = params[:parent_comment_id] if params[:parent_comment_id]
        comment.user = current_user
        comment.save   
        options= {}
        options[:include] = [:comments]
        render json: PostSerializer.new(post, options).serialized_json
        # render json: CommentSerializer.new(comment).serialized_json
        # render json: PostSerializer.new(post).serialized_json
    end
end
