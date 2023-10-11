import axios from "axios";
import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

function Gest() {
  const [data, setData] = useState({
    montmay: "",
    montmen: "",
    gest:"",
  });

  const [gestDet, setGestDet] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/ufvdet")
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
    
    const gestionExists = gestDet
      .map((gest) => gest.gest)
      .includes(data.gest);

    if (gestionExists) {
      setError("Esta gestion ya ha sido seleccionada, Elegida otra");
      console.log(gestionExists);
      return;
    }

    try{
    await axios
      .post("http://192.168.1.9:4000/creaufv", {
        montmay: data.montmay,
        montmen: data.montmen,  
        gest: data.gest,
        
      })
      
        navigate("/adddept");
      } catch (err) {
        console.error("Error al cargar la gestion", err);
        setError("Error al agregar la gestion" );
      }
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
            onChange={(e) => {
              setData({ ...data, gest: e.target.value })
              setError(null);
              }}
            required
          />
            {error && <div style={{ color: "red" }}>{error}</div>}
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
