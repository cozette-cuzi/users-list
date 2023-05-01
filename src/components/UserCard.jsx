import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import NumbersIcon from "@mui/icons-material/Numbers";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { stringAvatar } from "../utils/misc";
import useUserCard from "../hooks/useUserCard";

const UserCard = (props) => {
  const { id, firstName, lastName, email, phone } = props.user;
  const { anchorEl, handleClick, handleClose, handleDeleteUser } =
    useUserCard(props);
  const open = Boolean(anchorEl);

  return (
    <>
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          <Stack
            justifyContent={"space-between"}
            sx={{ mb: 2 }}
            direction="row"
            spacing={1}
          >
            <Stack direction="row" spacing={1}>
              <Avatar {...stringAvatar(`${firstName} ${lastName}`)} />
              <Typography
                variant="h5"
                component="div"
                color="primary"
                style={{ marginTop: "5px" }}
              >
                {`${firstName} ${lastName}`}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent={"space-around"}>
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  style={{ margin: "0px" }}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      props.openEditForm(props.user);
                      handleClose();
                    }}
                  >
                    <Edit color="success" />
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteUser(id)}>
                    <Delete color="error" />
                  </MenuItem>
                </Menu>
              </div>
            </Stack>
          </Stack>
          {/* <Divider variant="left" /> */}

          <Stack direction={"row"} my={1} ml={1}>
            <AlternateEmailIcon
              color="primary"
              sx={{ marginRight: "15px", fontSize: "1" }}
            />
            <Typography variant="body1">{`${email}`}</Typography>
          </Stack>
          <Stack direction={"row"} my={1} ml={1}>
            <LocalPhoneIcon
              color="primary"
              sx={{ marginRight: "15px", fontSize: "1" }}
            />

            <Typography variant="body1">{phone}</Typography>
          </Stack>
          <Stack direction={"row"} my={1} ml={1}>
            <NumbersIcon
              color="primary"
              sx={{ marginRight: "15px", fontSize: "1" }}
            />
            <Typography variant="body1">{id}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default UserCard;
