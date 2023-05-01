import { createTheme } from "@mui/material";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}


 function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const validateEmail = /\S+@\S+\.\S+/;
const validatePhone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

function userValid(user) {
  return user.firstName.length > 2 
  && user.lastName.length > 2
  && validateEmail.test(user.email)
  && validatePhone.test(user.phone)
}
// const defaultUsers = [
//   {
//     id: "user-lgtl0x4n",
//     firstName: "Verona",
//     lastName: "Blair",
//     email: "blair@gmail.com",
//     phone: "+36708582374",
//   },
//   {
//     id: "user-lgtl1fj1",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@gmail.com",
//     phone: "+36708582543",
//   },
//   {
//     id: "user-lgtusyfg",
//     firstName: "Priya",
//     lastName: "Ponnap",
//     email: "priya.ponnap@gmail.com",
//     phone: "+36745582543",
//   },
//   {
//     id: "user-lgtut7ug",
//     firstName: "Ellawala",
//     lastName: "Ruveni",
//     email: "ruveni@gmail.com",
//     phone: "+367030002593",
//   },
//   {
//     id: "user-lgtuw9ji",
//     firstName: "Desiree",
//     lastName: "Burch",
//     email: "burch@gmail.com",
//     phone: "+367030002593",
//   },
// ];

const emptyUser = {
  id: undefined,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
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

export { capitalizeFirstLetter, stringAvatar, userValid, emptyUser, validateEmail, validatePhone, lightTheme, darkTheme };
