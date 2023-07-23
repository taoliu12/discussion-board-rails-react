# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Vote.destroy_all
Post.destroy_all
User.destroy_all

users = User.create(
  [{username: 'demo', password: 'demo'}, {username: 'user1', password: 'password'}, {username: 'user2', password: 'password'}, {username: 'user3', password: 'password'}, {username: 'user4', password: 'password'}, {username: 'user5', password: 'aaaa'}
  ]
)

users.each do |user|
    user_posts = [] 
     10.times {user_posts << user.authored_posts.create(
        { 
          title: Faker::Lorem.sentence, 
          body: Faker::Lorem.paragraph(sentence_count: rand(3..51))
        }
      )
     }

    user_posts.each do |post|
        Vote.create(user_id: user.id, post_id: post.id, value: 1)
    end

    Post.all.each do |post|
      3.times {
        comment = post.comments.create(
          { 
            user_id: user.id, 
            content: Faker::Lorem.paragraph(sentence_count: rand(1..21))
          }
        )
        child_comment = comment.child_comments.create(
          { 
            user_id: user.id, 
            post_id: post.id,
            content: Faker::Lorem.paragraph(sentence_count: rand(1..21))
          }
        )
        child_comment.child_comments.create(
          { 
            user_id: user.id, 
            post_id: post.id,
            content: Faker::Lorem.paragraph(sentence_count: rand(1..21))
          }
        )  
      }
    end
end