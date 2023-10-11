import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Payroll() {
  return (
    <div>
      <div className="p-3 d-flex justify-content-center">
        <span>
          <h3>Administracion de planillas</h3>
        </span>
      </div>
      <div className="p-4">
        <Table >
          <thead>
            <tr>
            <th>Detalle</th>
            <th>Accion</th>
            <th></th>
            </tr>
            

          </thead>
          <tbody>
            <tr>
              <td>Crear planillas</td>
              <td>
                <Link to={"/payrolladd"}>
                  <Button variant="outline-success btnw"><i class="bi bi-folder-plus"></i></Button>
                </Link>
              </td>
              <td>
                <Link to={"/paydetail"}>
                  <Button variant="outline-info btnw"><i class="bi bi-search"></i></Button>
                </Link>
              </td>
            </tr>
            
          </tbody>
        </Table>
        <div className="d-flex justify-content-center p-3">
        <Link to="/">
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
