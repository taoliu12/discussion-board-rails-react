class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :author_name, :formatted_created_at, :created_at
end
