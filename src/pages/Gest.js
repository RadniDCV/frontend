import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Gest() {
  const [data, setData] = useState({
    gest: "",
    descr: "",
  });
  const [errors, setErrors] = useState({
    gest: "",
    descr: "",
  });

  const [gestDet, setGestDet] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/gestdet")
      .then((res) => {
        if (res.data.Status === "Success") {
          setGestDet(res.data.Result);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validar campos vacíos
    if (!data.gest.trim()) {
      setErrors({ ...errors, gest: "Por favor, ingresa la gestion" });
      return;
    }
    const gestionExists = gestDet
      .map((gest) => gest.gest)
      .includes(data.gest);

    if (gestionExists) {
      setError("Esta gestion ya ha sido seleccionada, Elegida otra");
      console.log(gestionExists);
      return;
    }

    try {
      await axios.post("http://192.168.1.9:4000/creagest", {
        gest: data.gest,
        descr: data.descr,
      });
      navigate("/adddept");
    } catch (err) {
      console.error("Error al cargar la gestion", err);
      setErrors({ ...errors, general: "Error al agregar la gestion" });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar Gestion</h2>
      {errors.general && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {errors.general}
        </div>
      )}
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Gestion</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce Gestion"
            autoComplete="off"
            value={data.gest}
            onChange={(e) => {
              setData({ ...data, gest: e.target.value });
              setError(null);
              setErrors({ ...errors, gest: "" });
            }}
            required
          />
          {errors.gest && <div style={{ color: "red" }}>{errors.gest}</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
        <div className="col-12">
          <label className="form-label">Descripcion</label>
          <input
            type="text"
            className="form-control"
            id="inputDepart"
            placeholder="Introduce descripcion"
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
            <Button variant="outline-warning btnw">
              <i class="bi bi-x-circle"></i>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Gest;
