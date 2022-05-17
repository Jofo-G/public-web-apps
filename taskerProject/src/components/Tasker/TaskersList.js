import "../../App.css";
import { Tasker } from "./Tasker";
import React, { useState, useEffect } from "react";
import { database } from "../../firebase-config";
import { ref, set, onValue, push } from "firebase/database";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function TaskersList({ userName }) {
  const [newTaskerName, setNewTaskerName] = useState("");
  const [taskers, setTaskers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const unsub = onValue(
      ref(database, `users/${userName}/taskers`),
      (snapshot) => {
        const data = snapshot.val();
        let new_taskers = [];
        if (data !== null) {
          for (let elem in data) {
            new_taskers.push(elem);
          }
        }
        setTaskers(new_taskers);
        setIsLoading(false);
      },
      (error) => setErrorMsg(error.message)
    );

    return () => unsub();
  }, [userName]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (errorMsg) {
    return <h1>{errorMsg}</h1>;
  }

  const createTasker = async (e) => {
    e.preventDefault();
    const newTaskerRef = push(ref(database, "taskers"));
    await set(newTaskerRef, {
      key: newTaskerRef.key,
      name: newTaskerName,
      changePermissions:  {[userName]:userName},
      users: {[userName]:userName},
      owner: userName,
    });
    await set(
      ref(database, `users/${userName}/taskers/${newTaskerRef.key}`),
      newTaskerName
    );
    setNewTaskerName("");
  };

  return (
      <div className="mx-auto">
        <Form className="mb-2 mt-2" onSubmit={createTasker}>
          <Form.Control
            placeholder="Enter new Tasker name"
            className="w-auto mx-auto"
            value={newTaskerName}
            maxLength="32"
            minLength="4"
            required
            onChange={({ target }) => {
              setNewTaskerName(target.value);
            }}
          />
          <Button className="mt-2" variant="dark" size="sm" type="submit">
            Create Tasker
          </Button>{" "}
        </Form>
        <React.Fragment>
          {taskers?.map((v) => (
            <Tasker
              key={v}
              taskerId={v}
              userName={userName || "No username"}
              userId={userName}
            />
          ))}
        </React.Fragment>
      </div>
  );
}
