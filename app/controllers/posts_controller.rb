class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
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
     @vote_total = @post.votes.sum(&:value)
    #  raise params.inspect
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
    redirect_to posts_path
  end

  private

  def set_post
    @post = Post.find(params[:id])
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
