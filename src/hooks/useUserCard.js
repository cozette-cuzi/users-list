import { useState } from "react";
import { useConfirm } from "material-ui-confirm";

function useUserCard(props) {
  const confirm = useConfirm();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteUser = (id) => {
    confirm({ description: "Are you sure you want to delete this user?" })
      .then(() => {
        props.onDeleteUser(id);
        props.showSnackbar("User Deleted!", "warning");
      })
      .catch(() => {
        console.log("canceled");
      });
  };

  return {
    anchorEl,
    handleClick,
    handleClose,
    handleDeleteUser,
  };
}

export default useUserCard;
