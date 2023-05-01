import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/misc";
import uniquid from "uniqid";

function useForm(props) {
  
  const emptyUser = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const validateEmail = /\S+@\S+\.\S+/;
  const validatePhone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;

  function userValid(user) {
    return (
      user.firstName.length > 2 &&
      user.lastName.length > 2 &&
      validateEmail.test(user.email) &&
      validatePhone.test(user.phone)
    );
  }
  const [user, setUser] = useState(emptyUser);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (props.currentUser.id !== undefined) {
      setUser(props.currentUser);
      setEditMode(true);
    }
  }, [props.currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

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
    } else {
      props.showSnackbar("Fields are not valid!", "error");
      console.log("user not valid");
    }
  };

  const initialize = () => {
    setEditMode(false);
    setUser(emptyUser);
    props.handleClose();
  };

  return {
    user,
    setUser, setEditMode,
    emptyUser,
    handleInputChange,
    handleFormSubmission,
    initialize,
    validateEmail,
    validatePhone
  };
}

export default useForm;
