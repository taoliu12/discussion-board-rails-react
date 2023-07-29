import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import VotesBox from "./VotesBox";
import Comments from "./Comments";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

export default function PostShow({ loggedInUser }) {
  const [votes_total, setVotesTotal] = useState(0);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [currentUserVote, setCurrentUserVote] = useState({ value: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  let { postId } = useParams();

  const getAndSetCurrentUserVote = (post) => {
    setCurrentUserVote({ value: null });
    post.votes.forEach((vote) => {
      if (vote.user_id == loggedInUser.id) {
        //find the currentUser's vote
        setCurrentUserVote(vote);
      }
    });
  };

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log("postshow json", json);
        setPost(json.data);
        setComments(json.included);
        setVotesTotal(json.data.attributes.votes_total);
        getAndSetCurrentUserVote(json.data.attributes);
      })
      .catch((err) => console.log(err));
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser && post) {
      setVotesTotal(post.attributes.votes_total);
      getAndSetCurrentUserVote(post.attributes);
    }
  }, [loggedInUser, post]);

  const handleDeletePost = () => {
    // debugger
    fetch(`${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((json) => {
        if (!json.error) {
          navigate("/posts");
        }
      });
  };

  console.log("postshow loggedInUser", loggedInUser);
  console.log("postshow post", post);

  return (
    <>
      {post && (
        <Card
          className="post-card"
          sx={{
            display: "flex",
            textAlign: "center",
            borderColor: "#cccccc",
            marginY: "15px",
          }}
          variant="outlined"
        >
          <Box
            sx={{ py: 2, backgroundColor: "#f8f9fa" }}
            className="votesBox-container"
          >
            <VotesBox post={post} loggedInUser={loggedInUser} />
          </Box>
          <Box
            sx={{
              py: 2,
              px: 3,
              flex: 4,
              textAlign: "left",
            }}
          >
            <div className="post-card-content">
              <NavLink
                to={`/posts/${post.id}`}
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                underline="hover"
              >
                {post.attributes.title}
              </NavLink>
              <p>{post.attributes.body}</p>
              <p>
                Posted on {post.attributes.formatted_created_at}, by{" "}
                {post.attributes.author_name}
              </p>
              {loggedInUser?.id == post?.attributes.author_id && (
                <>
                  <NavLink to={`/posts/${post.id}/edit`}>
                    <Button>
                      Edit
                    </Button>
                  </NavLink>
                  <Button onClick={handleDeletePost}>
                    Delete
                  </Button>
                </>
              )}
            </div>
          </Box>
        </Card>
      )}
      <Box
        className="comments-container"
        m="left"
        sx={{
          backgroundColor: "white",
          textAlign: "left",
          minWidth: 275,
          maxWidth: 1000,
          px: 3,
          pt: 1,
          pb: 3,
          borderRadius: 1,
        }}
      >
        {loggedInUser ? (
          <NewCommentForm setComments={setComments} />
        ) : (
          <p>Login to post a comment</p>
        )}
        <Comments comments={comments} setComments={setComments} />
      </Box>
    </>
  );
}
