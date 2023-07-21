import PostCard from "./PostCard";
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Posts({loggedInUser}) {
  const [posts, setPosts] = useState(null);

  useEffect(() => { 
    fetch("/posts")
    .then((res) => res.json())     
    .then((posts) => setPosts(posts.data))
    .catch((err) => console.log(err));     
  }, [loggedInUser]);

  const handleChange = (event) => {     
    const sortedPosts = sortPosts(posts, event.target.value); 
    setPosts([...sortedPosts])
  }; 
  
  const sortPosts = (posts, sortBy) => {     
    switch (sortBy) {
      case 'latest':
        return posts.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1);
      case 'oldest':
        return posts.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? 1 : -1);
      case 'most popular':
        return posts.sort((a, b) => (a.attributes.votes_total < b.attributes.votes_total) ? 1 : -1);
      case 'least popular':
        return posts.sort((a, b) => (a.attributes.votes_total > b.attributes.votes_total) ? 1 : -1);
      default:
        return posts;    
    }    
  };
     
  return (
      <Box m="auto" sx={{ minWidth: 275, maxWidth: 1000 }}>  
      <h2>All Posts</h2>
      <select id='sort-dropdown' onChange={handleChange}>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="most popular">Most Popular</option>
        <option value="least popular">Least Popular</option>
      </select>
      
      {posts ? posts.map((post) => (  //wait until both posts && loggedInUser are loaded, otherwise get error in devtools sometimes
        <PostCard loggedInUser={loggedInUser} post={post} key={post.id}/>)
        ) : <p><LoadingButton loading sx={{my: '30px', fontSize: '20px'}}/></p>}
        </Box>     
  );
}

