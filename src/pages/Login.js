import React, { useState } from "react";
import "../style.css";
import myImage from "../images/people.webp";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Button from "react-bootstrap/Button"

function Login() {

  const [values, setValues] =useState({
    email:"",
    password:""
  })
  const navigate = useNavigate()
  axios.defaults.withCredentials = true
  const [error, setError] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();
    await axios.post("http://192.168.1.9:4000/login", values)
    .then(res => {
      if(res.data.Status === "Success"){
        navigate("/")
      }else{
        setError(res.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-md-flex justify-content-center aling-items-center p-5">
      <div className="imgLog">
        <div>
          <img src={myImage} alt="empleadosLogo" className="imgLogin border-5 " />
        </div>
      </div>
      <div>
        <div></div>
        <div className="titpla">
          <h3>Sistema de planillas</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <strong>Correo Electronico</strong>
            </label>
            <input
              type="email"
              placeholder="Introducir correo"
              name="email"
              className="form-control rounded-0"
              autoComplete="off"
              onChange={e => setValues({...values, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="password">
              <strong>Contraseña</strong>
            </label>
            <input
              type="password"
              placeholder="Introduce contraseña"
              name="password"
              className="form-control rounded-0"
              onChange={e => setValues({...values, password: e.target.value})}
            />
          </div>
          <div className="d-flex justify-content-around p-3">
            <Button type="submit" variant="outline-success">
              {" "}
              Acceder
            </Button>
            <Link to="/start">
            <Button variant="outline-danger">
              Cancelar
            </Button>
            </Link>
          </div>
          <p>Tu estas deacuerdo con nuestros terminos y politicas</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
