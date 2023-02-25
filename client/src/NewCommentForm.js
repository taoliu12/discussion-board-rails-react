import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function NewCommentForm({setComments}) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();     
    const [customError, setCustomError] = useState('')
    const navigate = useNavigate();
    let { postId } = useParams();
      
    const handleFormSubmit = ( data ) => {  
      fetch( `/posts/${postId}/comments`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( data )
        } 
      ) 
      .then( r => r.json() )
      .then( json => {       
        if (!json.error) {
          let comments = json.included       
          // console.log('new comment submitted', post.attributes.comments[post.attributes.comments.length-1])
          console.log('new comment submitted', json)
          // console.log('new comment submitted relationships', post.relationships.comments.data.slice().pop())
          setComments(comments)
        } else {
            setCustomError("Something went wrong. Please try again.")
            reset({content: ''})     
        }
      }) 
    }
 
  return (
  <>     
    <div className="comment-form-container"> 
      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <p>{errors.content && <span className='formError'>(This field is required)</span>}</p> 
          <textarea                  
            placeholder="Create a Comment"
            name="content" 
            {...register("content", { required: true })}
          />
          <div> <input type="submit"  className="small-btn"/></div>
          <p> {customError}</p>
      </form>
    </div>
  </> 
)};       