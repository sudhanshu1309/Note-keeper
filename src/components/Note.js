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
import React from "react";

const Note = () => {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button onClick={handleOpen}>
          <Box>
            <Typography variant="h6" color="initial" pt={1} textAlign="center">
              Title
            </Typography>
            <Typography
              variant="subtitle1"
              color="initial"
              textAlign="left"
              px={2}
            >
              Tag
            </Typography>
            <Typography
              variant="body2"
              color="initial"
              textAlign={"justify"}
              p={2}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              officia iure nemo, corporis quasi id veniam deleniti possimus
              maiores neque repudiandae vero unde explicabo sequi eos mollitia
              doloribus? Obcaecati, modi?
            </Typography>
          </Box>
        </Button>
        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
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
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default Note;
