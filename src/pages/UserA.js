import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function UserA() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/creauser", {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      })
      .then((res) => {
        console.log(data.username, data.email, data.password, data.role);
        navigate("/adddept");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar usuario</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce usuario"
            autoComplete="off"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">correo</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce correo"
            autoComplete="off"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce password"
            autoComplete="off"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Rol</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, role: e.target.value })}
            id="inputRole"
          >
            <option value="">Seleccionar...</option>
            <option value="01">admin</option>
            
          </Form.Select>
        </div>

        <div className="buttoms">
          <Button type="submit" variant="outline-success">
          <i class="bi bi-person-add"></i>
          </Button>
          <Link to={"/adddept"}>
            <Button variant="outline-warning"><i class="bi bi-x-circle"></i></Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UserA;
