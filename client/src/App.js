
import './App.css';
import React, { Component, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import MyPosts from './MyPosts';
import PostShow from './PostShow';
import Profile from './Profile';
import Test from './Test1';

import NewPost from './NewPost'
import EditPost from './EditPost'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResponsiveAppBar from './ResponsiveAppBar'; 

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link, Typography} from '@mui/material';

function App() {
  const [ loggedInUser , setLoggedInUser ] = useState( null )
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch( "/userInSession" )
    .then( r => r.json() )
    .then( userAlreadyLoggedIn => { 
      userAlreadyLoggedIn.data &&
      setLoggedInUser(userAlreadyLoggedIn.data.attributes) 
    })
  }, [])

  const handleLogout = ()=>{
    fetch(  "/logout" , { method: "DELETE" }  )
    .then( r => r.json() )
    .then( json =>{       
      setLoggedInUser( null )       
    })
  }
  
  console.log('App  loggedInUser', loggedInUser)

  return (
    <div className="App">
      <ResponsiveAppBar loggedInUser={loggedInUser} handleLogout={handleLogout}/>
      <header className="App-header"></header>
      <div className="posts-container">
      <main>         
      <Routes>
        <Route path='/signup' element={<SignupForm setLoggedInUser={setLoggedInUser}/>}/>                          
        <Route path='/login' element={<LoginForm setLoggedInUser={setLoggedInUser}/>}/>   
        <Route path='/' element={<Posts loggedInUser={loggedInUser} />} />   
        <Route path='/posts' element={<Posts loggedInUser={loggedInUser} />} />   
        <Route path='/posts/:postId' element={<PostShow loggedInUser={loggedInUser}/>}/>   
        <Route path='/posts/:postId/edit' element={<EditPost posts={posts} loggedInUser={loggedInUser}/>}/>   
        <Route path='/posts/new' element={<NewPost posts={posts} setPost={setPosts}/>}/>   
        <Route path='/myposts' element={<MyPosts loggedInUser={loggedInUser}/>}/>   
        <Route path='/profile' element={<Profile loggedInUser={loggedInUser}/>}/>   
        <Route path='/t' element={<Test/>}/>   
      </Routes>
      </main>
      <br></br>
      <footer style={{alignItems: 'center'}}>
               
        <Typography sx={{ display: { fontSize: '11px', color: 'gray'}, m: 1 }} >         
          Made by Tao Liu 
        </Typography >
        
      <Link href="https://github.com/taoliu12/discussion-board-react-client" target="_blank" rel="noopener">
        <GitHubIcon sx={{ display: { fontSize: '23px', color: 'gray'}, mr: 1 }} />
      </Link>
      <Link href="https://www.linkedin.com/in/tao-liu-228105176/" target="_blank" rel="noopener">
        <LinkedInIcon sx={{ display: { fontSize: '23px', color: 'gray'}, mr: 1 }} />
      </Link>
      </footer>
      </div> 
    </div>
  );
}

export default App;
