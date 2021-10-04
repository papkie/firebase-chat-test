import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import React from "react";
import { FormattedMessage } from "react-intl";
import { firebaseLogin } from "../../utils/auth";

const LoginPage = () => {
  return (
    <Container fixed>
      <Box marginTop={10}>
        <Typography variant="h2" component="h2" textAlign="center">
          <FormattedMessage id="Hi" />
        </Typography>
        <Typography variant="h6" component="h6" textAlign="center">
          <FormattedMessage id="Please login to say hello to your friends!" />
        </Typography>
      </Box>
      <Box marginTop={10} textAlign="center" onClick={firebaseLogin}>
        <Button variant="outlined">
          <FormattedMessage id="Sign in with Google" />
        </Button>
      </Box>
    </Container>
  );
};

export { LoginPage };
