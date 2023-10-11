import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Button from "react-bootstrap/Button";

function AddEmployee() {
  const [ciDet, setCiDet] = useState([]);
  const [error, setError] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/detci")
      .then((res) => {
        if (res.data.Status === "Success") {
          setCiDet(res.data.Result);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{11}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      setIsValid(true);
      setErrorMessage("");
    } else {
      setIsValid(false);
      setErrorMessage("Nro. telefonico invalido");
    }
  };

  useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  const [data, setData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    lastname2: "",
    ci: "",
    ext: "",
    birthdate: "",
    sex: "",
    martstatus: "",
    mobile: "",
    addresshome: "",
    addresswork: "",
    dept: "",
    branch: "",
    startdate: "",
    termdate: "",
    reasonterm: "",
    salary: "",
    nchildren: "",
    birthcountry: "",
    nua: "",
    afp: "",
    tipjub: "",
    position: "",
    profession: "",
    bank: "",
    codbank: "",
    password: "",
    email: "",
    role: "",
    estado: "",
    scheacco: "",
    linkedin: "",
    image: "",
  });
  const navigate = useNavigate();
  const [departOptions, setDepartOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ciExists = ciDet.map((ci) => ci.ci).includes(data.ci);

    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("middlename", data.middlename);
    formData.append("lastname", data.lastname);
    formData.append("lastname2", data.lastname2);
    formData.append("ci", data.ci);
    formData.append("ext", data.ext);
    formData.append("birthdate", data.birthdate);
    formData.append("sex", data.sex);
    formData.append("martstatus", data.martstatus);
    formData.append("mobile", data.mobile);
    formData.append("addresshome", data.addresshome);
    formData.append("addresswork", data.addresswork);
    formData.append("dept", data.dept);
    formData.append("branch", data.branch);
    formData.append("startdate", data.startdate);
    formData.append("termdate", data.termdate);
    formData.append("reasonterm", data.reasonterm);
    formData.append("salary", data.salary);
    formData.append("nchildren", data.nchildren);
    formData.append("birthcountry", data.birthcountry);
    formData.append("nua", data.nua);
    formData.append("afp", data.afp);
    formData.append("tipjub", data.tipjub);
    formData.append("position", data.position);
    formData.append("profession", data.profession);
    formData.append("bank", data.bank);
    formData.append("codbank", data.codbank);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("estado", data.estado);
    formData.append("scheacco", data.scheacco);
    formData.append("linkedin", data.linkedin);
    formData.append("image", data.image);

    if (ciExists) {
      setError("Este ci ya existe");
      console.log(ciExists);
      return;
    }

    try {
      await axios.post("http://192.168.1.9:4000/create", formData);
      navigate("/employee");
    } catch (err) {
      console.error("Error al crear empleado", err);
      setError("Error al agregar empleado");
    }
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/depart")
      .then((res) => {
        if (res.data.Status === "Success") {
          setDepartOptions(res.data.Result);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/branch")
      .then((res) => {
        if (res.data.Status === "Success") {
          setBranchOptions(res.data.Result);
        } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Agregar empleado</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="inputFirstname"
            placeholder="Introduce Nombre"
            autoComplete="off"
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Segundo Nombre</label>
          <input
            type="text"
            className="form-control"
            id="inputMiddlename"
            placeholder="Introduce Seg. Nombre"
            autoComplete="off"
            onChange={(e) => setData({ ...data, middlename: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Apellido Paterno</label>
          <input
            type="text"
            className="form-control"
            id="inputLastname"
            placeholder="Introduce Apellido Paterno"
            autoComplete="off"
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Apellido Materno</label>
          <input
            type="text"
            className="form-control"
            id="inputLastname2"
            placeholder="Introduce Apellido Materno"
            autoComplete="off"
            onChange={(e) => setData({ ...data, lastname2: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Cedula de Identidad</label>
          <input
            type="text"
            className="form-control"
            id="inputCi"
            placeholder="Introduce Cedula de Identidad"
            autoComplete="off"
            onChange={(e) => {
                setData({ ...data, ci: e.target.value })
                setError(null);
                }}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>

        <div className="col-12">
          <label className="form-label">Extension C.I.</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, ext: e.target.value })}
            id="inputExt"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="01">La Paz</option>
            <option value="02">Santa Cruz</option>
            <option value="03">Cochabamba</option>
            <option value="04">Sucre</option>
            <option value="05">Potosi</option>
            <option value="06">Oruro</option>
            <option value="07">Tarija</option>
            <option value="08">Beni</option>
            <option value="09">Pando</option>
            <option value="10">Extranjero</option>
          </Form.Select>
        </div>

        <div>
          <label className="form-label">Fecha de Nacimiento</label>
          <Form.Control
            type="date"
            onChange={(e) => setData({ ...data, birthdate: e.target.value })}
            id="inputBirthdate"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Sexo</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, sex: e.target.value })}
            id="inputSex"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="01">Hombre</option>
            <option value="02">Mujer</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Estado Civil</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, martstatus: e.target.value })}
            id="inputMartialstatus"
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
            value={phoneNumber}
            className="form-control"
            id="inputMobile"
            placeholder="Introduce nro. de celular"
            autoComplete="off"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errorMessage && (
            <div style={{ color: "red" }}>
              {errorMessage} <i class="bi bi-x-circle"></i>
            </div>
          )}
          {isValid && (
            <div style={{ color: "green" }}>Número de teléfono válido.</div>
          )}
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
          />
        </div>

        <div className="col-12">
          <label className="form-label">Departamento</label>
          <Form.Select
            onChange={(e) => setData({ ...data, dept: e.target.value })}
            id="inputDepart"
            value={data.depart}
          >
            <option>Selecciona un departamento</option>
            {departOptions.map((depart) => (
              <option key={depart.id} value={depart.details}>
                {depart.details}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Sucursal</label>
          <Form.Select
            onChange={(e) => setData({ ...data, branch: e.target.value })}
            id="inputBranch"
            value={data.branch}
          >
            <option>Seleccion un sucursal</option>
            {branchOptions.map((branch) => (
              <option key={branch.id} value={branch.details}>
                {branch.details}
              </option>
            ))}
          </Form.Select>
        </div>
        <div>
          <label className="form-label">Fecha de Ingreso</label>
          <Form.Control
            type="date"
            onChange={(e) => setData({ ...data, startdate: e.target.value })}
            input="inputStartdate"
            required
          />
        </div>
        <div>
          <label className="form-label">Fecha de Retiro</label>
          <Form.Control
            type="date"
            onChange={(e) => setData({ ...data, termdate: e.target.value })}
            input="inputTermdate"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Motivo de retiro</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, reasonterm: e.target.value })}
            id="inputTermreason"
          >
            <option value="">Seleccionar...</option>
            <option value="01">Retiro Voluntario</option>
            <option value="02">Retiro Forsozo</option>
            <option value="03">Finalizacion de contrato</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Salario</label>
          <input
            type="number"
            className="form-control"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Numero de hijos</label>
          <input
            type="number"
            className="form-control"
            id="inputNchildren"
            placeholder="Numero de hijos"
            autoComplete="off"
            onChange={(e) => setData({ ...data, nchildren: e.target.value })}
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
          />
        </div>
        <div className="col-12">
          <label className="form-label">NUA</label>
          <input
            type="number"
            className="form-control"
            id="inputNua"
            placeholder="Introduce NUA"
            autoComplete="off"
            onChange={(e) => setData({ ...data, nua: e.target.value })}
          />
        </div>
        <div className="col-12">
          <label className="form-label">AFP</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, afp: e.target.value })}
            id="inputAfp"
            required
          >
            <option value="">Seleccionar...</option>
            <option value="01">Gestora publica</option>
          </Form.Select>
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
          />
        </div>

        <div className="col-12">
          <label className="form-label">Banco</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, bank: e.target.value })}
            id="inputBank"
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
            type="number"
            className="form-control"
            id="inputBankcod"
            placeholder="Numero de Cuenta"
            autoComplete="off"
            onChange={(e) => setData({ ...data, codbank: e.target.value })}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Numero de password"
            autoComplete="off"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Correo electronico</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Introduce correo electronico"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Rol</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, role: e.target.value })}
            id="inputRole"
          >
            <option value="">Seleccionar...</option>
            <option value="02">Usuario</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Estado</label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setData({ ...data, estado: e.target.value })}
            id="inputEstado"
          >
            <option value="">Seleccionar...</option>
            <option value="A">Activo</option>
          </Form.Select>
        </div>

        <div className="col-12">
          <label className="form-label">Esquema Contable</label>
          <input
            type="text"
            className="form-control"
            id="inputEsquema"
            placeholder="Introduce Esquema Contable"
            autoComplete="off"
            onChange={(e) => setData({ ...data, scheacco: e.target.value })}
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">LinkedIn</label>
          <input
            type="url"
            className="form-control"
            id="inputLinked"
            placeholder="Introduce tu LinkedIn"
            autoComplete="off"
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Cargar imagen</label>
          <input
            type="file"
            className="form-control"
            id="inputFile01"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </div>

        <div className="buttoms p-3">
          <Button type="submit" variant="outline-success btnw">
            <i class="bi bi-person-check-fill"></i>
          </Button>
          <Link to={"/employee"}>
            <Button variant="outline-warning btnw">
              <i class="bi bi-x-circle"></i>
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
