import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

export const HistoryItem = ({
  userName,
  photo,
  message,
  date,
}: {
  userName: string;
  message: string;
  date: Date;
  photo: string;
}) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={userName} src={photo} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container>
            <Grid item flex={1}>
              <Typography variant="body2">{userName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {date.toLocaleTimeString()}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={message}
      />
    </ListItem>
  );
};
