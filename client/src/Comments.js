import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Comments({comments}) {
  // const [comments, setComments] = useState(null);

  // const handleChange = (event) => {     
  //   const sortedComments = sortComments(comments, event.target.value); 
  //   setComments([...sortedComments])
  // }; 
  
  // const sortComments = (comments, sortBy) => {     
  //   switch (sortBy) {
  //     case 'latest':
  //       return comments.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1);
  //     case 'oldest':
  //       return comments.sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt)) ? 1 : -1);
  //     case 'most popular':
  //       return comments.sort((a, b) => (a.attributes.votes_total < b.attributes.votes_total) ? 1 : -1);
  //     case 'least popular':
  //       return comments.sort((a, b) => (a.attributes.votes_total > b.attributes.votes_total) ? 1 : -1);
  //     default:
  //       return comments;    
  //   }    
  // };
     
  return (
      <Box m='left' sx={{ textAlign: 'left', minWidth: 275, maxWidth: 1000 }}>  
        <h3>All Comments</h3>
        {/* <select onChange={handleChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="most popular">Most Popular</option>
          <option value="least popular">Least Popular</option>
        </select> */}
        
        {
          comments ? 
          comments.map((comment) => (  //wait until both comments && loggedInUser are loaded, otherwise get error in devtools sometimes
              <Card sx={{textAlign: 'left', borderWidth: '1px', borderColor: '#1976d2', backgroundColor: 'white', marginY: '15px', paddingX: '15px'}} variant="outlined">
                <p>{comment.attributes.content} by {comment.attributes.author_name}</p> 
              </Card>
            )
          ) : <p><LoadingButton loading sx={{my: '30px', fontSize: '20px'}}/></p>
        }
      </Box>     
  );
}

