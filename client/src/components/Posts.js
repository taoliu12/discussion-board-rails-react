import PostCard from "./PostCard";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Posts({ loggedInUser }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/api' + "/posts")
      .then((res) => res.json())
      .then((posts) => setPosts(posts.data))
      .catch((err) => console.log(err));
  }, [loggedInUser]);

  const handleChange = (event) => {
    const sortedPosts = sortPosts(posts, event.target.value);
    setPosts([...sortedPosts]);
  };

  const sortPosts = (posts, sortBy) => {
    switch (sortBy) {
      case "latest":
        return posts.sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        );
      case "oldest":
        return posts.sort((a, b) =>
          new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
        );
      case "most popular":
        return posts.sort((a, b) =>
          a.attributes.votes_total < b.attributes.votes_total ? 1 : -1
        );
      case "least popular":
        return posts.sort((a, b) =>
          a.attributes.votes_total > b.attributes.votes_total ? 1 : -1
        );
      default:
        return posts;
    }
  };

  return (
    <Box m="auto" sx={{ minWidth: 275, maxWidth: 1000 }}>
      <h2>All Posts</h2>
      <select
        id="sort-dropdown"
        onChange={handleChange}
        style={{ marginBottom: 5 }}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="most popular">Most Popular</option>
        <option value="least popular">Least Popular</option>
      </select>

      {posts ? (
        posts.map(
          (
            post //wait until both posts && loggedInUser are loaded, otherwise get error in devtools sometimes
          ) => (
            <PostCard loggedInUser={loggedInUser} post={post} key={post.id} />
          )
        )
      ) : (
        <p>
          <CircularProgress style={{ marginTop: 81, width: 45, height: 45 }} />
        </p>
      )}
    </Box>
  );
}
