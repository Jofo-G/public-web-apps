import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../../firebase-config";
import { Register } from "./authComponents/Register";
import { Login } from "./authComponents/Login";
import { ref, set } from "firebase/database";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Alert } from "react-bootstrap";
import { useListKeys } from "react-firebase-hooks/database";

export function Authenticate() {
  const [showLogin, setShowLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [snapshots] = useListKeys(ref(database, "users"));


  const register = async (e) => {
    e.preventDefault();
    if (snapshots.includes(registerName)) {
      setErrorMsg(`Entered name is already in use.`);
    } else {
      try {
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPass
        ).then(async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: registerName,
          });
          set(ref(database, `users/${registerName}/taskers`), []);
        });

        setSuccessMsg("Registered successfully!");
      } catch (error) {
        if(error.message === "Firebase: Error (auth/email-already-in-use).")
          setErrorMsg("Entered email is already used.");
        else if(error.message === "Firebase: Error (auth/invalid-email).")
          setErrorMsg("Entered email is invalid.")
        else{
          setErrorMsg(error.message)
        }
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPass);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <Container className="align-middle">
      {showLogin ? (
        <Login
          login={login}
          setLoginPass={setLoginPass}
          setLoginEmail={setLoginEmail}
        />
      ) : (
        <Register
          register={register}
          setRegisterEmail={setRegisterEmail}
          setRegisterPass={setRegisterPass}
          setRegisterName={setRegisterName}
        />
      )}
      <Button
        className="mt-2 mb-2"
        variant="secondary"
        onClick={() => {
          setShowLogin(!showLogin);
          setSuccessMsg("");
          setErrorMsg("");
        }}
      >
        {showLogin ? "Dont have an account yet?" : "I have an account already."}
      </Button>
      {errorMsg ? <Alert className="w-auto m-auto" variant="danger"> {errorMsg} </Alert> : null}
      {successMsg ? <Alert className="w-auto m-auto" variant="success"> {successMsg} </Alert> : null}
    </Container>
  );
}
