import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { sendInformation } from "../App";

const Forms = ({
  forms,
  onSubmit,
  setFormValues,
  formValues,
  sending,
  sendStatus,
}) => {
  return (
    <>
      <Form className="mx-auto p-3" onSubmit={onSubmit}>
        {forms?.map((form, index) => {
          return (
            <Form.Group controlId={form.id} key={index}>
              <Form.Label>{form.fieldName}</Form.Label>
              <Form.Control
                placeholder={`Enter the ${form.fieldName.toLowerCase()}`}
                className="mb-3 w-auto"
                type={form.id}
                onChange={({ target }) => {
                  setFormValues((old) => {
                    return { ...old, [form.id]: target.value };
                  });
                }}
                value={formValues[form.id]}
                required
                disabled={sending}
              ></Form.Control>
            </Form.Group>
          );
        })}
        <Button variant="primary" type="submit" disabled={sending}>
          {sending ? "Sending" : "Submit"}
        </Button>
      </Form>
      {sendStatus !== sendInformation.DidntSend ? (
        <Alert
          className="w-auto m-auto"
          variant={
            sendStatus === sendInformation.SendSucces ? "success" : "danger"
          }
        >
          {sendStatus === sendInformation.SendSucces
            ? "Enquiery successfully uploaded"
            : "Enquiery upload failed!"}
        </Alert>
      ) : null}
    </>
  );
};

export default Forms;
