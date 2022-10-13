import { ThemeProvider } from "@emotion/react";
import { Box, Container, createTheme, Typography } from "@mui/material";
import React from "react";
import Signin from "./Signin";

const Landing = () => {
  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
            }}
          >
            <Typography variant="h3" component="p" color="textPrimary">
              Save your Notes anytime!
            </Typography>
            <Typography variant="h3" component="p" color="textPrimary">
              Access your Notes anytime!
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
      <Signin />
    </>
  );
};

export default Landing;
