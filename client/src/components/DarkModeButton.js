import * as React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [darkModeText, setDarkModeText] = React.useState("Toggle Dark");
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const body = document.body;     

    // If dark mode is enabled - adds classes to update dark-mode styling.
    // Else, removes and styling is as normal.
    if (darkMode === true) {
      body.classList.add("dark-mode");
      setDarkModeText("Go Light");
    } else {
      body.classList.remove("dark-mode");
      setDarkModeText("Go Dark");
    }
  }, [darkMode]);

  return (
    <div title="Toggle Dark Mode" className="dark-mode-div">
      <IconButton
        sx={{ mx: 1 }}
        onClick={() =>
          darkMode === false ? setDarkMode(true) : setDarkMode(false)
        }
        color="inherit"
      >
        <Brightness4Icon alt="dark " />
      </IconButton>
    </div>
  );
}
