import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import NewCommentForm from "./NewCommentForm";
import { Box, Button } from "@mui/material";

export default function Comment({ comment, setComments }) {
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  const handleToggleReply = () => {
    setToggleReplyForm(true);
  };
  debugger;
  return (
    <>
      <Card
        className="comment-card"
        sx={{
          textAlign: "left",
          borderWidth: "1px",
          borderColor: "#1976d2",
          backgroundColor: "transparent",
          marginY: "15px",
          paddingX: "15px",
        }}
        variant="outlined"
      >
        <p>{comment.attributes.content}</p>
        <p>
          {comment.attributes.author_name} -{" "}
          {comment.attributes.formatted_created_at}
        </p>
        <Button onClick={handleToggleReply}>Reply</Button>
      </Card>
      {toggleReplyForm && (
        <NewCommentForm
          parentCommentId={comment.id}
          setComments={setComments}
        />
      )}

{comment.attributes.child_comments && (
  <Box sx={{ pl: 2 }}>
    {comment.attributes.child_comments.map((child_comment) => (
      <Comment
        comment={child_comment.data}
        setComments={setComments}
        key={child_comment.id}
      />
    ))}
  </Box>
)}

    </>
  );
}
