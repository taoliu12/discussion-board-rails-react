class PostsController < ApplicationController
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
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
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

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
