import en from "./en";

const pl: { [key in keyof typeof en]: string } = {
  Hi: "Hej!",
  "Please login to say hello to your friends!":
    "Zaloguj się aby się przywitać z przyjaciółmi!",
  "Sign in with Google": "Zaloguj się z Google",
};

export default pl;
