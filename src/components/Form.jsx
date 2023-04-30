import React, { useEffect, useState } from "react";
import uniquid from "uniqid";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import {
  capitalizeFirstLetter,
  emptyUser,
  userValid,
  validateEmail,
  validatePhone,
} from "../utils/misc";

const Form = (props) => {
  const [user, setUser] = useState(emptyUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (props.currentUser.id !== undefined) {
      setUser(props.currentUser);
      setEditMode(true);
    }
  }, [props.currentUser]);

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (userValid(user)) {
      if (editMode) {
        props.onEditUser(user);
        props.showSnackbar("User Update Successfully!", "success");
      } else {
        user.id = uniquid("user-");
        user.firstName = capitalizeFirstLetter(user.firstName);
        user.lastName = capitalizeFirstLetter(user.lastName);
        props.onAddUser(user);
        props.showSnackbar("User Saved Successfully!", "success");
      }
      initialize();
      console.log("user valid");
    } else {
      props.showSnackbar("Fields are not valid!", "error");
      console.log("user not valid");
    }
  };

  const initialize = () => {
    setEditMode(false);
    setUser(emptyUser);
    props.handleClose();
    console.log("closed");
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="alert-dialog-title">Add New User</DialogTitle>
        <form onSubmit={handleFormSubmission}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                error={
                  user.firstName.length !== 0 && user.firstName.length <= 2
                }
                sx={{ m: 1 }}
                id="outlined-error"
                label="First Name"
                variant="outlined"
                value={user.firstName}
                onChange={(event) =>
                  setUser({ ...user, firstName: event.target.value })
                }
              />
              <TextField
                error={user.lastName.length !== 0 && user.lastName.length <= 2}
                sx={{ m: 1 }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={user.lastName}
                onChange={(event) =>
                  setUser({ ...user, lastName: event.target.value })
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                sx={{ m: 1 }}
                error={
                  user.email.length !== 0 && !validateEmail.test(user.email)
                }
                fullWidth
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                value={user.email}
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <TextField
                error={
                  user.phone.length !== 0 && !validatePhone.test(user.phone)
                }
                sx={{ m: 1 }}
                fullWidth
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                value={user.phone}
                onChange={(event) =>
                  setUser({ ...user, phone: event.target.value })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={initialize}>Cancel</Button>
            <Button type="submit" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Form;
