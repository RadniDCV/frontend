import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const Pmschem = () => {
  const [dataGes, setDataGes] = useState([]);
  const [data, setData] = useState({
    gest: "",
  });
  const [dataSche, setDataSche] = useState([]);

  const hanldeButton = () => {
    if (data.gest) {
      axios
        .get(`http://192.168.1.9:4000/repschem/${data.gest}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            setDataSche(res.data.Result);
            /*console.log("Data", res.data);*/
          } else {
            console.log("Error detallado", res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Por favor, seleccione la gestion.");
    }
  };

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
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center p-2">
        <div>
          <h5>Seleccionar gestion</h5>
          <Form.Select
            onChange={(e) => setData({ ...data, gest: e.target.value })}
            id="inputGestion"
            value={data.gest}
          >
            <option>Gestion</option>
            {dataGes.map((gestion) => (
              <option key={gestion.gest} value={gestion.gest}>
                {gestion.gest}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center p-2">
          <Button variant="outline-success" onClick={hanldeButton}>
            Generar Asiento
          </Button>
        </div>
        <div>
          <Table className="p-2 d-flex justify-content-center col-12">
            <div>
              <div className="d-flex justify-content-center">
                <h5>ASIENTO GENERAL</h5>
              </div>
              <thead>
                <tr>
                  <th>CONCEPTO</th>
                  <th>DEBE</th>
                  <th>HABER</th>
                </tr>
              </thead>
              {dataSche.map((item, index) => (
                <tbody key="index">
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount1}
                    </th>
                    <th>{item.TGA}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount2}
                    </th>
                    <th></th>
                    <th>{item.LAB}</th>
                  </tr>
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount3}
                    </th>
                    <th></th>
                    <th>{item.IRE}</th>
                  </tr>
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount4}
                    </th>
                    <th></th>
                    <th>{item.LIQ}</th>
                  </tr>
                </tbody>
              ))}
            </div>
          </Table>
          <Table className="p-2 d-flex justify-content-center">
            <div>
              <div className="d-flex justify-content-center">
                <h5>ASIENTO APORTES PATRONALES</h5>
              </div>
              <thead>
                <tr>
                  <th>CONCEPTO</th>
                  <th>DEBE</th>
                  <th>HABER</th>
                </tr>
              </thead>
              {dataSche.map((item, index) => (
                <tbody key="index">
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount5}
                    </th>
                    <th>{item.PTR}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount6}
                    </th>
                    <th></th>
                    <th>{item.PTR}</th>
                  </tr>
                </tbody>
              ))}
            </div>
          </Table>
          <Table className="p-2 d-flex justify-content-center">
            <div>
              <div className="d-flex justify-content-center">
                <h5>ASIENTO PROVISIONES</h5>
              </div>
              <thead>
                <tr>
                  <th>CONCEPTO</th>
                  <th>DEBE</th>
                  <th>HABER</th>
                </tr>
              </thead>
              {dataSche.map((item, index) => (
                <tbody key="index">
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount5}
                    </th>
                    <th>{item.PTR}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th>
                      {item.scheacco} {item.detcount6}
                    </th>
                    <th></th>
                    <th>{item.PTR}</th>
                  </tr>
                </tbody>
              ))}
            </div>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Pmschem;
