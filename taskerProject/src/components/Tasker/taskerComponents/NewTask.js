import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export function NewTask({ taskName, addTask, updateTaskName }) {
  return (
    <Form onSubmit={addTask}>
      <Form.Group>
        <Form.Control
          type="text"
          value={taskName || ""}
          onChange={({ target }) => {
            updateTaskName(target.value);
          }}
          placeholder="Enter new task"
          className="w-auto mx-auto"
          required
        />
      </Form.Group>
      <Button variant="dark" size="sm" className="mb-2 mt-2" type="submit">
        Add task
      </Button>
    </Form>
  );
}
