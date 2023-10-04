import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
   
function PayDetailLi() {
  const [data, setData] = useState([]);

  const { gest } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detmanual/" + gest)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [gest]);

  const handleDelete = (gest) => {
    axios
      .delete("http://192.168.1.9:4000/deldtma/" + gest)
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(gest);
          window.location.reload(true);
        } else {
          console.log(gest);
          console.log(res.data.Status);
          window.location.reload(true);
          alert("Error 2");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex p-4 justify-content-around">
        <Button variant="outline-danger" onClick={(e) => handleDelete(gest)}>
        <i class="bi bi-folder-x"></i>
        </Button>
        <Link to={"/paydetail"}>
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
      <div>
        <h1 className="d-flex justify-content-center">
          Detalle de datos manuales
        </h1>
        <Table>
          <thead>
            <tr>
              <th>Gestion</th>
              <th>Codigo empleado</th>
              <th>Concepto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key="index">
                <td>{item.gest}</td>
                <td>{item.codemp}</td>
                <td>{item.concept}</td>
                <td>{item.mont}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PayDetailLi;
