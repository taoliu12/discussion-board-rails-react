class PostsController < ApplicationController
  def index
  end

  def new
    @post = Post.new
  end

  def create
    raise params.inspect
  end

  def show
  end

  def update
  end

  def destroy
  end
end
