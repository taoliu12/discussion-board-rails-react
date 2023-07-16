class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :author_name, :formatted_created_at, :created_at

  has_many :child_comments, serializer: self, include: true
end
