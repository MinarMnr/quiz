import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";

const Login = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    var loginData;
    var auth = [];
    if (email !== "" && email === "admin@admin.com") {
      loginData = {
        email,
        password,
        type: "admin",
      };
      localStorage.removeItem("auth");
      auth = JSON.parse(localStorage.getItem("auth")) || [];
      auth.push(loginData);
      localStorage.setItem("auth", JSON.stringify(auth));
      setMessage("LoggedIn successfully as Admin");
      setVisible(true);
      setEmail("");
      setPassword("");
      setFormSubmit(true);
      window.location.href = "/list";
    } else if (email !== "" && email === "user@user.com") {
      loginData = {
        email,
        password,
        type: "user",
      };
      localStorage.removeItem("auth");
      auth = JSON.parse(localStorage.getItem("auth")) || [];
      auth.push(loginData);
      localStorage.setItem("auth", JSON.stringify(auth));
      setMessage("LoggedIn successfully as User");
      setVisible(true);
      setEmail("");
      setPassword("");
      setFormSubmit(true);
      window.location.href = "/list";
    } else {
      setMessage("Wrong email or password.");
      setVisible(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {visible && formSubmit && message != null && (
          <Message onDismiss={handleDismiss} positive header={message} />
        )}
        {visible && !formSubmit && message != null && (
          <Message onDismiss={handleDismiss} negative header={message} />
        )}
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              id="email"
              type="email"
              value={email || ""}
              required
              onChange={handleEmailChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              id="password"
              value={password || ""}
              required
              onChange={handlePasswordChange}
            />

            <Button
              type="submit"
              value="submit"
              color="teal"
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
