import * as React from 'react';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover'; 

export default function DarkModeButton() {
    const [ darkMode, setDarkMode ] = React.useState(false)
    const [ darkModeText, setDarkModeText ] = React.useState("Toggle Dark")
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    React.useEffect(() => {
      const body = document.body
      // const toggle = document.querySelector('.toggle-inner')
      
      // If dark mode is enabled - adds classes to update dark-mode styling.
      // Else, removes and styling is as normal.
      if( darkMode === true ) {
        body.classList.add('dark-mode')
        setDarkModeText("Go Light")
    
      } else {
        body.classList.remove('dark-mode')
        setDarkModeText("Go Dark")
      }
    }, [darkMode])
    
    return (
      <div className='dark-mode-div'> 
       <div aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}> 
        <IconButton sx={{ ml: 1 }} onClick={() => darkMode === false ? setDarkMode(true) : setDarkMode(false)} color="inherit">
         <Brightness4Icon />
        </IconButton>
        </div>
        <Popover
            id="mouse-over-popover"
            sx={{pointerEvents: 'none'}}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 0.5 }}>Toggle Dark Mode</Typography>
          </Popover>
      </div>
    )
  }
  