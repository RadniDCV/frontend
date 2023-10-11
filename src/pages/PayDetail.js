import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

function PayDetail() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);
  
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteItemId(id);
    setShow(true);
  }

  const [showd, setShowd] = useState(false)
  const [selectGestion, setSelectGestion] = useState(null)
  const handleClosed = () => setShowd(false);
  const handleShowp = (gestion) =>{
    setSelectGestion(gestion)
    setShowd(true)
  
}

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };




  const handleUpload = async () => {
    if (!file) {
      alert("Seleccione un archivo Excel .xlsx");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://192.168.1.9:4000/upload-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Datos insertados con exito");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detapay")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("Error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    if (deleteItemId){
    axios
      .get("http://192.168.1.9:4000/delepay/" + deleteItemId)
      .then((res) => {
        if (res.data.Status === undefined) {
          console.log(deleteItemId);
          window.location.reload(true);
        } else {
          console.log(deleteItemId);
          console.log(res.data.Status);
          alert("Error 2");
        }
      })
      .catch((err) => console.log(err));
  };
  handleClose()
}

  const handleCalc = (id) => {
    axios
      .get("http://192.168.1.9:4000/calpla/" + id)
      .then((res) => {
        console.log(res);
        if (res.data === "C") {
          alert("La planilla ya fue calculada");
        } else {
          alert("Planilla calculada exitosamente");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelcal = () => {
    if(selectGestion){
    axios
      .get("http://192.168.1.9:4000/delpla/" + selectGestion)
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  handleClose()
}

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Lista de planillas</h2>
      <div className="col-12">
        <Table>
          <thead>
            <tr>
              <th>Gestion</th>
              <th>Fecha creacion</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key="index">
                <td>{item.gestion}</td>
                <td>{item.datecalc}</td>
                <td>
                  <Button
                    variant="outline-success btnw"
                    size="sm"
                    onClick={(e) => handleCalc(item.gestion)}
                  >
                    <i class="bi bi-calculator"></i>
                  </Button>
                  {/*Borrar calculos de planilla */}
                  <Button
                    variant="outline-warning btnw"
                    onClick={()=>handleShowp(item.gestion)}
                    size="sm"
                  >
                    <i class="bi bi-file-earmark-excel-fill"></i>
                  </Button>

                  <Modal show={showd} onHide={handleClosed}>
                    <Modal.Header closeButton className="spanpre">
                      <Modal.Title>
                        <i class="bi bi-exclamation-triangle"></i>{" "}
                        <span>Precaucion</span>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Estas apunto borrar los calculos de la planilla
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="outline-secondary" onClick={handleClosed}>
                        Cancelar
                      </Button>
                      <Button variant="outline-success" onClick={handleDelcal}>
                        Confirmar
                      </Button>
                    </Modal.Footer>
                  </Modal>



                  {/*Eliminar una planilla*/}
                  <Button
                    variant="outline-danger btnw"
                    onClick={()=>handleShow(item.id)}
                    size="sm"
                  >
                    <i class="bi bi-trash"></i>
                  </Button>
                  {/*Modal Eliminar*/}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton className="spanpre">
                      <Modal.Title>
                        <i class="bi bi-exclamation-triangle"></i>{" "}
                        <span>Precaucion</span>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Estas apunto de eliminar una planilla
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="outline-secondary" onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button variant="outline-success" onClick={handleDelete}>
                        Confirmar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
                <td>
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="filexls"
                  />{" "}
                  <Button
                    variant="outline-warning btnw"
                    size="sm"
                    onClick={handleUpload}
                  >
                    <i class="bi bi-filetype-xls"></i>
                  </Button>
                  <Link to={"/paydetailli/" + item.gestion}>
                    <Button variant="outline-info btnw" size="sm">
                      <i class="bi bi-search"></i>
                    </Button>
                  </Link>
                  <Link to={"/Plamen/" + item.gestion}>
                    <Button variant="outline-info btnw" size="sm">
                      <i class="bi bi-table"></i>
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="return p-2">
          <Link to="/payroll">
            <Button variant="outline-secondary btnw">
              <i class="bi bi-x-circle"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PayDetail;
