import React, { useState, useEffect } from "react";
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
import Note from "./components/Note";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import data from "./components/fakeData.json";

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
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

  const [notes, setNotes] = useState([]);
  const [slicedNotes, setSlicedNotes] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getNotes = () => {
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    const pageChange = () => {
      let lastIndex = page * 6;
      let firstIndex = lastIndex - 6;
      setSlicedNotes(notes.slice(firstIndex, lastIndex));
    };
    pageChange();
  }, [notes, page]);

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
              {slicedNotes.map((note, index) => {
                return (
                  <Grid xs={4} key={index}>
                    <Item>
                      <Note title={note.name} tag={note.id} note={note.body} />
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 3,
              }}
            >
              <Pagination
                count={Math.ceil(notes.length / 6)}
                color="primary"
                size="small"
                onChange={handleChange}
                page={page}
              />
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Dashboard;
