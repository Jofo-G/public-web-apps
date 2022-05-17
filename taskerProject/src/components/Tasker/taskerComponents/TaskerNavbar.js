import "../../../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, ButtonGroup } from "react-bootstrap";
import { FiSettings, FiMinus } from "react-icons/fi";
import { RiFolderHistoryFill } from "react-icons/ri";

const ButtonWithPict = ({ onClick, Picture }) => {
  return (
    <Button
      variant="dark"
      onClick={() => {
        onClick();
      }}
    >
      <Picture />
    </Button>
  );
};

export function TaskerNavbar({
  taskerName,
  setMinimized,
  setShowOptions,
  setShowHistory,
}) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="ms-3 text-nowrap"> {taskerName}</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <ButtonGroup className="m-2">
          <ButtonWithPict
            onClick={() => {
              setMinimized((old) => !old);
            }}
            Picture={FiMinus}
          />
          <ButtonWithPict
            onClick={() => {
              setShowHistory((old) => !old);
            }}
            Picture={RiFolderHistoryFill}
          />
          <ButtonWithPict
            onClick={() => {
              setShowOptions((old) => !old);
            }}
            Picture={FiSettings}
          />
        </ButtonGroup>
      </Navbar.Collapse>
    </Navbar>
  );
}
