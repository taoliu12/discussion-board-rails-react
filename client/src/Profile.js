import PostCard from "./PostCard";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

export default function Profile({loggedInUser}) {

  console.log('profile')
  return (
    <div className="posts-container">
      <Box sx={{ minWidth: 275, maxWidth: 1000 }}>
        <h2>My Profile</h2>
        <p>Username: {loggedInUser && loggedInUser.username}</p>
        <p>Member since {loggedInUser && loggedInUser.formatted_created_at}</p>
      </Box>
    </div>
  );
}