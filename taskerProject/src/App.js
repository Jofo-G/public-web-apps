import "./App.css";
import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { Authenticate } from "./components/Authentication/Authenticate";
import { TaskersList } from "./components/Tasker/TaskersList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { database } from "./firebase-config";
import { ref, get} from "firebase/database";
import { Admin } from "./components/Admin/Admin";
export const AdminContext = React.createContext();

function App() {
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (user.displayName) {
        setUserName(user.displayName);
      } else {
        signOut(auth);
      }
    } else {
      setUserName("");
    }
  });

  useEffect(() => {
    if (userName)
      get(ref(database, `users/${userName}/admin`)).then((snapshot) => {
        if (snapshot.exists()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
  }, [userName]);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AdminContext.Provider value={isAdmin}>
      <div style={{ textAlign: "center" }}>
        {userName ? (
          <div>
            <Navbar bg="dark" variant="dark" className="mx-auto w-auto">
              <Container>
                <Navbar.Brand>Taskerify</Navbar.Brand>
                <Nav>
                  <Navbar.Brand font-color="black">{userName}</Navbar.Brand>
                  <Button variant="dark" onClick={logout}>
                    Sign Out
                  </Button>
                </Nav>
              </Container>
            </Navbar>
            <TaskersList userName={userName} />
            {isAdmin && <Admin />}
          </div>
        ) : (
          <Authenticate />
        )}
      </div>
    </AdminContext.Provider>
  );
}

export default App;
