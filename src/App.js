import "./App.css";
import lightLogo from "./images/light-logo.png";
import darkLogo from "./images/dark-logo.png";


import React, { useEffect, useState } from "react";
import UsersList from "./components/UsersList";
import {
  Alert,
  AppBar,
  Container,
  CssBaseline,
  Fab,
  FormControlLabel,
  Snackbar,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Form from "./components/Form";
import { ConfirmProvider } from "material-ui-confirm";
import { emptyUser } from "./utils/misc";
import { Add } from "@mui/icons-material";

function App() {
  const list = localStorage.getItem("usersList")
    ? JSON.parse(localStorage.getItem("usersList"))
    : [];
  const [usersList, setUsersList] = useState(list);

  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = useState(emptyUser);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    localStorage.setItem("usersList", JSON.stringify(usersList));
  }, [usersList]);

  const handleAddNewUser = (newUser) => {
    setUsersList([...usersList, newUser]);
  };

  const handleDeleteUser = (userId) => {
    setUsersList(usersList.filter((user) => user.id !== userId));
  };

  const handleOpenEditForm = (user) => {
    setEditUser(user);
    handleOpen();
  };

  const handleEditUser = (editedUser) => {
    setUsersList(
      usersList.map((user) => {
        if (editedUser.id === user.id) {
          return editedUser;
        }
        return user;
      })
    );
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [severity, setServerity] = useState("success");

  const showSnackbar = (message, messageServirity) => {
    setSnackbarMessage(message);
    setServerity(messageServirity);
    setOpenSnackbar(true);
  };

  const hideSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  let lightTheme = createTheme({
    palette: {
      primary: {
        main: "#2bc0c7",
      },
      secondary: {
        main: "#fff",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2bc0c7",
      },
    }
  });

  const [themeSwitch, setThemeSwitch] = useState(false);

  return (
    <ThemeProvider theme={themeSwitch? darkTheme: lightTheme}>
      <CssBaseline />
      <main className="App">
        <ConfirmProvider>
          <AppBar color="secondary" position="static">
            <Toolbar>
              <img src={themeSwitch? darkLogo: lightLogo} height={35} alt="Logo"/>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <div>
                <FormControlLabel
                  label="Theme"
                  control={
                    <Switch
                      checked={themeSwitch}
                      onChange={() => setThemeSwitch(!themeSwitch)}
                      name="theme"
                    />
                  }
                />
              </div>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl">
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
              onClose={hideSnackbar}
            >
              <Alert severity={severity} sx={{ width: "100%" }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
            <Form
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              onAddUser={handleAddNewUser}
              currentUser={editUser}
              onEditUser={handleEditUser}
              showSnackbar={showSnackbar}
            />

            <UsersList
              usersList={usersList}
              onDeleteUser={handleDeleteUser}
              openEditForm={handleOpenEditForm}
              showSnackbar={showSnackbar}
            />
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
              }}
              onClick={handleOpen}
            >
              <Add style={{color: '#fff'}} />
            </Fab>
          </Container>
        </ConfirmProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
