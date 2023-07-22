import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function NestedCommentForm({
  setComments,
  parentCommentId,
  hideReplyForm,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [customError, setCustomError] = useState("");
  let { postId } = useParams();

  const handleCancel = () => {
    hideReplyForm();
  };

  const handleFormSubmit = (data) => {
    fetch(`/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((json) => {
        if (!json.error) {
          let comments = json.included;
          console.log("new comment submitted", json);
          setComments(comments);
          reset({ content: "" });
          hideReplyForm();
        } else {
          setCustomError("Something went wrong. Please try again.");
          reset({ content: "" });
        }
      });
  };

  return (
    <>
      <div className="comment-form-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <p>
            {errors.content && (
              <span className="formError">(This field is required)</span>
            )}
          </p>
          <textarea
            placeholder="Create a Comment"
            name="content"
            {...register("content", { required: true })}
          />
          <input
            type="hidden"
            name="parent_comment_id"
            value={parentCommentId}
            {...register("parent_comment_id")}
          />
          <div>
            <input type="submit" className="submit-btn small" value="Submit" />
            &nbsp;
            <button className="submit-btn small cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          <p> {customError}</p>
        </form>
      </div>
    </>
  );
}
