class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :votes_total, :votes
end
