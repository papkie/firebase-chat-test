import Card from "@mui/material/Card";
import React from "react";
import { ChannelInfo } from "./ChannelInfo";
import { ChannelList } from "./ChannelList";

export const Toolbox = () => {
  return (
    <Card sx={{ borderRadius: "0 0 16px 16px" }}>
      <ChannelList />
      <ChannelInfo />
    </Card>
  );
};
