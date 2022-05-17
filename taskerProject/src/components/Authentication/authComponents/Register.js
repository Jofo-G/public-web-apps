import "../../../App";
import React from "react";
import { Form, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Register({
  register,
  setRegisterEmail,
  setRegisterPass,
  setRegisterName,
}) {
  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={register}>
        <Form.Group>
          <Form.Label >Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={({ target }) => setRegisterEmail(target.value)}
            required
            className="w-auto mx-auto"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label >Name</Form.Label>
          <Form.Control
            className="w-auto mx-auto"
            type="name"
            placeholder="Enter name"
            onChange={({ target }) => setRegisterName(target.value)}
            required
            minLength="4"
          />
        </Form.Group>
        <Form.Group >
          <Form.Label >Password</Form.Label>
          <Form.Control
            className="w-auto mx-auto"
            type="password"
            placeholder="Enter password"
            onChange={({ target }) => setRegisterPass(target.value)}
            required
            minLength="6"
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Button variant='dark'  type="submit" className="mx-3">
            Register
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
