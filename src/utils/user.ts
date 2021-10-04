import { getLoggedUser } from "./auth";
import { insertToPath, listenToDb } from "./db";

export type Users = {
  [userId: string]: { name: string; photo: string };
};

export const updateSelf = () => {
  const user = getLoggedUser();
  if (!user) {
    throw new Error("No user");
  }
  insertToPath("users/" + user.uid, {
    name: user.displayName,
    photo: user.photoURL,
  });
};

export const listenToUsers = (callback: (data: Users) => void) => {
  listenToDb("users", (data: unknown) => callback(data as Users));
};
