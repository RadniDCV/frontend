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
          /*console.log(dataGes);*/
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(error));
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
   /* console.log(id);*/
  };

  const handlePasswordChange =() =>{
    navigate(`/Passup/${id}`)
  } 

  return (
    <div className="container">
      <div className="main-body1">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={`http://192.168.1.9:4000/images/` + employee.image}
                    alt="employe"
                    className="rounded-circle"
                    width={150}
                  />
                  <div className="mt-3">
                    <h4>
                      {employee.firstname} {employee.lastname}
                    </h4>
                    <p classname="text-secondary mb-1">{employee.position}</p>
                    <p className="text-muted font-size-sm">
                      {employee.addresshome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i class="bi bi-linkedin"></i>LinkedIn
                  </h6>
                  <a  className="linkedinh" href={employee.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="text-secundary">Acceso</span>
                  </a>
                  
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nombre completo</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {employee.firstname} {employee.middlename}{" "}
                    {employee.lastname} {employee.lastname2}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Correo</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {employee.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Celular</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {employee.mobile}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Direccion</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {employee.addresshome}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-center">
                <h5>Generar boleta de pago</h5>
              </div>
              <div className="d-flex ">
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

            <div>
              
              <div className="d-flex justify-content-center p-3">
                <Button
                  variant="outline-success"
                  onClick={handleVacationRequest}
                >
                  Solicitar Vacaciones
                </Button>
              </div>

              
              
              <div className="d-flex justify-content-center p-3">
                <Button
                  variant="outline-success"
                  onClick={handlePasswordChange}
                >
                  Cambiar contraseña
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center p-4">
        <Button className="btn btn-danger" onClick={handleLogout}>
          Salir
        </Button>
      </div>
    </div>
  );
}

export default EmployeeDetail;
