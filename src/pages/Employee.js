import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style2.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"

function Employee() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/getemployee")
      .then((res) => {
        //console.log(res.data.Status)
        if (res.data.Status === "Exito" || res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://192.168.1.9:4000/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success" || res.data.Status === "Exito") {
          window.location.reload(true);
        } else {
          alert("Error 2");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div >
      <div className="d-flex justify-content-center">
        <h3>Lista de empleados</h3>
      </div>
      <div className="d-flex  justify-content-around">
        <Link to="/create">
          <Button variant="outline-success btnw"><i class="bi bi-person-add"></i></Button>
        </Link>
        <Link to="/">
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
      <div className="mt-3">
        <Table responsive='sm'>
          <thead >
            <tr>
              <th scope="col">
                <div className="alingtitle">ID</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Correo</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Nombre</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Imagen</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Departamento</div>
              </th>

              <th scope="col">
                <div className="alingtitle">Fecha ingreso</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Salario</div>
              </th>
              <th scope="col">
                <div className="alingtitle">Accion</div>
              </th>
            </tr>
          </thead>
          <tbody >
            {data.map((employee, index) => {
              return (
                <tr key="index">
                  <td className="textemp">{employee.empid}</td>
                  <td className="textemp">{employee.email}</td>
                  <td className="textemp">
                    {employee.lastname} {employee.lastname2}{" "}
                    {employee.firstname}
                  </td>

                  <td className="textemp">
                    {
                      <img
                        src={`http://192.168.1.9:4000/images/` + employee.image}
                        alt="empleado"
                        className="employee_image"
                      />
                      
                      
                    }
                  </td>
                  <td  className="textemp">{employee.dept}</td>

                  <td  className="textemp">
                    {employee.ANIO} / {employee.MES} / {employee.DIA}
                  </td>
                  <td  className="textemp">{employee.salary} Bs.</td>
                  <td>
                    <div>
                      <Link to={"/employeeedit/" + employee.empid}>
                        <Button variant="outline-success buttomsemp" size="sm">
                        <i class="bi bi-pencil-square"></i>
                        </Button>
                      </Link>
                      <Button
                        onClick={(e) => handleDelete(employee.empid)}
                        variant="outline-danger buttomsemp"
                        size="sm"
                      >
                        <i class="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employee;
