import { getLoggedUser } from "./auth";
import { insertToPath, listenToDb, stopListeningToDb } from "./db";

export const updateSelfStatus = (
  channel: string,
  status: "online" | "offline"
) => {
  const user = getLoggedUser();
  if (!user) {
    throw new Error("No user");
  }
  insertToPath("online/" + channel + "/" + user.uid, {
    status,
  });
};

export const listenToOnline = (
  channel: string,
  callback: (data: number) => void
) => {
  listenToDb("online/" + channel, (data: unknown) => {
    callback(
      Object.values(
        data as { [userId: string]: { status: "online" | "offline" } }
      ).filter((v) => v.status === "online").length
    );
  });
};

export const stopListeningToOnline = (channel: string) => {
  stopListeningToDb("online/" + channel);
};
