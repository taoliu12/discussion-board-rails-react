import * as React from "react";
import { styled } from '@mui/material/styles';
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

const StyledLink = styled(Link)`
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;

export default function NavbarButton({ item, route }) {
  return (
    <StyledLink className="top-nav-bar-link" to={route}>
      <Button
        sx={{
          mx: 0.7,
          my: 2,
          fontSize: "1.2rem",
          color: "white",
          display: "block",
          boxShadow: "0px 0px 3px #00000",
        }}
      >
        {item}
      </Button>
    </StyledLink>
  );
}
