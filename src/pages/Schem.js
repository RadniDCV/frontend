import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Schem() {
  const [data, setData] = useState({
    gest: "",
    descr: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/creasche", {
        descripsche: data.descripsche,
        detcount1: data.detcount1,
        detcount2: data.detcount2,
        detcount3: data.detcount3,
        detcount4: data.detcount4,
        detcount5: data.detcount5,
        detcount6: data.detcount6,
        detcount7: data.detcount7,
        detcount8: data.detcount8,
       
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
          <label className="form-label">Esquema</label>
          <input
            type="text"
            className="form-control"
            id="inputdesSche"
            placeholder="Introduce el esquema"
            autoComplete="off"
            value={data.descripsche}
            onChange={(e) => setData({ ...data, descripsche: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Cuenta total ganado </label>
          <input
            type="text"
            className="form-control"
            id="inputtgan"
            placeholder="Introduce cuenta"
            autoComplete="off"
            value={data.detcount1}
            onChange={(e) => setData({ ...data, detcount1: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Cuenta Aportes Laborales</label>
          <input
            type="text"
            className="form-control"
            id="inputAporlab"
            placeholder="Introduce cuenta"
            autoComplete="off"
            value={data.detcount2}
            onChange={(e) => setData({ ...data, detcount2: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Cuenta otro gastos</label>
          <input
            type="text"
            className="form-control"
            id="inputOtrgas"
            placeholder="Introduce cuenta"
            autoComplete="off"
            value={data.detcount3}
            onChange={(e) => setData({ ...data, detcount3: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Cuenta liquido pagable</label>
          <input
            type="text"
            className="form-control"
            id="inputLiqcon"
            placeholder="Introduce Cuenta"
            autoComplete="off"
            value={data.detcount4}
            onChange={(e) => setData({ ...data, detcount4: e.target.value })}
            required
          />
        </div>
        
        <div className="col-12">
          <label className="form-label">Cuenta APortes Patronales</label>
          <input
            type="text"
            className="form-control"
            id="inputPat"
            placeholder="Introduce Cuenta"
            autoComplete="off"
            value={data.detcount5}
            onChange={(e) => setData({ ...data, detcount5: e.target.value })}
            required
          />
        </div>
        
        <div className="col-12">
          <label className="form-label">Cuenta Aportes Patronales por pagar</label>
          <input
            type="text"
            className="form-control"
            id="inputPatr"
            placeholder="Introduce Cuenta"
            autoComplete="off"
            value={data.detcount6}
            onChange={(e) => setData({ ...data, detcount6: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Cuenta Provisiones</label>
          <input
            type="text"
            className="form-control"
            id="inputPro"
            placeholder="Introduce Cuenta"
            autoComplete="off"
            value={data.detcount7}
            onChange={(e) => setData({ ...data, detcount7: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Cuenta Provisiones por pagar</label>
          <input
            type="text"
            className="form-control"
            id="inputPropp"
            placeholder="Introduce Cuenta"
            autoComplete="off"
            value={data.detcount8}
            onChange={(e) => setData({ ...data, detcount8: e.target.value })}
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

export default Schem;
