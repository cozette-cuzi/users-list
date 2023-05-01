import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import useForm from "../hooks/useForm";

const Form = (props) => {
  const {
    user,
    handleFormSubmission,
    handleInputChange,
    initialize,
    validateEmail,
    validatePhone,
  } = useForm(props);

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
                name="firstName"
                onChange={handleInputChange}
              />
              <TextField
                error={user.lastName.length !== 0 && user.lastName.length <= 2}
                sx={{ m: 1 }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                value={user.lastName}
                name="lastName"
                onChange={handleInputChange}

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
                name="email"
                onChange={handleInputChange}

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
                name="phone"
                onChange={handleInputChange}
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
