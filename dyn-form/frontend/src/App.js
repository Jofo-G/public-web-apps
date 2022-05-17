import React, { useState, useEffect } from "react";
import Forms from "./components/Forms";
import DataTable from "./components/DataTable";
import { getEnquiries, getDefinition, postData } from "./api/index";
import { Button, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const sendInformation = {
  DidntSend: 0,
  SendSucces: 1,
  SendFailure: 2,
};

const App = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(sendInformation.DidntSend);

  const [formsLoading, setFormsLoading] = useState(true);
  const [showForms, setshowForms] = useState(true);
  const [forms, setForms] = useState([]);
  const [formValues, setFormValues] = useState({});



  useEffect(() => {
    getDefinition().then((data) => {
      setForms(data);
    }).catch(error => (console.error(error.message)));

    getEnquiries().then((data) => {
      setEnquiries(data);
      setEnquiriesLoading(false);
    }).catch(error => (console.error(error.message)));
  }, [showForms]);

  useEffect(() => {
    if (forms?.length) {
      emptyValues();
      setFormsLoading(false);
    }
  }, [forms]);

  const emptyValues = () => {
    let formVals = {};
    for (let elem in forms) {
      formVals = { ...formVals, [forms[elem].id]: "" };
    }
    setFormValues(formVals);
  };

  const uploadData = (e) => {
    e.preventDefault();
    setSending(true);
    postData(formValues)
      .then(() => setSendStatus(sendInformation.SendSucces))
      .catch(() => setSendStatus(sendInformation.SendFailure))
      .finally(() => {
        setSending(false);
        emptyValues();
      });
  };

  return (
    <Stack gap={3} className="m-auto text-center pt-3">
      <Button
        className="w-auto m-auto"
        onClick={() => setshowForms((prev) => !prev)}
      >
        {showForms ? "Switch to tables" : "Switch to form"}
      </Button>
      {showForms ? (
        <>
          {formsLoading ? (
            <h3>Loading form...</h3>
          ) : (
            <Forms
              forms={forms}
              setFormValues={setFormValues}
              formValues={formValues}
              onSubmit={uploadData}
              sending={sending}
              sendStatus={sendStatus}
            />
          )}
        </>
      ) : (
        <>
          {enquiriesLoading ? (
            <h3>Loading enquiries...</h3>
          ) : (
            <DataTable definition={forms} data={enquiries} />
          )}
        </>
      )}
    </Stack>
  );
};

export default App;
