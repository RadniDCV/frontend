import axios from "axios";
import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";


function Vacation() {
  const [dataVac, setDataVac] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rpvac")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataVac(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
    <div className="d-flex justify-content-center p-3">
      
      </div>
      <h5 className="text-center p-3">Detalle de Vacaciones</h5>
      <br />
      <Table responsive='sm'>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre completo</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Años trabajando</th>
            <th scope="col">Dias de vacacion</th>
            <th scope="col">Dias tomados</th>
            <th scope="col">Dias restantes</th>
          </tr>
        </thead>
        {dataVac.map((item, index) => (
          <tbody key="index">
            <tr>
              <th>{item.empid}</th>
              <th>
                {item.firstname} {item.middlename} {item.lastname}{" "}
                {item.lastname2}
              </th>
              <th>{item.startDatee}</th>
              <th>{item.anio}</th>
              <th>{item.anios}</th>
              <th>{item.diasS}</th>
              <th>{item.tdias}</th>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}

export default Vacation;
