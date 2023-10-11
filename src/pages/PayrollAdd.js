import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

function PayrollAdd() {
  const [currentDate, setCurrentDate] = useState("");
  const [data, setData] = useState({
    gestion: "",
    datecalc: "",
    estate: "",
  });

  const [gestDet, setGestDet] = useState([]);
  const [gestOptions, setGestOptions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Agrega ceros a la izquierda si es necesario
    const day = date.getDate().toString().padStart(2, "0"); // Agrega ceros a la izquierda si es necesario

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/gest")
      .then((res) => {
        if (res.data.Status === "Success") {
          setGestOptions(res.data.Result);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detapayg")
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

    if (!data.gestion) {
      setError("Por favor seleciona un gestion");
      return;
    }

    const gestionExists = gestDet
      .map((gest) => gest.gest)
      .includes(data.gestion);

    
    if (gestionExists) {
      setError("Esta gestion ya ha sido seleccionada, Elegida otra");
      console.log(gestionExists);
      return;
    }

    try {
      await axios.post("http://192.168.1.9:4000/creapay", {
        gestion: data.gestion,
        datecalc: currentDate,
        estate: "A",
      });

      navigate("/payroll");
    } catch (err) {
      console.error("Error al crear la planilla", err);
      setError("Error al agregar la planilla");
    }
  };

  return (
    <div className="p-3 d-flex justify-content-center">
      <div>
        <h3>Agregar planilla</h3>
        <form onSubmit={handleSubmit}>
          <div className="p-3">
            <label className="form-label">Gestion</label>
            <Form.Select
              onChange={(e) => {
                setData({ ...data, gestion: e.target.value });
                setError(null);
              }}
              id="inputDepart"
              value={data.gestion}
              required
            >
              <option>Seleccion una gestion</option>
              {gestOptions.map((gest) => (
                <option key={gest.id} value={gest.gest}>
                  {gest.descr}
                </option>
              ))}
            </Form.Select>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <div className="p-3">
            <label className="form-label">Fecha de calculo</label>
            <input
              type="text"
              id="dateInput"
              className="form-control"
              value={currentDate}
              readonly
            />
          </div>

          <div className="p-3 d-flex justify-content-around">
            <Button type="submit" variant="outline-success btnw">
              <i class="bi bi-plus-circle"></i>
            </Button>
            <Link to={"/payroll"}>
              <Button variant="outline-warning btnw">
                <i class="bi bi-x-circle"></i>
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PayrollAdd;
