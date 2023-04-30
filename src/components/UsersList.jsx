import React from "react";
import UserCard from "./UserCard";
import { Grid, ListItem, Typography } from "@mui/material";
import image from "../images/no-data.svg";

const UsersList = (props) => {
  return (
    <>
      <Grid container mt={2}>
        {props.usersList.length > 0 ? (
          props.usersList.map((user) => (
            <Grid key={user.id} item>
              <ListItem>
                <UserCard
                  user={user}
                  onDeleteUser={props.onDeleteUser}
                  openEditForm={props.openEditForm}
                  showSnackbar={props.showSnackbar}
                />
              </ListItem>
            </Grid>
          ))
        ) : (
          <div style={{ margin: 'auto' }} >
            <img src={image} width={700} alt="No Data" />
            <Typography variant="h4" color='primary'>Oops!! No Users Found</Typography>
          </div>
        )}
      </Grid>
    </>
  );
};

export default UsersList;
