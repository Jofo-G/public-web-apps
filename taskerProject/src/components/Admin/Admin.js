import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, ListGroup, Button } from "react-bootstrap";

import "../../App.css";
import { ref, onValue } from "firebase/database";
import { database } from "./../../firebase-config";
import { TaskersList } from "../Tasker/TaskersList";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState("");
  useEffect(() => {
    const unsubUsers = updateUsers();
    return () => {
      unsubUsers();
    };
  }, []);

  const updateUsers = () => {
    return onValue(ref(database, `users/`), (snapshot) => {
      const data = snapshot.val();
      let newUsers = Object.keys(data);
      setUsers(newUsers);
    });
  };

  return (
    <Stack direction="horizontal" gap={3} className="bg-light border">
      <ListGroup className="m-auto w-auto pb-2">
        <h2>Users</h2>
        {users?.map((user) => {
          return (
            <ListGroup.Item>
              <h5>{user}</h5>
              <Button size='sm'
              variant='dark'
                onClick={() => {
                  setChosenUser(user);
                }}
              >
                Pick user
              </Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      { chosenUser &&
      <div className="m-auto">
      <h2>{chosenUser}'s Taskers</h2>
      <TaskersList userName={chosenUser}/>
      </div>}
    </Stack>
  );
};
