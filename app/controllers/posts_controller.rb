class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
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
  end

  private

  def set_post
    @post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
