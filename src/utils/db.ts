import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  Unsubscribe,
} from "firebase/database";
import { firebaseApp } from "../config/firebase";

const database = getDatabase(firebaseApp());

export const getRef = (path: string) => ref(database, path);

export const read = (path: string) => {
  return get(getRef(path));
};

const listeners: {
  [path: string]: Unsubscribe;
} = {};

export const listenToDb = (path: string, callback: (data: unknown) => void) => {
  if (listeners[path]) {
    listeners[path]();
  }
  listeners[path] = onValue(getRef(path), (snapshot) => {
    const data = snapshot.val() || {};
    callback(data);
  });
};

export const listenToDbArray = (
  path: string,
  callback: (data: Array<unknown>) => void,
  limit: number = 0
) => {
  if (listeners[path]) {
    listeners[path]();
  }
  listeners[path] = onValue(getRef(path), (snapshot) => {
    const data = snapshot.val() || {};

    callback((Object.values(data) || []).splice(-limit));
  });
};

export const stopListeningToDb = (path: string) => {
  if (listeners[path]) {
    listeners[path]();
  }
};

export const insertToPath = (path: string, parameters: unknown) => {
  set(getRef(path), parameters);
};

export const pushToPath = (path: string, parameters: unknown) => {
  push(getRef(path), parameters);
};
