import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Gest() {
  const [data, setData] = useState({
    gest: "",
    descr: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/creagest", {
        gest: data.gest,
        descr: data.descr,
      })
      .then((res) => {
        console.log(data.gest, data.descr);
        navigate("/adddept");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar Gestion</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Gestion</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce Departamento"
            autoComplete="off"
            value={data.gest}
            onChange={(e) => setData({ ...data, gest: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Descripcion</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce Departamento"
            autoComplete="off"
            value={data.descr}
            onChange={(e) => setData({ ...data, descr: e.target.value })}
            required
          />
        </div>
        <div className="buttoms">
          <Button type="submit" variant="outline-success btnw">
          <i class="bi bi-plus-circle"></i>
          </Button>
          <Link to={"/adddept"}>
            <Button variant="outline-warning btnw"><i class="bi bi-x-circle"></i></Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Gest;
