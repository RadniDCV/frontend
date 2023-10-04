import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../style.css";
import Button from "react-bootstrap/Button";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/get/" + id)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  },[id]);
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
    console.log(id)
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
