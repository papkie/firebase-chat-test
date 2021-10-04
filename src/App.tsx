import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { config } from "./config/app";
import { firebaseLoginListener, getLoggedUser } from "./utils/auth";
import {
  getCurrentLocale,
  getTranslationsForCurrentLanguage,
} from "./utils/translations";
import { Chat } from "./views/chat";
import { LoginPage } from "./views/login";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
      paper: "#000",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-selected": {
            color: "#fff",
          },
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState(getLoggedUser());
  firebaseLoginListener(setUser);
  return (
    <IntlProvider
      messages={getTranslationsForCurrentLanguage()}
      defaultLocale={config.defaultLocale}
      locale={getCurrentLocale()}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container fixed disableGutters>
          {user ? <Chat /> : <LoginPage />}
        </Container>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
