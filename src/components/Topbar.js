import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Topbar = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      h6: {
        fontSize: "1rem",
        "@media (min-width:600px)": {
          fontSize: "1.2rem",
        },
      },
    },
  });

  let location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img
              src="/static/notes.svg"
              alt="logo"
              style={{ width: "32px", marginRight: "8px" }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Note Keeper
            </Typography>
            <Button
              to={location.pathname === "/" ? "/signup" : "/"}
              component={Link}
              color="inherit"
              variant="outlined"
            >
              {location.pathname === "/" ? "signup" : "signin"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Topbar;
