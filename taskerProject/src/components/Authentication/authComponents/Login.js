import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login({ login, setLoginEmail, setLoginPass }) {
  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="w-auto mx-auto"
            type="email"
            name="emailaddress"
            placeholder="Enter email"
            onChange={({ target }) => setLoginEmail(target.value)}
            required
            minLength="4"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="w-auto mx-auto"
            type="password"
            placeholder="Enter password"
            onChange={({ target }) => setLoginPass(target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Button variant="dark" display="block" type="submit">
            {" "}
            Login
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
