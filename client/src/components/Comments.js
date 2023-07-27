import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Comment from "./Comment";

export default function Comments({ comments, setComments }) {
  // const [comments, setComments] = useState(comments);

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
    <Box className="comments-container"
      m="left"
      sx={{
        backgroundColor: 'white',
        textAlign: "left",
        minWidth: 275,
        maxWidth: 1000,
        px: 3,
        pt: 1,
        pb: 3,
        borderRadius: 1,
      }}
    >
      <h3>All Comments</h3>
      {/* <select onChange={handleChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="most popular">Most Popular</option>
          <option value="least popular">Least Popular</option>
        </select> */}
      {comments ? (
        comments
          .sort((a, b) =>
            new Date(a.attributes.created_at) <
            new Date(b.attributes.created_at)
              ? 1
              : -1
          ) //list comments in latest order
          .map((comment) => {
            return <Comment comment={comment} setComments={setComments} />;
          })
      ) : (
        <p>
          <LoadingButton loading sx={{ my: "30px", fontSize: "20px" }} />
        </p>
      )}
    </Box>
  );
}
