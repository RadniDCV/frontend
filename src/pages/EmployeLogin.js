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
  /*const [error, setError] = useState("");*/

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.9:4000/employeelogin",
        values
      );
      const { Status, id } = response.data;  /*Error*/
      if (Status === "Success") {
        navigate(`/employeedetail/${id}`);
        /*console.log(id);*/
      } else {
       /* setError(Error || "Error al iniciar la sesion");*/
      }
    } catch (err) {
      console.error("Error en la solicitud", err);
      /*setError("Error en solicitud");*/
    }
  };

  const handleLogout = () => {
    axios
      .get("http://192.168.1.9:4000/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="section1">
      <div className="form-box">
        <div className="form-value p-4">
          <form onSubmit={handleSubmit}>
            <h3 className="h3login tit_gm">Empleados</h3>
            <div className="inputbox1 d-flex align-items-center">
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="Correo"
                className="input1 "
                autoComplete="off"
              />
              <div className="iconlog"><i class="bi bi-envelope"></i></div>
            </div>
            <div className="inputbox1 d-flex align-items-center">
              <input
                type="password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="contraseña"
                className="input1"
              />
              <div className="iconlog"><i class="bi bi-lock"></i></div>
            </div>

            <div className="d-flex justify-content-around p-3">
              <Button type="submit" variant="outline-info">
                Acceder
              </Button>
              
                <Button onClick={handleLogout} variant="outline-light">Cancelar</Button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeLogin;
