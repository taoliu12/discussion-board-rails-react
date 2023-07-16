class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :author_name, :formatted_created_at, :created_at

  attribute :child_comments do |comment|
    comment.child_comments.map do |child_comment|
      ChildCommentSerializer.new(child_comment).as_json
    end
  end
end
