import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Container,
  createTheme,
  Pagination,
  Paper,
  TextField,
  Typography,
  Box,
  Stack,
  IconButton,
  Snackbar,
} from "@mui/material";
import Note from "./components/Note";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./components/firebase";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

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

  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const q = query(collection(db, "Notes"), orderBy("timeStamp", "desc"));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let result = doc.data();
        // console.log(doc.id);
        result["id"] = doc.id;
        // console.log(result);
        setNotes((prev) => [...prev, result]);
      });
    });
  }, []);

  useEffect(() => {
    const pageChange = () => {
      let lastIndex = page * 6;
      let firstIndex = lastIndex - 6;
      setSlicedNotes(notes.slice(firstIndex, lastIndex));
    };
    pageChange();
  }, [notes, page]);

  const [values, setValues] = useState({
    newTitle: "",
    newTag: "",
    newNote: "",
  });

  const { newTitle, newTag, newNote } = values;

  const onSubmit = async (e) => {
    if (newTitle === "") {
      setSnackMsg("No Title, Note not saved");
      handleClickSnack();
      return;
    }
    if (newNote === "") {
      setSnackMsg("Nothing to Save");
      handleClickSnack();
      return;
    }
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "Notes"), {
        title: newTitle,
        tag: newTag,
        note: newNote,
        timeStamp: serverTimestamp(),
        id: uuidv4(),
      });
      if (docRef) {
        setSnackMsg("Note Saved");
        handleClickSnack();
        setValues({ newTitle: "", newTag: "", newNote: "" });
      }
    } catch (e) {
      setSnackMsg("Note not saved");
      handleClickSnack();
    }
  };

  const handleChangeNew = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickSnack = () => {
    setSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
          message={snackMsg}
          action={action}
        />
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
              <Stack spacing={3} sx={{ mx: 1, alignItems: "center" }}>
                <TextField
                  label="Title"
                  type={"text"}
                  variant="filled"
                  size="small"
                  value={newTitle}
                  fullWidth
                  onChange={handleChangeNew("newTitle")}
                />
                <TextField
                  label="Tag"
                  type={"text"}
                  variant="filled"
                  size="small"
                  value={newTag}
                  fullWidth
                  onChange={handleChangeNew("newTag")}
                />
                <TextField
                  label="Note"
                  type={"text"}
                  variant="filled"
                  value={newNote}
                  multiline
                  fullWidth
                  onChange={handleChangeNew("newNote")}
                />
                <Button
                  variant="outlined"
                  sx={{
                    maxWidth: 100,
                  }}
                  onClick={onSubmit}
                >
                  Create
                </Button>
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
                      <Note
                        title={note.title}
                        tag={note.tag}
                        note={note.note}
                        id={note.id}
                      />
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
