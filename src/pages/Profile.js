import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";

function Profile() {
  const [allEmpleados, setAllEmpleados] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [indiceEmpleado, setIndiceEmpleado] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/getemployee")
      .then((res) => {
        //console.log(res.data.Status)
        if (res.data.Status === "Exito" || res.data.Status === "Success") {
          setEmpleados(res.data.Result);
          setAllEmpleados(res.data.Result);
          console.log("Data", res.data);
        } else {
          console.log("error detallado", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filtra los empleados basándose en el término de búsqueda
    const filteredEmpleados = allEmpleados.filter((empleado) =>
      empleado.lastname.toLowerCase().includes(term.toLowerCase())
    );
    setEmpleados(filteredEmpleados);
  };

  const empleadoActual = empleados[indiceEmpleado];

  if (!empleadoActual && searchTerm.length > 0) {
    return (
      <div className="d-flex p-3">
        <Link to={"/"}>No se encontraron resultados.</Link>
      </div>
    );
  } else if (!empleadoActual) {
    return null; // No mostrar nada si no hay un término de búsqueda
  }

  return (
    <div>
      <div className="d-flex p-2">
        <div className="col-sm-1">Buscar:</div>
        <input
          type="text"
          placeholder="Buscar por apellido"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-center">
            <Button
              variant="outline-success btnw"
              onClick={() => setIndiceEmpleado(indiceEmpleado - 1)}
              disabled={indiceEmpleado === 0}
            >
              <i class="bi bi-caret-left-square"></i>
            </Button>
            <Button
              variant="outline-success btnw"
              onClick={() => setIndiceEmpleado(indiceEmpleado + 1)}
              disabled={indiceEmpleado === empleados.length - 1}
            >
              <i class="bi bi-caret-right-square"></i>
            </Button>
          </div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col"></div>
          </div>

          <div className="row">
            <div className="col-lg-4 d-flex justify-content-center">
              <Card style={{ width: "18rem" }} >
                <div className="d-flex justify-content-center p-3">
                  <img
                    src={
                      `http://192.168.1.9:4000/images/` + empleadoActual.image
                    }
                    alt="empleado"
                    className="employee_prof"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-center">
                    {empleadoActual.firstname} {empleadoActual.lastname}
                  </Card.Title>
                  <Card.Text className="d-flex justify-content-center">
                    {empleadoActual.position}
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-center">
                    Estado: <span>{empleadoActual.estado}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-8">
              {/* User Info */}
              <div className="card mb-4">
                <Tabs defaultActiveKey="Personal" id="tabs">
                  <Tab eventKey="Personal" title="General">
                    <div className="card-body">
                      {/* Full Name */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Nombre Completo </p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.firstname} {empleadoActual.middlename}{" "}
                            {empleadoActual.lastname} {empleadoActual.lastname2}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Email */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">correo</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Direccion casa */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Direccion de casa</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.addresshome}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Telefono */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Telefono</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            <a
                              href={`https://wa.me/${empleadoActual.mobile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {empleadoActual.mobile}
                            </a>
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Cedula */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Nro. Cedula</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{empleadoActual.ci} {empleadoActual.extci}</p>
                        </div>
                      </div>
                      <hr />
                      {/* Cedula */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Fecha Nacimiento</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{empleadoActual.birthdate} {empleadoActual.birthcountry}</p>
                        </div>
                      </div>
                      <hr/>
                      {/* Hijos */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Nro. Hijos</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.nchildren}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Financiero" title="Financiero">
                  <div className="card-body">
                      {/*Salario*/}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Salario</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.salary} Bs.
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Esquema Contable</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.scheacco}
                          </p>
                        </div>
                      </div>
                      <hr />
                    
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Departamento</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.dept}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/*Sucursal*/}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Sucursal</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.branch}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Cuenta Banco */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Cuenta</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.codbank} Banco {empleadoActual.banks}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Fecha de ingreso</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.startdate}
                          </p>
                        </div>
                      </div>
                      <hr />
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Fecha de retiro</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.termdate}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Motivo de retiro</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.reasonterm}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">NUA</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.nua}
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </Tab>
                  <Tab eventKey="Otros" title="Otros">
                    <div className="card-body">
                      
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Sexo</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.sexo}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Estado Civil</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.marstatuse}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Direccion Oficina</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.addresswork}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Cargo</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.position}
                          </p>
                        </div>
                      </div>
                      <hr/>
                      {/* Departamento */}
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Profesion</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {empleadoActual.profession}
                          </p>
                        </div>
                      </div>


                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default Profile;
