import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Plamen() {
  const [data, setData] = useState([]);

  const { gest } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/rplacalc/"+ gest)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [gest]);

 

  return (
    <div>
      <form>
      <div className="d-flex justify-content-center p-3">
      <Link to={"/paydetail"}>
          <Button variant="outline-secondary btnw"><i class="bi bi-x-circle"></i></Button>
      </Link> 
      </div>
      <Table striped hover responsive='sm'>
      <thead>
            <tr>
              <th>Codigo</th>
              <th>Salario Basico</th>
              <th>Dias trabajados</th>
              <th>Salario Calculado</th>
              <th>Antiguedad</th>
              <th>Horas Extras</th>
              <th>Horas Nocturnas</th>
              <th>Dominicales</th>
              <th>Frontera</th>
              <th>Otros Ingresos 1</th>
              <th>Otros Ingresos 2</th>
              <th>Otros Ingresos 3</th>
              <th>Total Ganado</th>
              <th>Aportes laborales</th>
              <th>Solidario may. 13000</th>
              <th>Solidario may. 25000</th>
              <th>Solidario may. 35000</th>
              <th>Impuesto retenido</th>
              <th>Faltas</th>
              <th>Prestamos</th>
              <th>Otros descuentos 1</th>
              <th>Otros descuentos 2</th>
              <th>Otros descuentos 3</th>
              <th>Total descuentos</th>
              <th>Liquido Pagable</th>
            </tr>
          </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key="index">
              <td>{item.cod_emp}</td>
              <td>{item.SBB}</td>
              <td>{item.TDT}</td>
              <td>{item.SBC}</td>
              <td>{item.ANT}</td>
              <td>{item.MHE}</td>
              <td>{item.MHN}</td>
              <td>{item.DOM}</td>
              <td>{item.FRO}</td>
              <td>{item.OTA}</td>
              <td>{item.OTB}</td>
              <td>{item.OTC}</td>
              <td>{item.TGA}</td>
              <td>{item.LAB}</td>
              <td>{item.S13}</td>
              <td>{item.S25}</td>
              <td>{item.S35}</td>
              <td>{item.IRE}</td>
              <td>{item.FAL}</td>
              <td>{item.PRE}</td>
              <td>{item.DE1}</td>
              <td>{item.DE2}</td>
              <td>{item.DE3}</td>
              <td>{item.TDE}</td>
              <td>{item.LIQ}</td>
              
              
            </tr>
          ))}
        </tbody>
      </Table>
      
      </form>
    </div>
  );
}

export default Plamen;
