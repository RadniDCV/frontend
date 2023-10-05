import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function EmployeLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.9:4000/employeelogin",
        values
      );
      const { Status, id, Error } = response.data;
      if (Status === "Success") {
        navigate(`/employeedetail/${id}`);
        console.log(id);
      } else {
        setError(Error || "Error al iniciar la sesion");
      }
    } catch (err) {
      console.error("Error en la solicitud", err);
      setError("Error en solicitud");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="rounded w-10 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h3>Acceso de empleados</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlForm="email">
              <strong>Correo</strong>
            </label>
            <input
              type="email"
              placeholder="Introducir correo"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0 "
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Contraseña</strong>
            </label>
            <input
              type="password"
              placeholder="Introducir contraseña"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>

          

          <div className="d-flex justify-content-around p-3">
            <Button type="submit" variant="outline-success">
              Acceder
            </Button>
            <Link to="/start" variant="outline-danger">
              <Button variant="outline-danger">Cancelar</Button>
            </Link>
          </div>
          <p>Tu estas deacuerdo con nuestros terminos y politicas</p>
        </form>
      </div>
    </div>
  );
}

export default EmployeLogin;
