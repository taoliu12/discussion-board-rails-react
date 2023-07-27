import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function EditPostForm({posts, loggedInUser}) {
  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm({ mode: "onChange" });     
  const [customError, setCustomError] = useState('')
  const [post, setPost] = useState(null)
  
  const navigate = useNavigate(); 

  let { postId } = useParams();

  useEffect(() => {
    fetch(`/posts/${postId}`)
    .then((res) => res.json())     
    .then((json) => setPost(json.data))
  }, []);
  
  useEffect(() => {
    post && setValue('title', post.attributes.title);
    post && setValue('body', post.attributes.body);
    //  post && setValue([{title: 'aaa'}]);
  }, [post]);

  // useEffect(() => {
  //   // debugger
  //   posts?.forEach(post => {
  //     // debugger
  //     if (post.id == postId) {
  //       setPost(post)
  //     }
  //   })
  // }, []);
  


  console.log('edit post', post)
  // console.log('edit posts', posts)
  console.log('edit loggedInUser', loggedInUser)

  const handleFormSubmit = ( data ) =>  {  
    fetch( "/posts", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {post: data} )
      } 
    ) 
    .then( r => r.json() )
    .then( json => {              
        if (!json.error) {
          console.log('sucessfully submitted post')
          navigate('/posts/' + json.data.id)
            // setPosts( [...posts, data] ) 
        } else {
            setCustomError("Something went wrong. Please try again.")
            reset({title: '', body: ''})     
        }
    }) 
  }

  return (
      <>
        <h2>Edit Post</h2>
        <div className="post-form-container">
            
          <form onSubmit={handleSubmit(handleFormSubmit)}>
              <p>{errors.title && <span className='formError'>(This field is required)</span>}</p>
              <input          
                  type='text'       
                  name="title"
                  className="new-post-input"
                  placeholder=''
                  {...register("title", { required: true })}
              />
  
              <p>{errors.body && <span className='formError'>(This field is required)</span>}</p> 
              <textarea                  
                placeholder={post?.attributes.body}
                name="body" 
                {...register("body", { required: true })}
              />
              <br /><br />
              <input type="submit" className="submit-btn"/>
              <p> {customError}</p>
          </form>
        </div>
      </> 
  )};       