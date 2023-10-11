import React, { useState } from "react";
import "../style.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://192.168.1.9:4000/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          localStorage.setItem("userData", JSON.stringify(res.data))  
          /*console.log(res.data)*/
          navigate("/");
         
        } else {
         setError(res.data.Error);
        }
      })
      .catch((err) => console.log(error));
  };

  return (
    <div className="section1">
      <div className="form-box">
        <div className="form-value p-4">
          <div className="titpla">
            <h3 className="tit_gm">Sistema de planillas</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputbox1 d-flex align-items-center">
              <input
                type="email"
                placeholder="Introducir correo"
                name="email"
                className="input1"
                autoComplete="off"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <div className="iconlog"><i class="bi bi-envelope"></i></div>
            </div>
            <div className="inputbox1 d-flex align-items-center">
              <input
                type="password"
                placeholder="Introduce contraseña"
                name="password"
                className="input1"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <div className="iconlog"><i class="bi bi-lock"></i></div>
            </div>
            <div className="d-flex justify-content-around p-3">
              <Button type="submit" variant="outline-info">
                {" "}
                Acceder
              </Button>
              <Link to="/start">
                <Button variant="outline-light">Cancelar</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
