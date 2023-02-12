import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link'; 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; 
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover'; 


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
    
    <Card sx={{ textAlign: 'center', borderWidth: '1px', borderColor: '#1976d2', backgroundColor: 'white', marginY: '15px'}} variant="outlined">
    <div className="post-card">
        <div className="post-card-votes-box" > 
          <Typography sx={{ mt: '5px', fontSize: '1.3rem'}}>{votes_total}</Typography>
          <div aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}> 
            <div><Button onClick={handleUpVote}>
              {(currentUserVote.value == 1) ? <ThumbUpIcon sx={{  }}/> :  <ThumbUpOutlined sx={{  }}/>}
              </Button></div>
            <div><Button onClick={handleDownVote}>
              {(currentUserVote.value == -1) ? <ThumbDownIcon sx={{  }}/> : <ThumbDownOutlined sx={{  }}/>}
            </Button></div>
          </div>
 
          {!loggedInUser && <Popover
            id="mouse-over-popover"
            sx={{pointerEvents: 'none'}}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Login to vote.</Typography>
          </Popover>
          } 
      

        </div>
        <div className="post-card-content">
        <NavLink to={`/posts/${post.id}`}
        style={{                      
          fontSize: '24px',
          fontWeight: 'bold'
        }}
        underline="hover">
          {post.attributes.title}
        </NavLink>
          <p>{post.attributes.body}</p>
          <p>Posted on {post.attributes.formatted_created_at}, by {post.attributes.author_name}</p>
        {/* {
            (loggedInUser?.id == post?.attributes.author_id) &&
          <Button onClick={handleDeletePost} sx={{ my: 2, display: 'block' }}>
            Delete
          </Button>
        } */}
        </div>
    </div>
    </Card>
    
  );
}