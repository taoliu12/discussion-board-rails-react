class PostsController < ApplicationController
  before_action :set_post, :redirect_if_post_not_found, only: [:show, :edit, :update, :destroy]
  before_action :redirect_unauthorized_user, only: [:edit, :update, :destroy]

  def index
    if params[:user_id]
      @user = User.find_by(params[:user_id])
      @posts = @user.authored_posts
    else
      @posts = Post.all
    end   
  end

  def new
    @post = Post.new
  end

  def create     
    @post = current_user.authored_posts.build(post_params)        
    if @post.save
      redirect_to post_path(@post)
    else
      render :new
    end  
  end

  def show     
     @vote = Vote.new 
     @user_vote = current_user.votes.find_or_initialize_by(post: @post)
  end

  def edit     
  end

  def update     
    @post.update(post_params)
    if @post.save
      redirect_to post_path(@post)
    else
      render :edit
    end  
  end

  def destroy     
    @post.destroy       
    redirect_to posts_path, notice:  'Post deleted.'
  end

  private

  def set_post
    @post = Post.find_by(id: params[:id])
  end

  def redirect_if_post_not_found
    if @post.nil?
      redirect_to posts_path, notice: 'Post not found.'
    end     
  end

  def redirect_unauthorized_user
    if @post.user != current_user
      redirect_to posts_path
    end
  end  

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
