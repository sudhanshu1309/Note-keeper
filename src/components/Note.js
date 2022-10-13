import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  createTheme,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Note = ({ title, tag, note }) => {
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
    setOpen(!open);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
                defaultValue={title}
                fullWidth
              />
              <TextField
                label="Tag"
                type={"text"}
                variant="filled"
                size="small"
                defaultValue={tag}
                fullWidth
              />
              <TextField
                label="Note"
                type={"text"}
                variant="filled"
                multiline
                fullWidth
                defaultValue={note}
              />
              <Button variant="outlined" sx={{ maxWidth: 5 }}>
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
