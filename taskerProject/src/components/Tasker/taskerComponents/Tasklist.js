import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ListGroup } from "react-bootstrap";
import { RiHistoryFill, RiCheckboxCircleFill } from "react-icons/ri";
import { FiX } from "react-icons/fi";

const TaskInfo = ({ elem }) => {
  return (
    <ListGroup className="mx-2 mt-3">
      <ListGroup.Item className="">{elem.name}</ListGroup.Item>
      <ListGroup.Item>Created by {elem.createdBy}</ListGroup.Item>
      <ListGroup.Item>
        Created at{" "}
        {new Date(elem.createdAt).toLocaleString("en-GB", {
          timeZone: "CET",
        })}
      </ListGroup.Item>

      {elem.completed ? (
        <ListGroup.Item>Completed by {elem.completedBy}</ListGroup.Item>
      ) : null}

      <br />
    </ListGroup>
  );
};

const TaskCard = ({ elem, toggleTask, removeTask }) => {
  return (
    <ListGroup.Item
      className="mx-auto border border-secondary mb-2"
      key={elem.key}
    >
      <TaskInfo elem={elem} />
      <Button
        size="sm"
        className="ms-2"
        variant="outline-danger"
        onClick={() => {
          removeTask(elem.key);
        }}
      >
        <FiX />
      </Button>

      <Button
        className="ms-2"
        size="sm"
        variant={!elem.completed ? "outline-success" : "outline-dark"}
        onClick={() => {
          toggleTask(elem.key);
        }}
      >
        {" "}
        {!elem.completed ? <RiCheckboxCircleFill /> : <RiHistoryFill />}
      </Button>
    </ListGroup.Item>
  );
};

export function Tasklist({ tasks, removeTask, showCompleted, toggleTask }) {
  return (
    <ListGroup className="mx-2 mt-3">
      {tasks?.map((elem) => {
        if (showCompleted === elem.completed) {
          return (
            <TaskCard
              elem={elem}
              removeTask={removeTask}
              toggleTask={toggleTask}
            />
          );
        }
        return null;
      })}
    </ListGroup>
  );
}
