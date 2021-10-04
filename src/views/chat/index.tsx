import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import React, { useEffect, useState } from "react";
import { ChannelDetails, getChannels } from "../../utils/channels";
import {
  listenToMessages,
  MessageDetails,
  stopListeningToMessages,
} from "../../utils/chat";
import { listenToOnline, stopListeningToOnline } from "../../utils/online";
import { listenToUsers, Users } from "../../utils/user";
import { HistoryItem } from "./components/HistoryItem";
import SendMessage from "./components/SendMessage";
import { Toolbox } from "./components/toolbox";

export const ChatContext = React.createContext<{
  channels: ChannelDetails[];
  activeChannel: string;
  activeChannelTopic: string;
  setActiveChannel: (channelId: string) => void;
  activeChannelOnline: number;
}>({
  channels: [],
  activeChannel: "main",
  activeChannelTopic: "",
  setActiveChannel: (channelId: string) => {},
  activeChannelOnline: 0,
});

const Chat = () => {
  const [channels, setChannels] = useState<Array<ChannelDetails>>([]);
  const [activeChannel, setActiveChannel] = useState<string>("");
  const [messages, setMessages] = useState<Array<MessageDetails>>([]);
  const [users, setUsers] = useState<Users>({});
  const [activeChannelOnline, setActiveChannelOnline] = useState(0);

  useEffect(() => {
    getChannels().then((v) => {
      setChannels(v);
      setActiveChannel(v[0]?.id);
    });

    listenToUsers(setUsers);
  }, []);

  useEffect(() => {
    setMessages([]);
    listenToMessages(activeChannel, setMessages);
    listenToOnline(activeChannel, setActiveChannelOnline);
    return () => {
      stopListeningToMessages(activeChannel);
      stopListeningToOnline(activeChannel);
    };
  }, [activeChannel]);

  return (
    <ChatContext.Provider
      value={{
        channels,
        activeChannel,
        setActiveChannel,
        activeChannelTopic:
          channels.find((c) => c.id === activeChannel)?.topic || "n/a",
        activeChannelOnline,
      }}
    >
      <Grid container direction="column" height="100vh">
        <Grid item>
          <Toolbox />
        </Grid>
        <Grid xs="auto" item flex={1} sx={{ overflow: "auto" }}>
          <List>
            {messages.map((message, k) => {
              const user = users[message.userId];
              return (
                <HistoryItem
                  key={"message" + k}
                  userName={user.name}
                  photo={user.photo}
                  message={message.message}
                  date={new Date(message.date)}
                />
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <SendMessage />
        </Grid>
      </Grid>
    </ChatContext.Provider>
  );
};

export { Chat };
