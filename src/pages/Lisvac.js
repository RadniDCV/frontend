import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Vacac from "./Vacation";
import { Link} from "react-router-dom";

function Lisvac() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detvacp")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          /*console.log("Data", res.data);*/
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  const handleSuccess = (ids) => {
    axios
      .get("http://192.168.1.9:4000/upvac/" + ids)
      .then((res) => {
        if (res.data.Status === "Success") {
           window.location.reload(true);
        } else {
          alert("Error2");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (idd) => {
    axios
      .get("http://192.168.1.9:4000/upvacd/" + idd)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error 2");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-center p-3">
        <Link to={"/"}>
          <Button variant="outline-secondary btnw">
            <i class="bi bi-x-circle"></i>
          </Button>
        </Link>
      </div>
      <div className="d-flex justify-content-center p-3">
        <h5>Vacaciones Pendientes de aprobacion</h5>
      </div>
      
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Codigo </th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Dias</th>
              <th></th>
            </tr>
          </thead>
          {data.map((item, index) => (
            <tbody key="index">
              <tr>
                <th>{item.empid}</th>
                <th>
                  {item.firstname} {item.middlename} {item.lastname}{" "}
                  {item.lastname2}
                </th>
                <th>{item.fsol}</th>
                <th>{item.cday}</th>
              
                <div className="d-flex justify-content-around">
                  <th>
                    
                      <Button variant="outline-success" onClick={() => handleSuccess(item.id)}>
                        <i class="bi bi-check-circle"></i>
                      </Button>
                   
                    <span> </span>
                    <Button variant="outline-danger" onClick={() => handleDelete(item.id)}>
                      <i class="bi bi-x-circle"></i>
                    </Button>
                  </th>
                </div>
              </tr>
            </tbody>
          ))}
        </Table>
      

      <div>
        <Vacac></Vacac>
      </div>
    </div>
  );
}

export default Lisvac;
