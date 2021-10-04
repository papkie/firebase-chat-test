import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useContext } from "react";
import { ChatContext } from "../..";

export const ChannelList = () => {
  const { activeChannel, setActiveChannel, channels } = useContext(ChatContext);

  return (
    <Tabs
      value={activeChannel}
      onChange={(e, newValue) => setActiveChannel(newValue)}
      variant="fullWidth"
      textColor="primary"
    >
      {channels.map((v) => (
        <Tab value={v.id} label={v.title} key={"channel_tab" + v.id} />
      ))}
    </Tabs>
  );
};
