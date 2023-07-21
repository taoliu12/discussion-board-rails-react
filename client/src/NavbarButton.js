import * as React from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

export default function NavbarButton({ item, route }) {
  return (
    <NavLink className="top-nav-bar-link" to={route}>
      <Button
        sx={{
          mx: 0.7,
          my: 0,
          textTransform: "none",
          fontSize: "1.3rem",
          fontWeight: "bold",
          fontFamily: "Noto Sans, sans-serif",
          color: "white",
          display: "block",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {item}
      </Button>
    </NavLink>
  );
}
