import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const DataTable = ({ data, definition }) => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {definition?.map((datum, index) => {
              return <th key={index}>{datum.id}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((datum, index) => {
            return (
              <tr key={index}>
                <td key={0}>{index}</td>
                {definition?.map(({id},index) => {
                  return <td key={index + 1}>{datum[id]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

export default DataTable