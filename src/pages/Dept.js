import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Dept() {
  const [data, setData] = useState({
    details: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await axios
      .post("http://192.168.1.9:4000/creadept", {details: data.details})
      .then((res) => {
        console.log(data.details)
        navigate("/adddept");
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar Departamento</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce Departamento"
            autoComplete="off"
            value={data.details}
            onChange={(e) => setData({ ...data, details: e.target.value })}
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

export default Dept;
