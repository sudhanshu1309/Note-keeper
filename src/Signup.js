import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  InputAdornment,
  Stack,
  TextField,
  IconButton,
  Button,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
              Welcome new user!
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
      <Container
        maxWidth="sm"
        sx={{
          mt: 4,
        }}
      >
        <Paper variant="outlined">
          <Box
            sx={{
              maxWidth: 250,
              my: 4,
              mx: "auto",
            }}
          >
            <Stack spacing={3}>
              <TextField
                required
                label="User ID"
                type={"text"}
                placeholder="jamesbond"
              />
              <TextField
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="outlined">Signup</Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Signup;
