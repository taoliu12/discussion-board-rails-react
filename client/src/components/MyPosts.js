import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

export default function MyPosts({loggedInUser}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => { 
    loggedInUser && fetch(`/api/users/${loggedInUser.id}/posts`)
    .then((res) => res.json())     
    .then((posts) => setPosts(posts.data))
    .catch((err) => console.log(err));     
  }, [loggedInUser]);
     

  return (     
      <Box  m="auto" sx={{ minWidth: 275, maxWidth: 1000 }}>
        <h2>My Posts</h2>
        {posts ? posts.map((post) => (  //wait until both posts && loggedInUser are loaded, otherwise get error in devtools sometimes
          <PostCard loggedInUser={loggedInUser} post={post} key={post.id}/>)
          ) : null}
      </Box>     
  );
}