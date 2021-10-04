import { getLoggedUser } from "./auth";
import { listenToDbArray, pushToPath, stopListeningToDb } from "./db";
import { updateSelfStatus } from "./online";

export type MessageDetails = {
  userId: string;
  message: string;
  date: string;
};

const validateMessageResponse = (
  message: unknown
): message is MessageDetails => {
  const messageDetails = message as MessageDetails;
  return !!(
    messageDetails.userId &&
    messageDetails.message &&
    messageDetails.date
  );
};

export const sendMessage = (message: string, channel: string) => {
  const user = getLoggedUser();
  if (!user) {
    throw new Error("No user");
  }

  pushToPath("messages/" + channel, {
    message,
    date: new Date().toISOString(),
    userId: user.uid,
  });
};

export const listenToMessages = (
  channel: string,
  callback: (msg: Array<MessageDetails>) => void
) => {
  if (!channel) {
    return;
  }
  listenToDbArray(
    "messages/" + channel,
    (response: Array<unknown>) => {
      callback(response.filter(validateMessageResponse));
    },
    20
  );
  updateSelfStatus(channel, "online");
};

export const stopListeningToMessages = (channel: string) => {
  stopListeningToDb(channel);
  updateSelfStatus(channel, "offline");
};
