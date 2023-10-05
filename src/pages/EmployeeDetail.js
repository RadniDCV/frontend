import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [dataGes, setDataGes] = useState([]);
  const [selectedGestion, setSelectedGestion] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detgest")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataGes(res.data.Result);
          console.log(dataGes);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  const generarPDF = async () => {
    if (!selectedGestion) {
      setError("Selecciona una gestion antes de generar el PDF");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.9:4000/repbolt/${selectedGestion}/${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Boleta${selectedGestion}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        setError(null);
      } else {
        setError("Error al generar el PDF. intentalo de nuevo");
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error.message);
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [id]);
  const handleLogout = () => {
    axios
      .get("http://192.168.1.9:4000/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  const handleVacationRequest = () => {
    navigate(`/vacsol/${id}`);
    console.log(id);
  };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://192.168.1.9:4000/images/` + employee.image}
          alt="employe"
          className="empImg"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h4 className="datper">
            Codigo empleado: <span className="datper1"> {employee.empid} </span>
          </h4>
          <h4 className="datper">
            Nombre:{" "}
            <span className="datper1">
              {" "}
              {employee.firstname} {employee.middlename} {employee.lastname}{" "}
              {employee.lastname2}{" "}
            </span>
          </h4>
          <h4 className="datper">
            Correo: <span className="datper1">{employee.email}</span>
          </h4>
          <h4 className="datper">
            Fecha de ingreso:{" "}
            <span className="datper1">
              {" "}
              {employee.anio} / {employee.mes} / {employee.dia}{" "}
            </span>
          </h4>
          <h4 className="datper">
            Salario: <spam className="datper1">{employee.salary}</spam>
          </h4>
        </div>
        <hr />
        <div>
          <h5>Imprimir boleta de pago</h5>
          <div className="d-flex">
            <div >
              <Form.Select
                onChange={(e) => setSelectedGestion(e.target.value)}
                id="inputGestion"
                value={selectedGestion}
              >
                <option>Gestion</option>
                {dataGes.map((gestion) => (
                  <option key={gestion.gest} value={gestion.gest}>
                    {gestion.gest}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="px-2">
              <Button
                className="px-3"
                variant="outline-success"
                onClick={generarPDF}
              >
                <i class="bi bi-file-earmark-pdf"></i> PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="p-3">
          <Button variant="outline-success" onClick={handleVacationRequest}>
            Solicitar Vacaciones
          </Button>
        </div>
        <div>
          <Button className="btn btn-danger" onClick={handleLogout}>
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
