import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EmployeeEdit() {
  
   
  
  const [userData, setUserData] = useState("");

  useEffect(() => {
    // Obtener los datos del usuario desde localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData.result);
    }
  }, []);



  const [data, setData] = useState({
    martstatus: "",
    mobile: "",
    addresshome: "",
    addresswork: "",
    dept: "",
    branch: "",
    termdate: "",
    reasonterm: "",
    salary: "",
    nchildren: "",
    birthcountry: "",
    nua: "",
    position: "",
    profession: "",
    bank: "",
    codbank: "",
    estado: "",
    scheacco: "",
    linkedin: "",
    useredit: userData ,
  
  });

  

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/get/" + id)
      .then((res) => {
        setData({
          ...data,
          martstatus: res.data.Result[0].martstatus,
          mobile: res.data.Result[0].mobile,
          addresshome: res.data.Result[0].addresshome,
          addresswork: res.data.Result[0].addresswork,
          dept: res.data.Result[0].dept,
          branch: res.data.Result[0].branch,
          termdate: res.data.Result[0].termdate,
          reasonterm: res.data.Result[0].reasonterm,
          salary: res.data.Result[0].salary,
          nchildren: res.data.Result[0].nchildren,
          birthcountry: res.data.Result[0].birthcountry,
          nua: res.data.Result[0].nua,
          position: res.data.Result[0].position,
          profession: res.data.Result[0].profession,
          bank: res.data.Result[0].bank,
          codbank: res.data.Result[0].codbank,
          estado: res.data.Result[0].estado,
          scheacco: res.data.Result[0].scheacco,
          linkedin: res.data.Result[0].linkedin,
        });
      })
      .catch((err) => console.log(err));
  },[]); /*NO borrar []*/

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .put("http://192.168.1.9:4000/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success" || res.data.Status === "Exito") {
          /*console.log( userData, "Resultado",data);*/
          navigate("/employee");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Actualizar empleado</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Estado Civil</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, martstatus: e.target.value })}
            id="inputMartialstatus"
            value={data.martstatus}
          >
            <option value="">Seleccionar...</option>
            <option value="01">Casado(a)</option>
            <option value="02">Soltero(a)</option>
            <option value="03">Viudo(a)</option>
            <option value="04">Divorciado(a)</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Celular</label>
          <input
            type="text"
            value={data.mobile}
            className="form-control"
            id="inputMobile"
            placeholder="Introduce nro. de celular"
            autoComplete="off"
            onChange={(e) => setData({...data, mobile: e.target.value})}
            
            
          />
         
        </div>

        <div className="col-12">
          <label className="form-label">Direccion Casa</label>
          <input
            type="text"
            className="form-control"
            id="inputAddressh"
            placeholder="Introduce la direccion de tu casa"
            autoComplete="off"
            onChange={(e) => setData({ ...data, addresshome: e.target.value })}
            value={data.addresshome}
          />
          

        </div>
        <div className="col-12">
          <label className="form-label">Direccion Oficina</label>
          <input
            type="text"
            className="form-control"
            id="inputAddressw"
            placeholder="Introduce la direccion de la oficina"
            autoComplete="off"
            onChange={(e) => setData({ ...data, addresswork: e.target.value })}
            value={data.addresswork}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Departamento</label>
          <input
            type="text"
            className="form-control"
            id="inputDept"
            placeholder="Introduce departamento"
            autoComplete="off"
            onChange={(e) => setData({ ...data, dept: e.target.value })}
            value={data.dept}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Sucursal</label>
          <input
            type="text"
            className="form-control"
            id="inputBrunch"
            placeholder="Introduce Sucursal"
            autoComplete="off"
            onChange={(e) => setData({ ...data, banch: e.target.value })}
            value={data.branch}
          />
        </div>

        <div>
          <label className="form-label">Fecha de Retiro</label>
          <Form.Control
            type="date"
            onChange={(e) => setData({ ...data, termdate: e.target.value })}
            input="inputTermdate"
            value={data.termdate}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Motivo de retiro</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, reasonterm: e.target.value })}
            id="inputTermreason"
            value={data.reasonterm}
          >
            <option value="">Seleccionar...</option>
            <option value="01">Retiro Voluntario</option>
            <option value="02">Retiro Forsozo</option>
            <option value="03">Finalizacion de contrato</option>
          </Form.Select>
        </div>

        <div class="col-12">
          <label for="inputSalary" class="form-label">
            Salary
          </label>
          <input
            type="text"
            class="form-control"
            id="inputSalary"
            placeholder="Introducir Nuevo salario"
            autoComplete="off"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            value={data.salary}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Numero de hijos</label>
          <input
            type="text"
            className="form-control"
            id="inputNchildren"
            placeholder="Numero de hijos"
            autoComplete="off"
            onChange={(e) => setData({ ...data, nchildren: e.target.value })}
            value={data.nchildren}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Pais de nacimiento</label>
          <input
            type="text"
            className="form-control"
            id="inputBirthcount"
            placeholder="Introduce pais de nacimiento"
            autoComplete="off"
            onChange={(e) => setData({ ...data, birthcountry: e.target.value })}
            value={data.birthcountry}
          />
        </div>
        <div className="col-12">
          <label className="form-label">NUA</label>
          <input
            type="text"
            className="form-control"
            id="inputNua"
            placeholder="Introduce NUA"
            autoComplete="off"
            onChange={(e) => setData({ ...data, nua: e.target.value })}
            value={data.nua}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Cargo</label>
          <input
            type="text"
            className="form-control"
            id="inputPosition"
            placeholder="Introduce Cargo"
            autoComplete="off"
            onChange={(e) => setData({ ...data, position: e.target.value })}
            value={data.position}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Profesion</label>
          <input
            type="text"
            className="form-control"
            id="inputProfession"
            placeholder="Introduce la profesion"
            autoComplete="off"
            onChange={(e) => setData({ ...data, profession: e.target.value })}
            value={data.profession}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Banco</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, bank: e.target.value })}
            id="inputBank"
            value={data.bank}
          >
            <option value="">Seleccionar...</option>
            <option value="01">Banco Mercantil Santa Cruz</option>
            <option value="02">Banco Union</option>
            <option value="03">Banco Bisa</option>
            <option value="04">Banco BCP</option>
            <option value="05">Banco Prodem</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Nro. Cuenta</label>
          <input
            type="text"
            className="form-control"
            id="inputBankcod"
            placeholder="Numero de Cuenta"
            autoComplete="off"
            onChange={(e) => setData({ ...data, codbank: e.target.value })}
            value={data.codbank}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Estado</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, estado: e.target.value })}
            id="inputEstado"
            value={data.estado}
          >
            <option value="">Seleccionar...</option>
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Esquema Contable</label>
          <input
            type="text"
            className="form-control"
            id="inputEsquemaC"
            placeholder="Esquema Contable"
            autoComplete="off"
            onChange={(e) => setData({ ...data, scheacco: e.target.value })}
            value={data.scheacco}
          />
        </div>

        <div className="col-12">
          <label className="form-label">LinkedIn</label>
          <input
            type="text"
            className="form-control"
            id="inputLinked"
            placeholder="LinkedIn"
            autoComplete="off"
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
            value={data.linkedin}
          />
        </div>


        <div class="col-12 d-flex justify-content-around p-4">
          <Button type="submit" variant="outline-success btnw">
            <i class="bi bi-check"></i>
          </Button>
          <Link to={"/employee"}>
            <Button variant="outline-secondary btnw">
              <i class="bi bi-x-circle"></i>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EmployeeEdit;
