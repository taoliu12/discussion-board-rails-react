import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import VotesBox from "./VotesBox";
import Card from '@mui/material/Card';



export default function PostCard({post, loggedInUser}) {
  const [votes_total, setVotesTotal] = useState(post.attributes.votes_total);
  const [currentUserVote, setCurrentUserVote] = useState({ value: null })
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getAndSetCurrentUserVote = (post) => {
    setCurrentUserVote({ value: null })
    post.votes.forEach(vote => { 
      if (vote.user_id == loggedInUser.id) { //find the currentUser's vote
          setCurrentUserVote(vote)
      }})
  }

  useEffect(() => { 
    setVotesTotal(post.attributes.votes_total);
    // debugger
      loggedInUser && getAndSetCurrentUserVote(post.attributes)
    }, [loggedInUser, post]);
  

  const handleUpVote = () => {
      fetch( `posts/${post.id}/votes`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( { vote: { value: 1 } })
        } 
      ) 
      .then( r => r.json() )
      .then( post => {         
        console.log(post);
        
          if (!post.error) {
              setVotesTotal( post.data.attributes.votes_total )
              getAndSetCurrentUserVote(post.data.attributes)
 
          } 
          }) 
    }

  const handleDownVote = () => {
      fetch( `posts/${post.id}/votes`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( { vote: { value: -1 } })
        } 
      ) 
      .then( r => r.json() )
      .then( post => {         
        console.log(post);
        
          if (!post.error) {
              setVotesTotal( post.data.attributes.votes_total ) 
              getAndSetCurrentUserVote(post.data.attributes)
          } 
          }) 
    }
    
    const handleDeletePost = () => {
      // debugger
      fetch( `${post.id}`, 
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        } 
      ).then( r => r.json() )
      .then( json => {         
        if (!json.error) {
          navigate('/posts');
        }})
    }  

  return (
    
    <Card sx={{ textAlign: 'center', borderWidth: '1px', borderColor: '#cccccc', backgroundColor: 'white', marginY: '15px'}} variant="outlined">
    <div className="post-card">
      <VotesBox post={post} loggedInUser={loggedInUser}/>
      <div className="post-card-content">
      <NavLink className='post-title-link' to={`/posts/${post.id}`}
      style={{                      
        fontSize: '24px',
        fontWeight: 'bold'
      }}
      underline="hover">
        {post.attributes.title}
      </NavLink>
        <p>{post.attributes.body}</p>
        <p>Posted on {post.attributes.formatted_created_at}, by {post.attributes.author_name}</p>
      </div>
    </div>
    </Card>
    
  );
}