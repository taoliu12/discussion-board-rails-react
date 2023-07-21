
import './styles/App.scss';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Posts from './components/Posts';
import MyPosts from './components/MyPosts';
import PostShow from './components/PostShow';
import Profile from './components/Profile'; 

import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ResponsiveAppBar from './components/ResponsiveAppBar'; 

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Link, Typography} from '@mui/material';
import ScrollToTop from './components/ScrollToTop';
import Toolbar from '@mui/material/Toolbar';
import { useUser } from './components/UserContext';

function App() {
  const { loggedInUser, setLoggedInUser } = useUser();
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
      <Toolbar id="back-to-top-anchor" sx={{mb: '31px'}}/>
      
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
        </Routes>
        </main>
        <br></br>
        <footer style={{alignItems: 'center'}}> 
          <Typography sx={{ display: { fontSize: '11px', color: 'gray'}, m: 1 }} >         
            Made by Tao Liu 
          </Typography >
          
        <Link href="https://github.com/taoliu12/discussion-board-rails-react" target="_blank" rel="noopener">
          <GitHubIcon sx={{ display: { fontSize: '23px', color: 'gray'}, mr: 1 }} />
        </Link>
        <Link href="https://www.linkedin.com/in/tao-liu-228105176/" target="_blank" rel="noopener">
          <LinkedInIcon sx={{ display: { fontSize: '23px', color: 'gray'}, mr: 1 }} />
        </Link>
        </footer>
      </div> 
      <ScrollToTop sx={{ mr: 1 }} />
    </div>
  );
}

export default App;
