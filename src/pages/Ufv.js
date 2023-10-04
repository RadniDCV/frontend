import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Gest() {
  const [data, setData] = useState({
    montmay: "",
    montmen: "",
    gest:"",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/creaufv", {
        montmay: data.montmay,
        montmen: data.montmen,  
        gest: data.gest,
        
      })
      .then((res) => {
        console.log(data.montmay, data.montmen, data.gest);
        navigate("/adddept");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar UFV</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">UFV mayor</label>
          <input
            type="text"
            className="form-control"
            id="inputUfvmay"
            placeholder="Introduce UFV mayor"
            autoComplete="off"
            value={data.montmay}
            onChange={(e) => setData({ ...data, montmay: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">UFV menor</label>
          <input
            type="text"
            className="form-control"
            id="inputUfvmen"
            placeholder="Introduce UFV menor"
            autoComplete="off"
            value={data.montmen}
            onChange={(e) => setData({ ...data, montmen: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Gestion</label>
          <input
            type="text"
            className="form-control"
            id="inputGestion"
            placeholder="Introduce Gestion"
            autoComplete="off"
            value={data.gest}
            onChange={(e) => setData({ ...data, gest: e.target.value })}
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
