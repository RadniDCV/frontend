import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Payrollemp() {
  
  const navigate = useNavigate();
  const [empOptions, setEmpOptions] = useState([]);
  
  const [data, setData] = useState({
    empid: null,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://192.168.1.9:4000/payempus", {empid: data.empid })
      .then((res) => {
        console.log(data.empid, data.id, data);
        navigate("/payroll");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.9:4000/getemp")
      .then((res) => {
        if (res.data.Status === "Success") {
          setEmpOptions(res.data.Result);
         } else {
          console.log("Error", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

 

  
  //getemp
  return (
    <div className="d-flex p3 justify-content-center">
      <div>
        <h3> Agregar empleados a la planilla</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Empleado:</label>
            <Form.Select
              id="inputDepart"
              onChange={(e) => setData({ ...data, empid: e.target.value })}
              value={data.empid}
            >
              <option>Seleccion empleado</option>
              {empOptions.map((emp) => (
                <option key={emp.id} value={emp.empid}>
                  {emp.fname}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="d-flex p-3 justify-content-around">
            <Button type="submit" variant="outline-success" >
            <i class="bi bi-person-add"></i>
            </Button>
            <Link to={"/payroll"}>
              <Button variant="outline-secondary"><i class="bi bi-x-circle"></i></Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payrollemp;
