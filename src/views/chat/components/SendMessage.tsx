import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { sendMessage } from "../../../utils/chat";
import { ChatContext } from "..";

const SendMessage = () => {
  const [value, setValue] = useState("");
  const { activeChannel } = useContext(ChatContext);

  const sendMessageCallback = () => {
    sendMessage(value, activeChannel);
    setValue("");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <OutlinedInput
        placeholder="Positive vibes..."
        value={value}
        onKeyDown={(e) => e.code === "Enter" && sendMessageCallback()}
        onChange={(e) => setValue(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={sendMessageCallback} edge="end">
              <SendIcon />
            </IconButton>
          </InputAdornment>
        }
        // sx={{ margin: 2 }}
        fullWidth
      />
    </Box>
  );
};

export default SendMessage;
