class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :author_name
end
