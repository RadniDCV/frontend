import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function Vacsol() {
  const { id } = useParams();
  const [data, setData] = useState({
    empid: id,
    dsol: "",
    cday: "",
    estate: "S",
  });
  const [dataVac, setDataVac] = useState([]);
  const [dataVacd, setDataVacd] =useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://192.168.1.9:4000/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/creavac", {
        empid: data.empid,
        dsol: data.dsol,
        cday: data.cday,
        estate: data.estate,
      })
      .then((res) => {
        navigate(`/employeedetail/${id}`);
        console.log(data.empid, data.dsol, data.cday, data.estate);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/vacempp/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataVac(res.data.Result);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });
  
  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/vacempd/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          setDataVacd(res.data.Result);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  });
  

  return (
    <div>
      <div className="d-flex justify-content-center p-3 ">
        <h2>Solicitud de vacaciones</h2>
      </div>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Codigo</label>
            <input
              type="text"
              className="form-control"
              id="inputEmpid"
              placeholder="Introduce Codigo"
              autoComplete="off"
              value={data.empid}
              onChange={(e) => setData({ ...data, empid: e.target.value })}
              readOnly
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Fecha de Solicitud</label>
            <Form.Control
              type="date"
              onChange={(e) => setData({ ...data, dsol: e.target.value })}
              id="inputFecha"
              required
            />
          </div>
          <div className="col-12">
            <label className="form-label">Dias solicitados</label>
            <input
              type="text"
              className="form-control"
              id="inputDiassolicitados"
              placeholder="Dias solicitados"
              autoComplete="off"
              value={data.cday}
              onChange={(e) => setData({ ...data, cday: e.target.value })}
              required
            />
          </div>
          <div className="d-flex justify-content-center p-3">
            <Button type="submit" variant="outline-success btnw">
              <i class="bi bi-plus-circle"></i>
            </Button>
          </div>
        </form>
      </div>

      <Table className="tablefont">
        <thead>
          <tr>
            <th scope="col">Codigo de solitud</th>
            <th scope="col">Fecha de solitud</th>
            <th scope="col">Dias solicitados</th>
            <th scope="col">Estado</th>

          </tr>
        </thead>
        {dataVacd.map((item, index) =>(
          <tbody key="index">
             <tr>
                <td>{item.id}</td>
                <td>{item.dsol}</td>
                <td>{item.cday}</td>
                <td>{item.estate}</td>
             </tr>
          </tbody>
        ))}
      </Table>
      <Table >
        <thead>
          <tr>
           
            <th scope="col">Años trabajados</th>
            <th scope="col">Dias de vacacion</th>
            <th scope="col">Dias Tomados</th>
            <th scope="col">Dias restantes</th>
          </tr>
        </thead>
        {dataVac.map((item, index) => (
          <tbody key="index">
            <tr>
              
              <th>{item.anio}</th>
              <th>{item.anios}</th>
              <th>{item.diasS}</th>
              <th>{item.tdias}</th>
            </tr>
          </tbody>
        ))}
      </Table>
      <div className="d-flex justify-content-center p-3">
        <Button variant="outline-danger" onClick={handleLogout}>
          Salir
        </Button>
      </div>
    </div>
  );
}

export default Vacsol;
