import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link'; 
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; 
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; 
import ThumbUpOutlined from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlined from '@mui/icons-material/ThumbDownOutlined'; 

export default function PostShow({loggedInUser}) {   
  const [votes_total, setVotesTotal] = useState(0);
  const [post, setPost] = useState(null);
  const [currentUserVote, setCurrentUserVote] = useState({ value: null })
  const navigate = useNavigate();

  let { postId } = useParams();

  const getAndSetCurrentUserVote = (post) => {
    setCurrentUserVote({ value: null })
    post.votes.forEach(vote => { 
      if (vote.user_id == loggedInUser.id) { //find the currentUser's vote
          setCurrentUserVote(vote)
      }})
  }

  useEffect(() => { 
    fetch(`/posts/${postId}`)
    .then((res) => res.json())     
    .then((json) => {
      setVotesTotal(json.data.attributes.votes_total);
      setPost(json.data)
      getAndSetCurrentUserVote(json.data.attributes)
    })
    .catch((err) => console.log(err)); 
  }, [loggedInUser]);

  useEffect(() => { 
    if (loggedInUser && post) {
      setVotesTotal(post.attributes.votes_total);
      getAndSetCurrentUserVote(post.attributes)
    }
    }, [loggedInUser, post]);
  

  const handleUpVote = () => {
      fetch( `${post.id}/votes`, 
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
      fetch( `${post.id}/votes`, 
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

console.log("postshow loggedInUser", loggedInUser)
console.log("postshow post", post )
  return (
    post && 
    <Card sx={{ textAlign: 'center', borderColor: 'gray', marginY: '15px'}} variant="outlined">
    <div className="post-card">
        <div className="post-card-votes-box" > 
          <h3>{votes_total}</h3>
          <div><Button onClick={handleUpVote}>
            {(currentUserVote.value == 1) ? <ThumbUpIcon sx={{  }}/> :  <ThumbUpOutlined sx={{  }}/>}
            </Button></div>
          <div><Button onClick={handleDownVote}>
            {(currentUserVote.value == -1) ? <ThumbDownIcon sx={{  }}/> : <ThumbDownOutlined sx={{  }}/>}
          </Button></div>
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
          {
            (loggedInUser?.id == post?.attributes.author_id) &&
            <>
            <NavLink to={`/posts/${post.id}/edit`}>
              <Button sx={{ my: 2 }}>
                Edit
              </Button>
            </NavLink>
            <Button onClick={handleDeletePost} sx={{ my: 2 }}>
              Delete
            </Button>
            </>
        }
        </div>
    </div>
    </Card>
  );
}