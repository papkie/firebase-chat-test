import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import "../config/firebase";
import { firebaseApp } from "../config/firebase";
import { updateSelf } from "./user";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp());

export const firebaseLogin = () => {
  signInWithPopup(auth, provider);
};

export const getLoggedUser = () => {
  return auth.currentUser;
};

export const firebaseLoginListener = async (
  setUser: (user: User | null) => void
) => {
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (user) {
      updateSelf();
    }
  });
};

export type { User };
