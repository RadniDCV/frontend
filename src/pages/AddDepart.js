import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AddDepart() {
  return (
    <div >
      <div className="d-flex p-2 justify-content-center">
        <h3>Configuraciones</h3>
      </div>
      <div className="p-1">
        <div className="dept p-2">
          <div className="title">
            <span>Configuracion administrador</span>{" "}
          </div>
          <div className="buttons1">
            <Link to="/usera">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/userinfo">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>

        <div className="dept p-2">
          <div className="title">
            <span>Configurar Departamento</span>{" "}
          </div>
          <div className="buttons1">
            <Link to="/dept">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/deptinfo">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>

        <div className="dept p-2">
          <div className="title">
            <span>Configurar Sucursal</span>
          </div>
          <div className="buttons1">
            <Link to="/branch">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/branchinfo">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>

        <div className="dept  p-2">
          <div className="title">
            <span>Configurar Gestion</span>
          </div>
          <div className="buttons1">
            <Link to="/creagest">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/gestinfo">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>

        <div className="dept  p-2">
          <div className="title">
            <span>Configurar UFV</span>
          </div>
          <div className="buttons1">
            <Link to="/creaufv">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/ufvinfo">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>
        <div className="dept  p-2">
          <div className="title">
            <span>Configurar Esquema</span>
          </div>
          <div className="buttons1">
            <Link to="/schem">
              <Button variant="outline-success btnw"><i class="bi bi-plus-circle"></i></Button>
            </Link>
            <Link to="/chemlist">
              <Button variant="outline-info btnw"><i class="bi bi-file-spreadsheet"></i></Button>
            </Link>
          </div>
        </div>

      </div>
      <div className="d-flex justify-content-center p-4">
        <Link to="/">
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
    </div>
  );
}

export default AddDepart;
