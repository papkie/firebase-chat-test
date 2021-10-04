import { initializeApp } from "firebase/app";
import { memoize } from "lodash";

const firebaseConfig = {
  apiKey: "AIzaSyBapUIdjpwlrpDxE3BDE25PQ7Kt5X9y11k",
  authDomain: "fintech-e029a.firebaseapp.com",
  databaseURL: "https://fintech-e029a.firebaseio.com",
  projectId: "fintech-e029a",
  storageBucket: "fintech-e029a.appspot.com",
  messagingSenderId: "229014763862",
  appId: "1:229014763862:web:79b5ed036ac7c10e79bef7",
};

export const firebaseApp = memoize(() => initializeApp(firebaseConfig));
