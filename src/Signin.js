import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  Box,
  Paper,
  TextField,
  Stack,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
              <TextField required label="Email" type={"email"} />
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
              <Button variant="outlined">Signin</Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Signin;
