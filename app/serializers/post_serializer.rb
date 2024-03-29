class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :votes_total, :votes, :formatted_created_at, :created_at, :author_id, :author_name

  has_many :comments, serializer: CommentSerializer, include: true
end
