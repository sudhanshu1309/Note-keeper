import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  createTheme,
  IconButton,
  Modal,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import CloseIcon from "@mui/icons-material/Close";

const Note = ({ title, tag, note, id }) => {
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

  const style = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    margin: "auto",
    maxWidth: "600px",
    bgcolor: "background.paper",
    border: "1px solid #1976d2",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);

  const handleModal = () => {
    if (!open) {
      setValues({ oldTitle: title, oldTag: tag, oldNote: note });
    }
    setOpen(!open);
  };

  const [values, setValues] = useState({
    oldTitle: "",
    oldTag: "",
    oldNote: "",
  });
  const handleChangeOld = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [snack, setSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const { oldTitle, oldTag, oldNote } = values;

  const onSubmit = async (e) => {
    if (oldTitle === "") {
      setSnackMsg("No Title, Note not saved");
      handleClickSnack();
      return;
    }
    if (oldNote === "") {
      setSnackMsg("Nothing to Save");
      handleClickSnack();
      return;
    }
    e.preventDefault();
    // Updating by creating a reference to the doc

    const noteRef = doc(db, "Notes", id);

    await updateDoc(noteRef, {
      title: oldTitle,
      tag: oldTag,
      note: oldNote,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        setSnackMsg("Note Saved");
        handleClickSnack();
      })
      .catch(() => {
        setSnackMsg("Note not saved");
        handleClickSnack();
      });
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
        <Button onClick={handleModal}>
          <Box>
            <Typography variant="h6" color="initial" pt={1} textAlign="center">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="initial"
              textAlign="left"
              px={2}
            >
              {tag}
            </Typography>
            <Typography
              variant="body2"
              color="initial"
              textAlign={"justify"}
              p={2}
            >
              {note}
            </Typography>
          </Box>
        </Button>
        {/* Modal */}
        <Modal open={open} onClose={handleModal}>
          <Box sx={style}>
            <Stack spacing={3} sx={{ mx: 1, alignItems: "center" }}>
              <TextField
                label="Title"
                type={"text"}
                variant="filled"
                size="small"
                // defaultValue={title}
                value={oldTitle}
                fullWidth
                onChange={handleChangeOld("oldTitle")}
              />
              <TextField
                label="Tag"
                type={"text"}
                variant="filled"
                size="small"
                // defaultValue={tag}
                value={oldTag}
                onChange={handleChangeOld("oldTag")}
                fullWidth
              />
              <TextField
                label="Note"
                type={"text"}
                variant="filled"
                multiline
                fullWidth
                // defaultValue={note}
                value={oldNote}
                onChange={handleChangeOld("oldNote")}
              />
              <Button
                variant="outlined"
                sx={{ maxWidth: 5 }}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default Note;
