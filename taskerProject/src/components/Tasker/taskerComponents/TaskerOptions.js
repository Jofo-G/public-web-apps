import "../../../App.css";
import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Button,
  Col,
  Form,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { FaWrench } from "react-icons/fa";
import { ref, set, onValue } from "firebase/database";
import { database } from "../../../firebase-config";
import { AdminContext } from "../../../App";

export const TaskerOptions = ({ userName, owner, taskerId }) => {
  const [addToTasker, setAddToTasker] = useState("");
  const [changePermission, setChangePermissions] = useState([]);
  const [taskerUsers, setTaskerUsers] = useState([]);
  const isAdmin = useContext(AdminContext);

  useEffect(() => {
    const unsubPerms = updatePermissions();
    const unsubTasker = updateTaskerUsers();
    return () => {
      unsubTasker();
      unsubPerms();
    };
  }, []);

  const updateTaskerUsers = () => {
    return onValue(ref(database, `taskers/${taskerId}/users`), (snapshot) => {
      const data = snapshot.val();
      let newUsers = [];
      for (let elem in data) {
        newUsers.push(data[elem]);
      }
      // If there are no users left automatically remove tasker from db
      if (!data) {
        set(ref(database, `taskers/${taskerId}`), null);
        return;
      }
      setTaskerUsers(newUsers);
    });
  };

  const removeTasker = async () => {
    taskerUsers.forEach((user) => {
      set(ref(database, `users/${user}/taskers/${taskerId}`), null);
    });
    set(ref(database, `taskers/${taskerId}`), null);
  };

  const updatePermissions = () => {
    return onValue(
      ref(database, `taskers/${taskerId}/changePermissions`),
      (snapshot) => {
        const data = snapshot.val();
        let newPerms = [];
        if (data !== null) {
          for (let elem in data) {
            newPerms.push(data[elem]);
          }
          setChangePermissions(newPerms);
        }
      }
    );
  };

  const togglePermissions = (user) => {
    if (!changePermission.includes(user)) {
      set(ref(database, `taskers/${taskerId}/changePermissions/${user}`), user);
    } else {
      set(ref(database, `taskers/${taskerId}/changePermissions/${user}`), null);
    }
  };

  const addUserToTasker = (event) => {
    event.preventDefault();
    if (!addToTasker) return;
    set(ref(database, `taskers/${taskerId}/users/${addToTasker}`), addToTasker);
    set(ref(database, `users/${addToTasker}/taskers/${taskerId}`), taskerId);
    setAddToTasker("");
  };

  const removeUserFromTasker = (user) => {
    set(ref(database, `users/${user}/taskers/${taskerId}`), null);
    set(ref(database, `taskers/${taskerId}/users/${user}`), null);
  };

  const RemoveUserButton = ({ user }) => {
    return (
      <Button
        className="mx-1"
        disabled={userName !== owner && userName !== user && !isAdmin}
        size="sm"
        variant=""
        onClick={() => removeUserFromTasker(user)}
      >
        <AiOutlineClose />
      </Button>
    );
  };

  const TogglePermissionsButton = ({ user }) => {
    return (
      <Button
        className="mx-1"
        disabled={
          (!changePermission.includes(userName) || user === owner) && !isAdmin
        }
        variant=""
        size="sm"
        onClick={() => togglePermissions(user)}
      >
        <FaWrench></FaWrench>{" "}
      </Button>
    );
  };

  const UserRow = ({ user }) => {
    return (
      <ListGroup.Item
        variant={changePermission.includes(user) ? "primary" : ""}
      >
        {changePermission.includes(userName) || user === userName || isAdmin ? (
          <div>
            {user}
            <ButtonGroup>
              <TogglePermissionsButton user={user} />
              <RemoveUserButton user={user} />
            </ButtonGroup>
          </div>
        ) : (
          <div>{user}</div>
        )}
      </ListGroup.Item>
    );
  };

  return (
    <Col className="m-2">
      {userName === owner || isAdmin ? (
        <Button variant="dark" className="mb-2" onClick={removeTasker}>
          Remove Tasker
        </Button>
      ) : null}
      {changePermission.includes(userName) || isAdmin ? (
        <Form onSubmit={addUserToTasker}>
          <Form.Group>
            <Form.Control
              className="mb-2 w-auto mx-auto"
              type="text"
              placeholder="Enter an username to add"
              onChange={({ target }) => {
                setAddToTasker(target.value);
              }}
              required
              minLength="4"
              value={addToTasker}
            />
            <Button type="submit" variant="dark" size="sm">
              Add user
            </Button>
          </Form.Group>
        </Form>
      ) : null}
      <Container>
        <ListGroup>
          Users:
          {taskerUsers.map((user) => {
            return <UserRow user={user} />;
          })}
        </ListGroup>
      </Container>
    </Col>
  );
};
