import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export default function NewPostForm() {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();     
    const [customError, setCustomError] = useState('')
    const navigate = useNavigate();

      const handleFormSubmit = ( data ) =>{  
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
            } else {
                setCustomError("Something went wrong. Please try again.")
                reset({title: '', body: ''})     
            }
            }) 
      }

    
      return (
      <>
        <h2>Create a New Post</h2>
        <div className="post-form-container">
            
          <form onSubmit={handleSubmit(handleFormSubmit)}>

              <p>{errors.title && <span className='formError'>(This field is required)</span>}</p>
              <input          
                  type='text'       
                  name="title"
                  className="new-post-input"
                  placeholder="Title*"
                  {...register("title", { required: true })}
              />
  
              <p>{errors.body && <span className='formError'>(This field is required)</span>}</p> 
              <textarea                  
                placeholder="Content*"
                name="body" 
                {...register("body", { required: true })}
              />
              <input type="submit"  className="login-btn"/>
              <p> {customError}</p>
          </form>
        </div>
      </> 
      )};       