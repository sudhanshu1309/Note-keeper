import { ThemeProvider } from "@emotion/react";
import {
  Container,
  createTheme,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import Note from "./components/Note";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

const Dashboard = () => {
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

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          sx={{
            my: 4,
          }}
        >
          <Typography
            sx={{ textAlign: "center", my: 1 }}
            variant="h6"
            color="textPrimary"
          >
            New Note
          </Typography>
          <Paper variant="outlined">
            <Box
              sx={{
                maxWidth: 450,
                my: 3,
                mx: "auto",
              }}
            >
              <Stack spacing={3} sx={{ mx: 1 }}>
                <TextField
                  label="Title"
                  type={"text"}
                  variant="filled"
                  size="small"
                />
                <TextField
                  label="Tag"
                  type={"text"}
                  variant="filled"
                  size="small"
                />
                <TextField
                  label="Note"
                  type={"text"}
                  variant="filled"
                  multiline
                  fullWidth
                />
              </Stack>
            </Box>
          </Paper>
          <Box
            sx={{
              textAlign: "center",
              mt: 3,
            }}
          >
            <Typography variant="h6" color="initial">
              Your Notes would appear here
            </Typography>
          </Box>
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            my: 4,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: { sm: 1, md: 2, lg: 3 },
            }}
          >
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="center"
            >
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>
                  <Note />
                </Item>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <Pagination count={11} color="primary" size="small" />
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
