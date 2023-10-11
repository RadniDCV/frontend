import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Payrollemli() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/payempd")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://192.168.1.9:4000/delpayem/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(id);
          window.location.reload(true);
        } else {
          console.log(id);
          console.log(res.data.Status);
          alert("Error 2");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4">
      <h2 className="d-flex justify-content-center">
        Empleados asignados a planilla
      </h2>

      <div>
        <Table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Codigo Empleado</th>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key="index">
                <td>{item.id}</td>
                <td>{item.empid}</td>
                <td>{item.firstname}</td>
                <td>{item.middlename}</td>
                <td>{item.lastname}</td>
                <td>{item.lastname2}</td>
                <td>
                  <Button
                    variant="outline-danger btnw"
                    onClick={(e) => handleDelete(item.id)}
                  >
                    <i class="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="return p-2">
        <Link to="/payroll">
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
    </div>
  );
}

export default Payrollemli;
