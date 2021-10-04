import GroupIcon from "@mui/icons-material/Group";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import React, { useContext } from "react";
import { ChatContext } from "../..";

export const ChannelInfo = () => {
  const { activeChannelTopic, activeChannelOnline } = useContext(ChatContext);

  return (
    <Grid container alignItems="center" padding={2}>
      <Grid item xs={10}>
        {activeChannelTopic}
      </Grid>
      <Grid item xs={2}>
        <Chip icon={<GroupIcon />} label={activeChannelOnline} />
      </Grid>
    </Grid>
  );
};
