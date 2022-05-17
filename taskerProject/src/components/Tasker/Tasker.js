import "../../App.css";
import React, { useState, useEffect } from "react";
import { Tasklist } from "./taskerComponents/Tasklist";
import { NewTask } from "./taskerComponents/NewTask";
import { TaskerOptions } from "./taskerComponents/TaskerOptions";
import { TaskerNavbar } from "./taskerComponents/TaskerNavbar";
import { database } from "../../firebase-config";
import { onValue, ref, set, get, child, push } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

export const updateGeneral = (database, dbAddress, setGeneral) => {
  onValue(ref(database, dbAddress), (snapshot) => {
    const data = snapshot.val();
    let newList = [];
    if (data !== null) {
      for (let elem in data) {
        newList.push(data[elem]);
      }
    }
    setGeneral(newList);
  });
};

export function Tasker({ taskerId, userName }) {
  const dbAdress = `taskers/${taskerId}/tasks/`;
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [taskerName, setTaskerName] = useState("Loading name");
  const [owner, setOwner] = useState("Couldnt fetch owner");
  const [showOptions, setShowOptions] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const unsubName = onValue(
      ref(database, `taskers/${taskerId}/name`),
      (snapshot) => {
        setTaskerName(snapshot.val());
      }
    );

    const unsubOwner = onValue(
      ref(database, `taskers/${taskerId}/owner`),
      (snapshot) => {
        setOwner(snapshot.val());
      }
    );

    const unsubTasks = updateTasks();

    return () => {
      unsubTasks();
      unsubOwner();
      unsubName();
    };
  }, []);

  const updateTasks = () => {
    return onValue(ref(database, dbAdress), (snapshot) => {
      const data = snapshot.val();
      let new_list = [];
      for (let elem in data) {
        new_list.push(data[elem]);
      }
      setTasks(new_list);
    });
  };

  const addTask = (event) => {
    event.preventDefault();
    if (!newTaskName) return;
    const newTaskRef = push(ref(database, dbAdress));
    set(newTaskRef, {
      name: newTaskName,
      createdBy: userName,
      completed: false,
      createdAt: Date.now(),
      key: newTaskRef.key,
    });
    setNewTaskName("");
  };

  const toggleTask = (taskKey) => {
    get(child(ref(database), dbAdress + taskKey + "/completed")).then(
      (snapshot) => {
        set(ref(database, dbAdress + taskKey + "/completed"), !snapshot.val());
      }
    );
    set(ref(database, dbAdress + taskKey + "/completedBy"), userName);
  };

  const removeTask = async (key) => {
    await set(ref(database, dbAdress + key), null);
  };

  return (
    <Container className="border border-dark border-2 rounded-2 mb-2 p-0 ">
      <TaskerNavbar
        setShowHistory={setShowHistory}
        setMinimized={setMinimized}
        setShowOptions={setShowOptions}
        taskerName={taskerName}
        owner={owner}
      />
      {!minimized ? (
        <Row className="m-auto">
          {showOptions ? (
            <TaskerOptions
              taskerId={taskerId}
              owner={owner}
              userName={userName}
            />
          ) : null}
          <Col >
            <div className="pt-2">
              {showHistory ? (
                <h2>Completed tasks</h2>
              ) : (
                <NewTask
                  updateTaskName={setNewTaskName}
                  addTask={addTask}
                  taskName={newTaskName}
                />
              )}
              <Tasklist
                tasks={tasks}
                removeTask={removeTask}
                showCompleted={showHistory}
                toggleTask={toggleTask}
              />
            </div>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}
