import React,{useState, useEffect} from 'react'
import axios from "axios"
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import {Link} from "react-router-dom"

function Rephist() {
  
    const [data, setData] = useState([]);

  

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/hisempl" )
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result[0]);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  

  return (
    <div>
      <div className="d-flex p-4 justify-content-around">
        
        <Link to={"/report"}>
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
        </Link>
      </div>
      <div>
        <h1 className="d-flex justify-content-center">
            Historico de empleados
        </h1>
        <Table className='tablefont'>
          <thead>
            <tr>
              <th>Nombre completo</th>
              <th>Celular</th>
              <th>Dir. casa</th>
              <th>Dir. empresa</th>
              <th>Departamento</th>
              <th>Sucursal</th>
              <th>Fecha de ingreso</th>
              <th>Fecha de retiro</th>
              <th>Motivo de retiro</th>
              <th>Salario</th>
              <th>Cargo</th>
              <th>Cta. banco</th>
              <th>Esquema</th>
              <th>Fecha actualizacion</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key="index">
                <td>{item.firstname} {item.middlename} {item.lastname} {item.lastname2}</td>
                <td>{item.mobile}</td>
                <td>{item.addresshome}</td>
                <td>{item.addresswork}</td>
                <td>{item.dept}</td>
                <td>{item.branch}</td>
                <td>{item.startd}</td>
                <td>{item.termd}</td>
                <td>{item.reasonterm}</td>
                <td>{item.salary}</td>
                <td>{item.position}</td>
                <td>{item.codbank}</td>
                <td>{item.scheacco}</td>
                <td>{item.fechact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
  
}

export default Rephist